import ip from "ip";

const host = ip.address();

export const KAFKA_CONFIG = {
  HOSTS: [String(process.env.KAFKA_HOST) || `${host}:9092`],
  CLIENT_ID: "client-id",
  CONSUMER_GROUP_ID: "product-consumer-group",
  PRODUCER_GROUP_ID: "order-producer-group",
  TOPICS: ["product"],
};
