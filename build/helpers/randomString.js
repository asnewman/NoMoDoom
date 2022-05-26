"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomString = function (length) {
    if (length === void 0) { length = 8; }
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var str = "";
    for (var i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
};
exports.default = randomString;
//# sourceMappingURL=randomString.js.map