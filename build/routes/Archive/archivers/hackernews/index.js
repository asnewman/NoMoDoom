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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var mongoose_1 = require("../../../../mongoose");
var pure_1 = require("./pure");
function archiveHackernews() {
    return __awaiter(this, void 0, void 0, function () {
        var htmls, i, _a, _b, posts, archiveData, posts_1, posts_1_1, post, archive;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    htmls = [];
                    i = 1;
                    _d.label = 1;
                case 1:
                    if (!(i <= 3)) return [3 /*break*/, 5];
                    _b = (_a = htmls).push;
                    return [4 /*yield*/, axios_1.default.get("https://news.ycombinator.com/best?p=".concat(i))];
                case 2:
                    _b.apply(_a, [(_d.sent()).data]);
                    return [4 /*yield*/, new Promise(function (resolve) {
                            setTimeout(function () { return resolve(null); }, 1000);
                        })];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    posts = (0, pure_1.getTopPostsForDay)(htmls, Date.now());
                    archiveData = {
                        type: "hackernews",
                        datetime: Date.now(),
                        data: [],
                    };
                    try {
                        for (posts_1 = __values(posts), posts_1_1 = posts_1.next(); !posts_1_1.done; posts_1_1 = posts_1.next()) {
                            post = posts_1_1.value;
                            archiveData.data.push({
                                title: post.title,
                                score: post.score,
                                link: post.link,
                            });
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (posts_1_1 && !posts_1_1.done && (_c = posts_1.return)) _c.call(posts_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    archive = {
                        type: mongoose_1.MONGO_TYPES.ARCHIVE,
                        data: archiveData
                    };
                    return [4 /*yield*/, mongoose_1.Item.create(archive)];
                case 6:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = archiveHackernews;
//# sourceMappingURL=index.js.map