import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { userRouter } from "./router/UserRouter";
import { naverRouter } from "./router/NaverRouter";
import { projectRouter } from "./router/ProjectRouter";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users/", userRouter);
app.use("/navers/", naverRouter);
app.use("/projects/", projectRouter);



const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});