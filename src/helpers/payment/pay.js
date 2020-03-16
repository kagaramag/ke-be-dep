import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const { OPAY_ORG_ID, OPAY_URL, APP_URL_BACKEND, NODE_ENV } = process.env;
/**
 * @param {string} data customer payment information
 * @returns {object} the decoded token
 */
export default async (data = '') => {
  try {
    data = {
      telephoneNumber: data.phone || '',
      amount:
        NODE_ENV === 'development' || NODE_ENV === 'test' ? 100 : data.amount,
      organizationId: OPAY_ORG_ID || '',
      description: 'Payment for keetela package subscription',
      callbackUrl: `${APP_URL_BACKEND}/api/v1/payments/callback`,
      transactionId: data.transactionId
    };
    const res = await axios.post(OPAY_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Content-Length': 290
      }
    });
    return res && res.data;
  } catch (error) {
    return {
      errors: error && error.response.data.errors
    };
  }
};
