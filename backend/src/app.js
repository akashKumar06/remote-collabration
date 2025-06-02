import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:4173"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);

const server = http.createServer(app);
export default server;
