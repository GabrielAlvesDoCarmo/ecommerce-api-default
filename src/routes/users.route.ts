import { UsersController } from "../controllers/users.controller"

export const userRouter = express.Router()

userRouter.get("/users", UsersController.getAll)
userRouter.get("/users/:id", UsersController.getById)
userRouter.post("/users", UsersController.save)
userRouter.put("/users/:id", UsersController.update)
userRouter.delete("/users/:id", UsersController.delete)
