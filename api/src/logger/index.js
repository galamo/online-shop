"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.json(), winston_1.default.format.timestamp()),
    defaultMeta: { service: 'api' },
    transports: [
        new winston_1.default.transports.File({ filename: 'log/info.log', level: "info" }),
        new winston_1.default.transports.File({ filename: 'log/error.log', level: 'error' }),
    ],
});
exports.logger = logger;
