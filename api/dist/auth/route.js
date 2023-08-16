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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.authRouter = exports.signupSchema = void 0;
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var zod_1 = __importDefault(require("zod"));
var dotenv_1 = __importDefault(require("dotenv"));
var signup_1 = __importDefault(require("./handlers/signup"));
var login_1 = require("./handlers/login");
dotenv_1.default.config();
var authRouter = express_1.default.Router();
exports.authRouter = authRouter;
var users = [{ email: "root@root.com", password: "admin" }];
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
    firstName: zod_1.default.string().max(100),
    lastName: zod_1.default.string().max(100)
});
var loginSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
});
function middlewareLogin(req, res, next) {
    try {
        loginSchema.parse(req.body);
        return next();
    }
    catch (error) {
        return res.status(400).send("Error");
    }
}
authRouter.post("/login", middlewareLogin, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, _b, result, userRecord, signedToken, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, login_1.login)(email, password)];
                case 2:
                    _b = _c.sent(), result = _b.result, userRecord = _b.userRecord;
                    console.log(result, userRecord);
                    if (!result)
                        throw new Error();
                    console.log(userRecord);
                    signedToken = jsonwebtoken_1.default.sign({ userName: userRecord.email, id: userRecord.id, role: userRecord.role }, process.env.SECRET, { expiresIn: '60m' });
                    res.json({ token: signedToken });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    return [2 /*return*/, res.status(401).send("User is unauthorized")];
                case 4: return [2 /*return*/];
            }
        });
    });
});
function middlewareSignIn(req, res, next) {
    try {
        exports.signupSchema.parse(req.body);
        return next();
    }
    catch (error) {
        return res.status(400).send("Error");
    }
}
authRouter.post("/sign-up", middlewareSignIn, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, signup_1.default)(req.body)];
                case 1:
                    result = _a.sent();
                    console.log("User added id", result);
                    return [2 /*return*/, res.json({ message: "user successfully added!" })];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, next(error_2)];
                case 3: return [2 /*return*/];
            }
        });
    });
});
