import { Router } from 'express';
import validateKids from '../../middlewares/validation/kids';
import KidsController from '../../controllers/KidsController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const kids = Router();
kids.post(
  '/',
  verifyToken,
  validateKids.create,
  asyncHandler(KidsController.create)
);
kids.get(
  '/',
  verifyToken,
  asyncHandler(KidsController.getKids)
);

export default kids;
