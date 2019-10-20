import { Router } from "express";
import LegalController from "../../controllers/LegalController";
import verifyToken from "../../middlewares/verifyToken";
import asyncHandler from "../../middlewares/asyncHandler";
import multerUploads from "../../middlewares/multerUploads";
import validateLegal from "../../middlewares/validation/legal";
import verifyAdmin from "../../middlewares/verifyAdmin";

const legal = Router();
legal.post(
  "/",
  verifyToken,
  validateLegal.create,
  multerUploads.array("doc", 4),
  asyncHandler(LegalController.upload)
);
legal.get("/", verifyToken, asyncHandler(LegalController.findBySelf));

legal.get(
  "/:username",
  verifyToken,
  verifyAdmin,
  asyncHandler(LegalController.findByAdmin)
);

export default legal;
