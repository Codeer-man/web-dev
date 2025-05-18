const amqplib = require("amqplib");
const logger = require("./logger");

let connection = null;
let channel = null; // Changed from const to let

const EXCHANGE_NAME = "facebook_service";

async function connectToRabbitMq() {
  try {
    connection = await amqplib.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: false });
    logger.info("Connected to RabbitMQ");
  } catch (error) {
    logger.error("Error while connecting to RabbitMQ:", error);
  }
}

const consumeEvent = async (routingKey, callback) => {
  try {
    if (!channel) {
      await connectToRabbitMq();
    }

    const q = await channel.assertQueue("", { exclusive: true }); // Fixed here
    await channel.bindQueue(q.queue, EXCHANGE_NAME, routingKey);
    await channel.consume(q.queue, (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        channel.ack(msg);
      }
    });

    logger.info(`Subscribed to event: ${routingKey}`);
  } catch (error) {
    logger.error("Error consuming event:", error);
  }
};

module.exports = { consumeEvent, connectToRabbitMq };
