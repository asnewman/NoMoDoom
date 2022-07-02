export default async function (req: any, res: any, next: any) {
  const password = req.get("password");

  if (password === process.env.SCHEDULER_PASSWORD) {
    next();
  } else {
    console.error(`${password} is incorrect`);
    return res.status(403).send();
  }
}
