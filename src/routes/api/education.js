import { Router } from 'express';
import validateEducation from '../../middlewares/validation/education';
import EducationController from '../../controllers/EducationController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const education = Router();
education.post(
  '/',
  verifyToken,
  validateEducation.create,
  asyncHandler(EducationController.create)
);
education.get(
  '/:username',
  asyncHandler(EducationController.getMyEducation)
);

export default education;
