import logger from "../../helpers/logger";

function homeController(req: any, res: any) {
  try {
    return res.render("Home", {
      email: req.email,
    });
  } catch (e) {
    logger.error(e);
    return res.send(e);
  }
}

export default homeController;
