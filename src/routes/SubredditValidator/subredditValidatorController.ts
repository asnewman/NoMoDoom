import axios from "axios";
import { isValidSubreddit } from "../../helpers/isValidSubreddit";

async function subredditValidatorController(req: any, res: any) {
  const { subreddit } = req.params;

  if (!subreddit) {
    return res.status(400).send("Must include subreddit in body");
  }

  const isValid = await isValidSubreddit(() =>
    axios.get(`https://www.reddit.com/r/${subreddit}/top.json`)
  );

  if (!isValid) {
    return res.status(400).send("Subreddit is not valid");
  }

  return res.status(200).send();
}

export default subredditValidatorController;
