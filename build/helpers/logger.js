"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var papertrail = new winston_1.default.transports.Http({
    host: 'logs.collector.solarwinds.com',
    path: '/v1/log',
    auth: { username: String(''), password: 'AgHXp3HD6ZAzUPUf_wTgaipAJRIc' },
    ssl: true,
});
var logger = process.env.IS_LOCAL === "true" ? console : winston_1.default.createLogger({
    transports: [papertrail],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map