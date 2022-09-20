import express, {Router, Request, Response} from 'express'

const clockRoute:Router = express.Router()

clockRoute.get('/', (req: Request, res: Response) => {
    res.setHeader('Set-Cookie', 'isAuth=false')
    res.send("Home Route")
})

export default clockRoute