import type { Consumer } from "kafkajs";
import { createKafkaClient } from "./client";
import { logger } from "../log/logger";

export async function createConsumer(
  clientId: string,
  groupId: string,
): Promise<Consumer> {
  const kafka = createKafkaClient(clientId);

  const consumer = kafka.consumer({ groupId });
  await consumer.connect();

  logger.info({ clientId, groupId }, "consumer connected");

  return consumer;
}
