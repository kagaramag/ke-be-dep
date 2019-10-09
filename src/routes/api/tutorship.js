import { Router } from 'express';
import verifyToken from '../../middlewares/verifyToken';
import validateTutorship from '../../middlewares/validation/tutorship';
import checkTutorshipActivities from '../../middlewares/checkTutorshipActivities';
import TutorshipController from '../../controllers/TutorshipController';
import asyncHandler from '../../middlewares/asyncHandler';

const tutorship = Router();
tutorship.post(
  '/:id',
  verifyToken,
  validateTutorship.create,
  checkTutorshipActivities,
  asyncHandler(TutorshipController.create)
);
tutorship.get(
  '/:id',
  verifyToken,
  asyncHandler(TutorshipController.getTutorship)
);

export default tutorship;
