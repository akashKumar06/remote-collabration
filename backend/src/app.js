import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);

const server = http.createServer(app);
export default server;
