"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const JobSchema = new mongoose_1.Schema({
    company: {
        type: String,
        required: [true, "Please provide comapny name"],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxlength: 200,
    },
    status: {
        type: String,
        required: true,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        required: [true, "Please provide user"],
        ref: "User",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Job", JobSchema);
