import {
  Consumer,
  ConsumerSubscribeTopics,
  Kafka,
  EachMessagePayload,
  logLevel,
} from "kafkajs";
import { KAFKA_CONFIG } from "../configs/kafka";
import { EventListener } from "../events/event-listener";

export default class KafkaConsumer {
  private kafkaConsumer: Consumer;

  public constructor() {
    this.kafkaConsumer = this.createConsumer();
  }

  public async start(): Promise<void> {
    const topics: ConsumerSubscribeTopics = {
      topics: KAFKA_CONFIG.TOPICS,
      fromBeginning: true,
    };

    try {
      await this.kafkaConsumer.connect();
      await this.kafkaConsumer.subscribe(topics);

      console.log(`Consumer connected`);

      await this.kafkaConsumer.run({
        autoCommit: true,
        autoCommitInterval: 100,
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload;
          const parsedMessage = JSON.parse(message?.value?.toString() || "");

          console.log(
            `Received message on topic: ${topic} partition: ${partition} message: ${JSON.stringify(
              parsedMessage
            )}`
          );

          new EventListener().handleEvent(parsedMessage);
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect();
  }

  private createConsumer(): Consumer {
    const kafka = new Kafka({
      logLevel: logLevel.INFO,
      clientId: KAFKA_CONFIG.CLIENT_ID,
      brokers: KAFKA_CONFIG.HOSTS,
    });

    return kafka.consumer({
      groupId: KAFKA_CONFIG.CONSUMER_GROUP_ID,
      retry: { retries: 5 },
    });
  }
}
