import 'dotenv/config';
import { generate as generateToken } from '../../tokens';

export default ({ email, firstName, lastName }) => {
  const message = {};
  const token = generateToken({ email }, { expiresIn: '1h' });
  const appUrl = process.env.APP_URL_BACKEND;
  const singUpLink = `${appUrl}/api/v1/auth/activate/${token}`;

  message.subject = 'Activate your account';
  message.notice = 'You have received this email because you have signed up for NiveloLab.  If you received this email by mistake, simply delete it. You will not be subscribed if you do not click the confirmation link above';
  message.html = `Hello <b>${firstName} ${lastName}</b> </br>,
  <p>
    You are receiving this because you requested to create an account on Nivelo,
    <br>
    Please, click on the link bellow to activate your account!!!
    <br><br><br>
    <a
      href='${singUpLink}'
      style="margin:35px 0;padding:15px 35px;background:#266cef;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
    Activate account Now
    </a>
    <br>
  </p>`;

  return message;
};
