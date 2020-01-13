import status from '../config/status';
import * as helper from '../helpers';

export default async (req, res, next) => {
  const token = req.body.token || null;

  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ errors: { token: 'Sorry, We are not recognizing the action you are trying to perform' } });
  }

  const decodedToken = helper.token.decode(token);

  if (decodedToken.errors || !decodedToken) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ errors: { token: 'Failed to verify your activation link. Contact us for help' } });
  }
  req.user = decodedToken;
  return next();
};
