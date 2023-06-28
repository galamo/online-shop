
import { Request, Response, NextFunction } from "express"
const addRequestStarted = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} => Request Started | requestId: ${res.getHeader("x-request-id")} | Path: ${req.path}`)
    next()
}

export { addRequestStarted }