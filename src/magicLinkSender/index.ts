import nodemailer from "nodemailer";
import { Item, MONGO_TYPES } from "../mongoose";

async function sendMagicLink(email: string) {
  let user = await Item.findOne({
    type: MONGO_TYPES.USER,
    data: {
      email,
    },
  });

  if (!user) {
    user = new Item({
      type: MONGO_TYPES.USER,
      data: {
        email,
        signedInWithToken: false,
        token: ""
      }
    })
  }

  user.data.token = randomString(20);
  user.data.signedInWithToken = false;
  user.save();

  sendMail(email, user.data.token);
}

async function sendMail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Kozukai Habit" <ash@kozukaihabit.com>', // sender address
    to: email,
    subject: "Login link", // Subject line
    text: `Use this link to login in: http://localhost:3000/?token=${token}. Don't share this link with anyone.`,
  });
}

const randomString = (length = 8) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

export default sendMagicLink;
