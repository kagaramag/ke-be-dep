import { Router } from 'express';
import LocationController from '../../controllers/LocationController';
import validateLocation from '../../middlewares/validation/location';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const location = Router();
location.post(
  '/',
  verifyToken,
  validateLocation.create,
  asyncHandler(LocationController.create)
);

location.get('/', verifyToken, LocationController.getLocation);

export default location;
