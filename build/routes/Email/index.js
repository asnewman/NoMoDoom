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
exports.prepareEmailController = exports.sendEmailController = void 0;
var logger_1 = __importDefault(require("../../helpers/logger"));
var mongoose_1 = require("../../mongoose");
var email_1 = require("./email");
function prepareEmailController(_req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users, promises_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, logger_1.default)("info", "Starting emailing")];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 8]);
                    return [4 /*yield*/, mongoose_1.Item.find({
                            type: mongoose_1.MONGO_TYPES.USER,
                        })];
                case 3:
                    users = _a.sent();
                    promises_1 = [];
                    users.forEach(function (user) {
                        promises_1.push((0, email_1.saveEmailObjects)(user.data.email));
                    });
                    return [4 /*yield*/, Promise.all(promises_1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, logger_1.default)("info", "Finished creating and email objects")];
                case 5:
                    _a.sent();
                    res.send("Success");
                    return [3 /*break*/, 8];
                case 6:
                    e_1 = _a.sent();
                    return [4 /*yield*/, (0, logger_1.default)("error", e_1)];
                case 7:
                    _a.sent();
                    res.status(400).send("Error archiving: ".concat(e_1));
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.prepareEmailController = prepareEmailController;
function sendEmailController(_req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, logger_1.default)("info", "Starting emailing")];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 7]);
                    return [4 /*yield*/, (0, email_1.emailUsers)()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, logger_1.default)("info", "Finished emailing")];
                case 4:
                    _a.sent();
                    res.send("Success");
                    return [3 /*break*/, 7];
                case 5:
                    e_2 = _a.sent();
                    return [4 /*yield*/, (0, logger_1.default)("error", e_2)];
                case 6:
                    _a.sent();
                    res.status(400).send("Error archiving: ".concat(e_2));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.sendEmailController = sendEmailController;
exports.default = prepareEmailController;
//# sourceMappingURL=index.js.map