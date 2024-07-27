import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { deleteVideo, getAllVideos, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/video.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();
router.use(verifyJWT); // apply verifyJWT middleware to all the routes in this file


router
  .route("/")
  .get(getAllVideos)
  .post(
    upload.fields([
      {
        name: "videoFile",
        maxCount: 1
      },
      {
        name: "thumbnail",
        maxCount: 1
      }
    ]),
    publishAVideo
  );


router
  .route("/:videoId")
  .get(getVideoById)
  .patch(upload.single("thumbnail"), updateVideo)
  .delete(deleteVideo)

router
  .route("/toggle/publish/:videoId")
  .patch(togglePublishStatus)


export default router;
