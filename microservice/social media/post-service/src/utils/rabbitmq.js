const amqp = require("amqplib");
const logger = require("../utils/logger");

let connection = null;
let channel = null;

const EXCHAMGE_NAME = "facebook_service";

async function connectToRabbitMq() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHAMGE_NAME, "topic", { durable: false });
    logger.info("connected to rabbitmq");
    return channel;
  } catch (error) {
    logger.error("Error while connection to rabbitmq", error);
  }
}

async function publishEvent(routingKey, message) {
  try {
    if (!channel) {
      await connectToRabbitMq();
    }

    channel.publish(
      EXCHAMGE_NAME,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
    logger.info(`Event published: ${routingKey}`);
  } catch (error) {
    logger.error(`Invalid server error`, error);
  }
}

module.exports = { connectToRabbitMq, publishEvent };
