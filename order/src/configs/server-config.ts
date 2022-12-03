import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";

import KafkaConsumer from "../shared/consumer";
import { router } from "../routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// new KafkaConsumer().start();

const server = http.createServer(app);
export { server };
