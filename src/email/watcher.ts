import {getChannel} from "../amqp";
import emailUser from "./emailUser";

export default function start() {
  getChannel().then(async (channel) => {
  await channel.consume("email", (msg) => {
    const rawMsg = msg?.content.toString();
    const msgObj: any = JSON.parse(rawMsg || "");
    if (msg) {
      console.log("Message to email: " + msgObj.email)
      emailUser(msgObj.email).then(() => {
        channel.ack(msg)
      })
    }
  })
})
}