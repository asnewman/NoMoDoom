import log from "../../helpers/logger";

async function homeController(req: any, res: any) {
  try {
    return res.render("Home", {
      email: req.email,
    });
  } catch (e) {
    await log("error", e);
    return res.send(e);
  }
}

export default homeController;
