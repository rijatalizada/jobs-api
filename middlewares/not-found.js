"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const notFoundMiddleware = (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        msg: "Route doesn't exist"
    });
};
exports.default = notFoundMiddleware;
