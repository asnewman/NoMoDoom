export default async function (req: any, res: any, next: any) {
  const { password } = req.body;
  
  if (password === process.env.SCHEDULER_PASSWORD) {
    next();
  } else {
    return res.status(403).send();
  }
}
