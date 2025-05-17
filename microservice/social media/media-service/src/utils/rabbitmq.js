const amqplib = require("amqplib");
const logger = require("./logger");

let connection = null;
let channel = null;

const EXCHANGE_NAME = "facebook_service";

const connectToRabbitMq = async () => {
  try {
    connection = await amqplib.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: false });
    logger.info("connected to rabbitmq");
    return channel;
  } catch (error) {
    logger.error("Error while connection to rabbitmq", error);
  }
};

async function publishEvent(routingKey, callback) {
  if (!channel) {
    await connectToRabbitMq();
  }

  channel.publish(
    EXCHANGE_NAME,
    routingKey,
    Buffer.from(JSON.stringify(message))
  );
}

async function consumeEvent(routingKey, callback) {
  if (!channel) {
    await connectToRabbitMq();
  }

  const que = await channel.assertQueue("", { exclusive: true });

  await channel.bindQueue(que.queue, EXCHANGE_NAME, routingKey);

  await channel.consume(que.queue, (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      callback(content);
      channel.ack(msg);
    }
  });
  logger.info(`Subscribed to evemt : ${routingKey}`);
}

module.exports = { connectToRabbitMq, publishEvent, consumeEvent };
