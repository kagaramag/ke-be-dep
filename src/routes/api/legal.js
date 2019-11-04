import { Router } from 'express';
import LegalController from '../../controllers/LegalController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';
import multerUploads from '../../middlewares/multerUploads';
import verifyAdmin from '../../middlewares/verifyAdmin';

const legal = Router();
legal.post(
  '/',
  verifyToken,
  multerUploads.array('doc', 5),
  asyncHandler(LegalController.upload)
);
legal.get('/', verifyToken, asyncHandler(LegalController.findBySelf));

legal.get(
  '/:username',
  verifyToken,
  verifyAdmin,
  asyncHandler(LegalController.findByAdmin)
);

export default legal;
