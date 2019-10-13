import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';
import * as template from './templates';

dotenv.config();

export default async (to, action, data) => {
  const { SENDGRID_API_KEY, EMAIL_SENDER, NODE_ENV } = process.env;

  mailer.setApiKey(SENDGRID_API_KEY);

  const notifier = template[action](data);
  const mottos = [
    'Put your kids ahead of their peers',
    'Put your kids on the head of their peers',
    'Connecting student with teacher'
  ];
  const motto = mottos[Math.floor(Math.random() * mottos.length)];
  const message = {
    to,
    from: EMAIL_SENDER,
    subject: notifier.subject,
    fromname: 'Nivelo Lab',
    text: 'Nivelo',
    html: `<div style="width:100%;background:#efefef;font-family:">
    <!-- HEADER -->
    <div style="text-align:center;padding:10px 25px;color:#878787">
      <div style="font-weight:800;color:#304894;font-size:33px;text-align:center">TUTELA</div>
    </div>
    <!-- BODY -->
    <div style="max-width:700px;background:#ffffff;width:96%;margin:15px auto;font-size:16px;display:block;border:1px solid #cdcdcd;border-top-color:#304894;border-top-width:8px;border-radius:4px;padding:35px">
    ${notifier.html} 
    <br>
    <br>
    Best regards,<br>
    The Tutela Team
    </div>
    <div style="padding:5px 30px;text-align:center">${motto}</div>
    <div style="text-align:center;padding:10px 25px 5px 25px;color:#878787">
      <div> &copy; tutela 2019, <br>a Nivelo Lab Company.</div>
    </div>
    <!-- BODY, END -->
    </div>`
  };
  return NODE_ENV === 'test' ? true : mailer.send(message);
};
