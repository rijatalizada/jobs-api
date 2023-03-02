import Job from "../models/Job";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

const getAllJobs = async (req: Request, res: Response) => {
  const { user } = req;
  const jobs = await Job.find({ createdBy: user?.userId });
  return res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req: Request, res: Response) => {
    const {id} = req.params
    const job = await Job.findOne({_id: id, createdBy: req.user?.userId})

    if(!job) {
        throw new NotFoundError('No matched job found')
    }

    return res.status(StatusCodes.OK).json({job})
}

const createJob = async (req: Request, res: Response) => {
    req.body.createdBy = req.user?.userId;
    const job = await Job.create(req.body);
    
    return res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req: Request, res: Response) => {
    const {user} = req
    const {id} = req.params
    const job = await Job.findOneAndUpdate({_id: id, createdBy: user?.userId}, req.body, {
        new: true,
        runValidators: true
    })

    if(!job) {
        throw new NotFoundError("No matched job found")
    }

    return res.status(StatusCodes.OK).json(job)
}

const deleteJob = async (req: Request, res: Response) => {
    const job = await Job.findOneAndDelete({_id: req.params.id, createdBy: req.user?.userId})
    
    if(!job) {
        throw new NotFoundError("No matched job found")
    }

    return res.status(StatusCodes.OK).json({job, msg: "successfullly deleted"})
}

export { getAllJobs, createJob, getJob, updateJob, deleteJob };
