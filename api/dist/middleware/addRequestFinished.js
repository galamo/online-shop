"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestFinished = void 0;
var logger_1 = require("../logger");
var addRequestFinished = function (req, res, next) {
    res.on("finish", function () {
        logger_1.logger.info({ message: "Request Finished", path: req.path, requestId: res.getHeader("x-request-id") });
    });
    next();
};
exports.addRequestFinished = addRequestFinished;
