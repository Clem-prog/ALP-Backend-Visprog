import express from "express"
import { publicRouter } from "../routers/public-router"
import { errorMiddleWare } from "../middleware/error-middleware"
import { protectedRouter } from "../routers/protected-router"

const app = express()
app.use(express.json())
app.use(publicRouter)
/*app.use(protectedRouter)*/
app.use(errorMiddleWare)

export default app