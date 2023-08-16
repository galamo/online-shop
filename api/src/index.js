"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express")
var express_1 = __importDefault(require("express"));
var routes_index_1 = require("./routes.index");
var addRequestId_1 = require("./middleware/addRequestId");
var addRequestStarted_1 = require("./middleware/addRequestStarted");
var addRequestFinished_1 = require("./middleware/addRequestFinished");
var logger_1 = require("./logger");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var route_1 = require("./user/route");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(addRequestId_1.addRequestId);
app.use(addRequestStarted_1.addRequestStarted);
app.use(addRequestFinished_1.addRequestFinished);
app.get("/health-check", function (req, res, next) {
    res.send("API IS OK ".concat(new Date().toISOString()));
});
app.use("/customers", routes_index_1.customersRouter);
app.use("/auth", routes_index_1.authRouter);
app.use("/cart", routes_index_1.cartRouter);
app.use(verifyAuthentication);
app.use("/products", routes_index_1.productsRouter);
app.use("/user", route_1.userRouter);
app.use("/countries", routes_index_1.countriesRouter);
app.use(function (err, req, res, next) {
    logger_1.logger.error({ message: err.message });
    res.status(500).send("Something went wrong");
});
app.listen(process.env.PORT, function () {
    logger_1.logger.info({ message: "Api is running on Port ".concat(process.env.PORT) });
});
function verifyAuthentication(req, res, next) {
    var token = req.headers.authorization;
    jsonwebtoken_1.default.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            console.log("".concat(new Date().toISOString(), " => requestId: ").concat(res.getHeader("x-request-id"), " | User Token invalid ").concat(err.message));
            logger_1.logger.error({ message: err.message });
            return res.status(401).send("Authentication error");
        }
        else {
            req.currentUserName = decoded.userName;
            req.currentUserId = decoded.id;
            req.currentUserRole = decoded.role;
            console.log("".concat(new Date().toISOString(), " => requestId: ").concat(res.getHeader("x-request-id"), " | User authenticated Successfully"));
            return next();
        }
    });
}
