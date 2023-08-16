"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create the connection pool. The pool-specific settings are the defaults
var pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    port: 3306,
    password: "admin",
    database: 'northwind',
});
exports.pool = pool;
