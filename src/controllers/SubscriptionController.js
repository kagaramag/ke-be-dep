import status from '../config/status';
import { query } from '../queries';
import db from '../models';
/**
 * A class to handle actions performed on subscriptions
 */
class SubscriptionController {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async getMySubscriptions(req, res) {
    const condition = {
      userId: req.user.id
    };

    const include = [
      {
        model: db.Service,
        as: 'service'
      },
      {
        model: db.Kid,
        as: 'kid'
      }
    ];

    const pagination = {
      offset: req.params.offset || 0,
      limit: req.params.limit || 5
    };

    const subscriptions = await query.findAll(
      'Subscription',
      condition,
      include,
      pagination
    );
    return subscriptions && subscriptions.length
      ? res.status(status.OK).send({
        subscriptions,
        message: 'Subscriptions has been loaded successfully'
      })
      : res.status(status.NOT_FOUND).send({
        errors: [{ subscriptions: 'No subscription found yet' }],
        subscriptions: []
      });
  }
}

// validation
export default SubscriptionController;
