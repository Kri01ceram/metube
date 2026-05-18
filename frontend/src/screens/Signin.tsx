import axios from "axios";

export function Signin() {
    async function signin() {
        axios.post("http://localhost:3000/api/signin", {
            username: document.getElementById("username")?.value,
            password: document.getElementById("password")?.value
        }).then(response => {
            const data = response.data;
            localStorage.setItem("token", data.token);
            window.location = "/";
        });
       
}
    return (
        <div>
            <input id="username" type="text" placeholder="Username" />
            <input id="password" type="text" placeholder="Password" />
            <button onClick={(signin)}>Sign in</button>
        </div>
    );
}