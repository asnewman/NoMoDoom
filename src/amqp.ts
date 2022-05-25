import amqp, { Channel } from "amqplib";
import { exit } from "process";

let channel: Channel | null = null;
async function getChannel() {
  if (!process.env.RABBITMQ) {
    console.error("RABBITMQ env var not set");
    exit(1);
  }

  if (!channel) {
    const connection = await amqp.connect(process.env.RABBITMQ);
    channel = await connection.createChannel();
  }
  return channel;
}

export { getChannel };
