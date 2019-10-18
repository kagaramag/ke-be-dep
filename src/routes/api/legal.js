import { Router } from "express";
import LegalController from "../../controllers/LegalController";
import verifyToken from "../../middlewares/verifyToken";
import asyncHandler from "../../middlewares/asyncHandler";
import multerUploads from "../../middlewares/multerUploads";

const upload = Router();
upload.post(
  "/",
  verifyToken,
  multerUploads.array("doc", 4),
  asyncHandler(LegalController.upload)
);

export default upload;
