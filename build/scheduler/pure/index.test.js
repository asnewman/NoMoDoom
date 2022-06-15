"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe("generateArchiveEvents tests", function () {
    test("generates correctly", function () {
        var dummySubscriptions = [
            {
                type: "",
                data: {
                    service: "reddit",
                    subservice: "javascript",
                    email: "test@email.com",
                },
            },
            {
                type: "",
                data: {
                    service: "reddit",
                    subservice: "programming",
                    email: "test@email.com",
                },
            },
        ];
        expect((0, index_1.generateArchiveEvents)(dummySubscriptions)).toEqual([
            {
                service: "reddit",
                subservice: "javascript",
            },
            {
                service: "reddit",
                subservice: "programming",
            },
        ]);
    });
    test("disregard duplicates correctly", function () {
        var dummySubscriptions = [
            {
                type: "",
                data: {
                    service: "reddit",
                    subservice: "javascript",
                    email: "test@email.com",
                },
            },
            {
                type: "",
                data: {
                    service: "reddit",
                    subservice: "javascript",
                    email: "test@email.com",
                },
            },
        ];
        expect((0, index_1.generateArchiveEvents)(dummySubscriptions)).toEqual([
            {
                service: "reddit",
                subservice: "javascript",
            }
        ]);
    });
});
describe("generateEmailEvents tests", function () {
    test("generates correctly", function () {
        var dummyUsers = [
            {
                type: "",
                data: {
                    token: "",
                    tokenExpiration: 0,
                    signedInWithToken: true,
                    email: "test1@mail.com",
                    frequency: 1,
                    lastSent: 8700000,
                },
            },
            {
                type: "",
                data: {
                    token: "",
                    tokenExpiration: 0,
                    signedInWithToken: true,
                    email: "test2@mail.com",
                    frequency: 1,
                    lastSent: 0,
                },
            },
        ];
        expect((0, index_1.generateEmailEvents)(dummyUsers, 8800000)).toEqual([
            {
                email: "test2@mail.com",
            },
        ]);
    });
});
//# sourceMappingURL=index.test.js.map