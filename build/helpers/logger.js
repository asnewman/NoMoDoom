"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var winston_logzio_1 = __importDefault(require("winston-logzio"));
var logzioWinstonTransport = new winston_logzio_1.default({
    level: 'info',
    name: 'winston_logzio',
    token: process.env.LOGZIO_TOKEN || "",
    host: 'listener.logz.io',
});
var transports = [new winston_1.default.transports.Console()];
if (process.env.IS_LOCAL === "false") {
    transports.push(logzioWinstonTransport);
}
var logger = winston_1.default.createLogger({
    format: winston_1.default.format.simple(),
    transports: transports,
});
logger.on('finish', function () {
    console.log("all logged");
});
exports.default = logger;
//# sourceMappingURL=logger.js.map