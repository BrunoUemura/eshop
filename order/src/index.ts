import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import KafkaProducer from "./shared/producer";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/producer", async (request: Request, response: Response) => {
  const message = request.body;

  try {
    const kafkaProducer = new KafkaProducer();
    await kafkaProducer.sendMessage(message);
    return response.status(200).send({
      message: "successfully sent message",
    });
  } catch (error) {
    return response.status(400).send({
      message: "Failed to send message",
      details: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
