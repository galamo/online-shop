"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestId = void 0;
var uuid4_1 = __importDefault(require("uuid4"));
var addRequestId = function (req, res, next) {
    var rid = (0, uuid4_1.default)();
    res.setHeader("x-request-id", rid);
    next();
};
exports.addRequestId = addRequestId;
