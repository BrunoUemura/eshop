import "dotenv/config";
import express from "express";
import KafkaConsumer from "./shared/consumer";

const app = express();
const PORT = process.env.PORT || 5001;

new KafkaConsumer().start();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
