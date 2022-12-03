import {
  Kafka,
  logLevel,
  Producer,
  ProducerRecord,
  RecordMetadata,
} from "kafkajs";
import { KAFKA_CONFIG } from "../configs/kafka";

interface CustomMessageFormat {
  topic: string;
  payload: object;
}

export default class KafkaProducer {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  private async start(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  }

  private async shutdown(): Promise<void> {
    await this.producer.disconnect();
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      // logLevel: logLevel.DEBUG,
      clientId: KAFKA_CONFIG.PRODUCER_GROUP_ID,
      brokers: KAFKA_CONFIG.HOSTS,
    });

    return kafka.producer();
  }

  public async sendMessage(
    message: CustomMessageFormat
  ): Promise<RecordMetadata[]> {
    await this.start();

    const event: ProducerRecord = {
      acks: 0,
      topic: message.topic,
      messages: [
        {
          key: "key",
          value: JSON.stringify(message),
        },
      ],
    };

    const result = this.producer.send(event);

    console.log(`Successfully sent ${JSON.stringify(event)} event`);

    // await this.shutdown();

    return result;
  }
}
