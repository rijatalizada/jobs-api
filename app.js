"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const connect_1 = __importDefault(require("./database/connect"));
const auth_1 = __importDefault(require("./routes/auth"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const authorization_1 = __importDefault(require("./middlewares/authorization"));
const not_found_1 = __importDefault(require("./middlewares/not-found"));
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
// routes
app.use("/api/auth", auth_1.default);
app.use("/api/jobs", authorization_1.default, jobs_1.default);
app.set('trust proxy', 1);
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100
}));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(not_found_1.default);
app.use(error_handler_1.default);
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const start = () => {
    try {
        app.listen(port, () => {
            var _a;
            (0, connect_1.default)((_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : "");
            console.log(`app is listening to the port ${port}`);
        });
    }
    catch (error) {
        throw new Error(error);
    }
};
start();
