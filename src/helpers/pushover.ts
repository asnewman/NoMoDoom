import axios from "axios";

async function sendPushover(message: string) {
  axios.post("https://api.pushover.net/1/messages.json", {
    token: process.env.PUSHOVER_TOKEN,
    user: process.env.PUSHOVER_USER,
    message,
  });
}

export { sendPushover };
