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
exports.deleteJob = exports.updateJob = exports.getJob = exports.createJob = exports.getAllJobs = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const jobs = yield Job_1.default.find({ createdBy: user === null || user === void 0 ? void 0 : user.userId });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ jobs, count: jobs.length });
});
exports.getAllJobs = getAllJobs;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const job = yield Job_1.default.findOne({ _id: id, createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
    if (!job) {
        throw new errors_1.NotFoundError('No matched job found');
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.getJob = getJob;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    req.body.createdBy = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    const job = yield Job_1.default.create(req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
});
exports.createJob = createJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { id } = req.params;
    const job = yield Job_1.default.findOneAndUpdate({ _id: id, createdBy: user === null || user === void 0 ? void 0 : user.userId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!job) {
        throw new errors_1.NotFoundError("No matched job found");
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(job);
});
exports.updateJob = updateJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const job = yield Job_1.default.findOneAndDelete({ _id: req.params.id, createdBy: (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId });
    if (!job) {
        throw new errors_1.NotFoundError("No matched job found");
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ job, msg: "successfullly deleted" });
});
exports.deleteJob = deleteJob;
