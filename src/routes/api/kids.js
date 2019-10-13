import { Router } from 'express';
import validateKids from '../../middlewares/validation/kids';
import KidsController from '../../controllers/KidsController';
import verifyToken from '../../middlewares/verifyToken';
import checkIfKidExist from '../../middlewares/checkIfKidExist';
import deleteKidPermission from '../../middlewares/deleteKidPermission';
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
  '/',
  verifyToken,
  deleteKidPermission,
  asyncHandler(KidsController.updateKid)
);

export default kids;
