import { Router } from 'express';
import validateKids from '../../middlewares/validation/kids';
import KidsController from '../../controllers/KidsController';
import verifyToken from '../../middlewares/verifyToken';
import checkIfKidExist from '../../middlewares/checkIfKidExist';
import updateKidPermission from '../../middlewares/updateKidPermission';
import asyncHandler from '../../middlewares/asyncHandler';

const kids = Router();
kids.post(
  '/',
  verifyToken,
  validateKids.create,
  checkIfKidExist,
  asyncHandler(KidsController.create)
);
kids.get(
  '/',
  verifyToken,
  asyncHandler(KidsController.getKids)
);
kids.patch(
  '/:id',
  verifyToken,
  updateKidPermission,
  asyncHandler(KidsController.updateKid)
);

export default kids;
