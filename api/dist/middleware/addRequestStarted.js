"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestStarted = void 0;
var logger_1 = require("../logger");
var addRequestStarted = function (req, res, next) {
    logger_1.logger.info({ message: "Request Started", path: req.path, requestId: res.getHeader("x-request-id") });
    next();
};
exports.addRequestStarted = addRequestStarted;
