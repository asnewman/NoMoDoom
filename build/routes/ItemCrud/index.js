"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../../helpers/logger"));
var mongoose_1 = require("../../mongoose");
function itemCrudController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, query, data, _b, newSubscriptionItemData, newSubscriptionItemData, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 11, , 12]);
                    _a = req.body, query = _a.query, data = _a.data;
                    _b = query;
                    switch (_b) {
                        case "ADD_SUBREDDIT_SUBSCRIPTION": return [3 /*break*/, 1];
                        case "REMOVE_SUBREDDIT_SUBSCRIPTION": return [3 /*break*/, 3];
                        case "ADD_HACKERNEWS_SUBSCRIPTION": return [3 /*break*/, 5];
                        case "REMOVE_HACKERNEWS_SUBSCRIPTION": return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 1:
                    newSubscriptionItemData = {
                        service: "reddit",
                        subservice: data.subreddit,
                        email: req.email,
                    };
                    return [4 /*yield*/, new mongoose_1.Item({
                            type: mongoose_1.MONGO_TYPES.SUBSCRIPTION,
                            data: newSubscriptionItemData,
                        }).save()];
                case 2:
                    _c.sent();
                    logger_1.default.info("New subreddit subscription! ".concat(req.email, " ").concat(data.subreddit));
                    return [2 /*return*/, res.status(200).send()];
                case 3: return [4 /*yield*/, mongoose_1.Item.deleteOne({
                        "data.email": req.email,
                        "data.subservice": data.subreddit,
                    })];
                case 4:
                    _c.sent();
                    return [2 /*return*/, res.status(200).send()];
                case 5:
                    newSubscriptionItemData = {
                        service: "hackernews",
                        email: req.email,
                    };
                    return [4 /*yield*/, new mongoose_1.Item({
                            type: mongoose_1.MONGO_TYPES.SUBSCRIPTION,
                            data: newSubscriptionItemData,
                        }).save()];
                case 6:
                    _c.sent();
                    logger_1.default.info("New hackernews subscription! ".concat(req.email));
                    return [2 /*return*/, res.status(200).send()];
                case 7: return [4 /*yield*/, mongoose_1.Item.deleteOne({
                        "data.email": req.email,
                        "data.service": "hackernews",
                    })];
                case 8:
                    _c.sent();
                    return [2 /*return*/, res.status(200).send()];
                case 9: return [3 /*break*/, 10];
                case 10: return [2 /*return*/, res.status(404).send("Query not found")];
                case 11:
                    e_1 = _c.sent();
                    logger_1.default.error(e_1);
                    return [2 /*return*/, res.status(400).send(e_1)];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.default = itemCrudController;
//# sourceMappingURL=index.js.map