import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller";

const router = Router();
router.use(verifyJWT); // only verified users can get the access

router.route("/").post(createTweet);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;
