import status from '../config/status';
import { query } from '../queries';

/**
 * A class to handle actions performed on services
 */
class ServiceController {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async create(req, res) {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      period: JSON.stringify(req.body.period),
      userId: req.user.id
    };
    const service = await query.create('Service', data);
    return service.errors
      ? res.status(status.CREATED).send({
          errors: service.errors
        })
      : res.status(status.CREATED).send({
          service,
          message: 'You have successfully created a service'
        });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async getMyServices(req, res) {
    const condition = {
      userId: req.user.id
    };
    const services = await query.findAll('Service', condition);
    return res.status(status.OK).send({
      services,
      message: 'Services has been loaded successfully'
    });
  }
}

// validation
export default ServiceController;
