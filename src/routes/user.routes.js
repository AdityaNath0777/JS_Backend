import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  // inject middleware just before the main method
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  registerUser
  );

  // user login
  router.route("/login").post(loginUser);

  // user logout 
  router.route("/logout").post(verifyJWT, logoutUser)
  // next() from verifyJWT (middleware) helps routers to know there is another function and execute it

  // refresh token endpoint
  router.route("/refresh-token").post(refreshAccessToken)


export default router;
