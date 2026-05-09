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