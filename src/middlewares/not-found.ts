import {Request, Response} from "express"
import { StatusCodes } from "http-status-codes"

const notFoundMiddleware = (req: Request, res: Response) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Route doesn't exist"
    })
} 

export default notFoundMiddleware