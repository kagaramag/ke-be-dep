import { Router } from 'express';
import ServiceController from '../../controllers/ServiceController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const legal = Router();
legal.post(
  '/',
  verifyToken,
  asyncHandler(ServiceController.create)
);
legal.get('/', verifyToken, asyncHandler(ServiceController.getMyServices));

legal.get(
  '/:id',
  verifyToken,
  asyncHandler(ServiceController.getOne)
);

export default legal;
