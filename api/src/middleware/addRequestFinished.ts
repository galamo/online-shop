



import { Request, Response, NextFunction } from "express"
const addRequestFinished = (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
        console.log(`${new Date().toISOString()} => Request Finished | requestId: ${res.getHeader("x-request-id")} | Path: ${req.path} `)
    })
    next()
}
export { addRequestFinished }