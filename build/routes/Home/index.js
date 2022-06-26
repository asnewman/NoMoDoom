"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../../helpers/logger"));
function homeController(req, res) {
    try {
        return res.render("Home", {
            email: req.email,
        });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.send(e);
    }
}
exports.default = homeController;
//# sourceMappingURL=index.js.map