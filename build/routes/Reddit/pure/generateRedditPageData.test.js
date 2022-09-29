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
var generateRedditPageData_1 = __importDefault(require("./generateRedditPageData"));
describe("generateRedditPageDataTests", function () {
    it("generates free user data correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, dummyUser, dummyGetUser, dummyGetSubscriptions, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = "hello@mail.com";
                    dummyUser = {
                        type: "USER",
                        data: {
                            email: email,
                            signedInWithToken: true,
                            token: "SmmnABX7MYzy0zLOZDHA",
                            tokenExpiration: 1656060077717,
                            frequency: 1,
                        },
                    };
                    dummyGetUser = function (_email) {
                        return new Promise(function (resolve) {
                            resolve(dummyUser);
                        });
                    };
                    dummyGetSubscriptions = function () {
                        return new Promise(function (resolve) {
                            resolve([
                                {
                                    type: "SUBSCRIPTION",
                                    data: { service: "reddit", subservice: "programming", email: email },
                                },
                            ]);
                        });
                    };
                    return [4 /*yield*/, (0, generateRedditPageData_1.default)(email, dummyGetUser, dummyGetSubscriptions)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        email: email,
                        subreddits: ["programming"],
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("generates free user data with invalid subreddit data correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, dummyUser, dummyGetUser, dummyGetSubscriptions, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = "hello@mail.com";
                    dummyUser = {
                        type: "USER",
                        data: {
                            email: email,
                            signedInWithToken: true,
                            token: "SmmnABX7MYzy0zLOZDHA",
                            tokenExpiration: 1656060077717,
                            frequency: 1,
                        },
                    };
                    dummyGetUser = function (_email) {
                        return new Promise(function (resolve) {
                            resolve(dummyUser);
                        });
                    };
                    dummyGetSubscriptions = function () {
                        return new Promise(function (resolve) {
                            resolve([
                                {
                                    type: "SUBSCRIPTION",
                                    data: { service: "reddit", subservice: "programming", email: email },
                                },
                                {
                                    type: "SUBSCRIPTION",
                                    data: { service: "reddit", email: email },
                                },
                            ]);
                        });
                    };
                    return [4 /*yield*/, (0, generateRedditPageData_1.default)(email, dummyGetUser, dummyGetSubscriptions)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        email: email,
                        subreddits: ["programming", "unknown subreddit"],
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("generates expired user data correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, dummyUser, dummyGetUser, dummyGetSubscriptions, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = "hello@mail.com";
                    dummyUser = {
                        type: "USER",
                        data: {
                            email: email,
                            signedInWithToken: true,
                            token: "SmmnABX7MYzy0zLOZDHA",
                            tokenExpiration: 1656060077717,
                            frequency: 1,
                        },
                    };
                    dummyGetUser = function (_email) {
                        return new Promise(function (resolve) {
                            resolve(dummyUser);
                        });
                    };
                    dummyGetSubscriptions = function () {
                        return new Promise(function (resolve) {
                            resolve([
                                {
                                    type: "SUBSCRIPTION",
                                    data: { service: "reddit", subservice: "programming", email: email },
                                },
                            ]);
                        });
                    };
                    return [4 /*yield*/, (0, generateRedditPageData_1.default)(email, dummyGetUser, dummyGetSubscriptions)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        email: email,
                        subreddits: ["programming"],
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("generates premium user data correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, dummyUser, dummyGetUser, dummyGetSubscriptions, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = "hello@mail.com";
                    dummyUser = {
                        type: "USER",
                        data: {
                            email: email,
                            signedInWithToken: true,
                            token: "SmmnABX7MYzy0zLOZDHA",
                            tokenExpiration: 1656060077717,
                            frequency: 1,
                        },
                    };
                    dummyGetUser = function (_email) {
                        return new Promise(function (resolve) {
                            resolve(dummyUser);
                        });
                    };
                    dummyGetSubscriptions = function () {
                        return new Promise(function (resolve) {
                            resolve([
                                {
                                    type: "SUBSCRIPTION",
                                    data: { service: "reddit", subservice: "programming", email: email },
                                },
                            ]);
                        });
                    };
                    return [4 /*yield*/, (0, generateRedditPageData_1.default)(email, dummyGetUser, dummyGetSubscriptions)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        email: email,
                        subreddits: ["programming"],
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("throws missing user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, dummyGetUser, dummyGetSubscriptions, _e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = "hello@mail.com";
                    dummyGetUser = function (_email) {
                        return new Promise(function (resolve) {
                            resolve(undefined);
                        });
                    };
                    dummyGetSubscriptions = function () {
                        return new Promise(function (resolve) {
                            resolve([
                                {
                                    type: "SUBSCRIPTION",
                                    data: { service: "reddit", subservice: "programming", email: email },
                                },
                            ]);
                        });
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, generateRedditPageData_1.default)(email, dummyGetUser, dummyGetSubscriptions)];
                case 2:
                    _a.sent();
                    expect(false).toBe(true);
                    return [3 /*break*/, 4];
                case 3:
                    _e_1 = _a.sent();
                    expect(true).toBe(true);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=generateRedditPageData.test.js.map