import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "./db";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

function getUserId(req: express.Request): string | null {
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer ")) return null;
    try {
        const payload = jwt.verify(auth.slice(7), JWT_SECRET) as { userId: string };
        return payload.userId;
    } catch (error) {
        return null;
    }
}

// validation scema
const signupSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    gender: z.enum(["Male", "Female", "Other"]),
    channelName: z.string().min(1),
});
const signinSchema = z.object({
    username: z.string(),
    password: z.string(),
});
const uploadSchema = z.object({
    videoUrl: z.url(),
    thumbnail: z.url(),
});

// Auth

app.post("/api/signup", async (req, res) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const { username, password, gender, channelName } = parsed.data;
    const existing = await prisma.user.findFirst({ where: { username } });
    if (existing) {
        return res.status(409).json({ error: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { username, password: hashedPassword, gender, channelName },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(201).json({ token, userId: user.id });
});

app.post("/api/signin", async (req, res) => {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const { username, password } = parsed.data;
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, userId: user.id });
});

// videos
app.get("/api/videos", async (_req, res) => {    
    const videos = await prisma.uploads.findMany({
        include: { user: { select: { id: true, channelName: true, profilePicture: true, subscriberCount: true } } },
        orderBy: { createdAt: "desc" },
    });
    res.json(videos);
});
app.get("/api/videos/:id", async (req, res) => {
    const video = await prisma.uploads.findUnique({
        where: { id: req.params.id },
        include: { user: { select: { id: true, channelName: true, profilePicture: true, subscriberCount: true } } },
    });
    if (!video) {
        return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
});
app.post("/api/videos", async (req, res) => {
    const userId = getUserId(req);
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const parsed = uploadSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const video = await prisma.uploads.create({
            data:{ ...parsed.data, userId },
    });
            res.status(201).json(video);
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
