import { Router } from 'express';
import SubscriptionController from '../../controllers/SubscriptionController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const subscription = Router();
subscription.get('/', verifyToken, asyncHandler(SubscriptionController.getMySubscriptions));

subscription.get(
  '/:id',
  verifyToken,
  asyncHandler(SubscriptionController.getOne)
);

export default subscription;
