import status from '../config/status';
import { payment } from '../helpers';

/**
 * A class to handle actions performed on article tags
 */
class PaymentsController {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async create(req, res) {
    const data = {
      phone: req.body.phone,
      amount: req.body.total,
      transactionId: req.subscription.uuid
    };
    const response = await payment.pay(data);
    console.log('res pay', response);
    return response && response.errors
      ? res.status(status.BAD_REQUEST).json({
          errors: response.errors
        })
      : res.status(status.CREATED).json({
          message:
            'Thank you for working with us. To complete your payment, please check mobile phone and add your PIN number'
        });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async callback(req, res) {
    console.log('callback controller: treating response object', req.body);
  }
}

// validation
export default PaymentsController;
