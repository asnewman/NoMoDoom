"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function homeController(req, res) {
    try {
        return res.render("Home", {
            email: req.email,
        });
    }
    catch (e) {
        console.error(e);
        return res.send(e);
    }
}
exports.default = homeController;
//# sourceMappingURL=index.js.map