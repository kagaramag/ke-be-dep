import { Router } from 'express';
import validateTutoring from '../../middlewares/validation/tutoring';
import checkTutorById from '../../middlewares/checkTutorById';
import validateTutoringAction from '../../middlewares/validateTutoringAction';
import TutoringController from '../../controllers/TutoringController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const tutoring = Router();
tutoring.post(
  '/',
  verifyToken,
  validateTutoring.create,
  checkTutorById,
  asyncHandler(TutoringController.create)
);
tutoring.get(
  '/',
  verifyToken,
  asyncHandler(TutoringController.getTutoring)
);
tutoring.get(
  '/:id',
  verifyToken,
  asyncHandler(TutoringController.getOneTutoring)
);
tutoring.put(
  '/accept',
  verifyToken,
  validateTutoringAction,
  asyncHandler(TutoringController.tutoringAction)
);
tutoring.put(
  '/reject',
  verifyToken,
  validateTutoringAction,
  asyncHandler(TutoringController.tutoringAction)
);
tutoring.put(
  '/terminate',
  verifyToken,
  validateTutoringAction,
  asyncHandler(TutoringController.tutoringAction)
);
tutoring.put(
  '/request_cancel',
  verifyToken,
  validateTutoringAction,
  asyncHandler(TutoringController.tutoringAction)
);
tutoring.put(
  '/cancel',
  verifyToken,
  validateTutoringAction,
  asyncHandler(TutoringController.tutoringAction)
);

export default tutoring;
