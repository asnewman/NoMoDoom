import axios from "axios";

async function sendPushover(message: string) {
  if (!process.env.PUSHOVER_TOKEN || !process.env.PUSHOVER_USER) {
    throw new Error("Pushover config not set. Check environment variables.")
  }
  axios.post("https://api.pushover.net/1/messages.json", {
    token: process.env.PUSHOVER_TOKEN,
    user: process.env.PUSHOVER_USER,
    message,
  });
}

export { sendPushover };
