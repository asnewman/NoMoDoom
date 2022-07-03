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
var nodemailer_1 = __importDefault(require("nodemailer"));
var mongoose_1 = require("../../mongoose");
var randomString_1 = __importDefault(require("../../helpers/randomString"));
var logger_1 = __importDefault(require("../../helpers/logger"));
var pushover_1 = require("../../helpers/pushover");
function createLoginLinkController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, user, mongoUser, nomodoomSubscription, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 14]);
                    email = req.body.email;
                    return [4 /*yield*/, mongoose_1.Item.findOne({
                            type: mongoose_1.MONGO_TYPES.USER,
                            "data.email": email,
                        })];
                case 1:
                    user = _a.sent();
                    if (!!user) return [3 /*break*/, 5];
                    mongoUser = {
                        type: mongoose_1.MONGO_TYPES.USER,
                        data: {
                            email: email,
                            signedInWithToken: false,
                            token: "",
                            tokenExpiration: 0,
                            frequency: 1,
                            lastSent: 0,
                        },
                    };
                    user = new mongoose_1.Item(mongoUser);
                    return [4 /*yield*/, (0, logger_1.default)("info", "New user signed up! " + email)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, pushover_1.sendPushover)("New user signed up! ".concat(email))];
                case 3:
                    _a.sent();
                    nomodoomSubscription = {
                        type: mongoose_1.MONGO_TYPES.SUBSCRIPTION,
                        data: {
                            service: "nomodoom",
                            email: email
                        }
                    };
                    return [4 /*yield*/, mongoose_1.Item.create(nomodoomSubscription)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    user.data.token = (0, randomString_1.default)(20);
                    (user.data.tokenExpiration = Date.now() + 7200000),
                        (user.data.signedInWithToken = false);
                    user.markModified("data");
                    return [4 /*yield*/, user.save()];
                case 6:
                    _a.sent();
                    if (!(process.env.IS_LOCAL === "true")) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, logger_1.default)("info", "bypassing auth")];
                case 7:
                    _a.sent();
                    user.data.signedInWithToken = true;
                    user.data.token = (0, randomString_1.default)(20);
                    user.markModified("data");
                    return [4 /*yield*/, user.save()];
                case 8:
                    _a.sent();
                    res.cookie("token", user.data.token);
                    return [2 /*return*/, res.redirect("/")];
                case 9: return [4 /*yield*/, sendMail(email, user.data.token)];
                case 10:
                    _a.sent();
                    return [2 /*return*/, res.send("Success - please check your email")];
                case 11: return [3 /*break*/, 14];
                case 12:
                    e_1 = _a.sent();
                    return [4 /*yield*/, (0, logger_1.default)("error", e_1)];
                case 13:
                    _a.sent();
                    res.send("Failed");
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
function sendMail(email, token) {
    return __awaiter(this, void 0, void 0, function () {
        var transporter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transporter = nodemailer_1.default.createTransport({
                        host: "mail.privateemail.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.EMAIL_PASS,
                        },
                    });
                    return [4 /*yield*/, transporter.sendMail({
                            from: '"nomodoom" <ash@kozukaihabit.com>',
                            to: email,
                            subject: "Login link",
                            text: "Use this link to login in: ".concat(process.env.BASE_URL, "/login?token=").concat(token, ". Don't share this link with anyone."),
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = createLoginLinkController;
//# sourceMappingURL=index.js.map