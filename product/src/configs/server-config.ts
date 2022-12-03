import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";

import { router } from "../routes";
import KafkaConsumer from "../shared/kafka-consumer";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

new KafkaConsumer().start();

const server = http.createServer(app);
export { server };
