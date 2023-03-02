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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const User_1 = __importDefault(require("../models/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.create(Object.assign({}, req.body));
    const jwt = user.createJWT();
    if (!jwt) {
        throw new errors_1.CustomAPIError("Failed to create user, please try again later", 500);
    }
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ jwt });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, email, password } = req.body;
    if (((_a = !username) !== null && _a !== void 0 ? _a : !email) || !password) {
        throw new errors_1.BadRequestError("please provide email or name, and password");
    }
    let user = yield User_1.default.findOne({ email: email });
    if (!user) {
        user = yield User_1.default.findOne({ username: username });
        if (!user) {
            throw new errors_1.UnauthenticatedError("Invalid Credentials");
        }
    }
    if (!(yield user.comparePassword(password))) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    if (token) {
        const decoded = user.decodeJWT(token);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            user: decoded,
            token,
        });
    }
    else {
        throw new errors_1.CustomAPIError("There is a problem, please try again later", 500);
    }
});
exports.login = login;
