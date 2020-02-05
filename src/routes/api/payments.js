import { Router } from 'express';
import PaymentsController from '../../controllers/PaymentsController';
import verifyToken from '../../middlewares/verifyToken';
import {
  VerifySubscription,
  VerifyPromocode
} from '../../middlewares/payments';
import asyncHandler from '../../middlewares/asyncHandler';

const payment = Router();
payment.post(
  '/pay',
  verifyToken,
  VerifyPromocode,
  VerifySubscription,
  asyncHandler(PaymentsController.create)
);
payment.post(
  '/callback',
  // SubscriptionExists,
  asyncHandler(PaymentsController.callback)
);

export default payment;
