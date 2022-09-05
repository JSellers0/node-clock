import express, {Router, Request, Response} from 'express'

const userRoute:Router = express.Router()

userRoute.get('/', (req: Request, res: Response) => {
    res.send("Users Route")
})

export default userRoute