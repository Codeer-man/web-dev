import type { Producer } from "kafkajs";
import { logger } from "../log/logger";
import { createKafkaClient } from "./client";

export async function createProducer(clientId: string): Promise<Producer> {
  const kafka = createKafkaClient(clientId);

  const producer = kafka.producer();

  await producer.connect();

  logger.info({ clientId }, "Proudcer connected");

  return producer;
}

export async function publicJsonSafe(
  producer: Producer | null,
  topic: string,
  payload: Record<string, unknown>,
  key?: string,
) {
  if (!producer) {
    logger.warn({ topic }, "kafka producer is required");
  }

  try {
    await producer?.send({
      topic,
      messages: [
        {
          key: key ?? null,
          value: JSON.stringify(payload),
        },
      ],
    });

    logger.info({ topic, payload }, "kafka event puclished");
  } catch (error) {
    logger.error({ topic, error }, "Kafka publish failed");
  }
}
