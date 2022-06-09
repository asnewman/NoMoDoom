function homeController(req: any, res: any) {
  try {
    return res.render("Home", {
      email: req.email,
    });
  } catch (e) {
    console.error(e);
    return res.send(e);
  }
}

export default homeController;
