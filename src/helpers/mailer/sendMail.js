import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';
import * as template from './templates';
import db from '../../models';

dotenv.config();

export default async (to, action, data) => {
  const { SENDGRID_API_KEY, EMAIL_SENDER, NODE_ENV } = process.env;

  mailer.setApiKey(SENDGRID_API_KEY);
  const notifier = await template[action](data);
  const mottos = [
    'Put your kids ahead of their peers',
    'Put your kids on the head of their peers',
    'Connecting student with teacher',
    'Igniting mind for success'
  ];
  const motto = mottos[Math.floor(Math.random() * mottos.length)];
  const message = {
    to: to || notifier.to,
    from: EMAIL_SENDER,
    subject: notifier.subject,
    fromname: 'Keetela - Igniting minds for success',
    text: 'Keetela',
    html: `<div style="width:100%;background:#efefef;font-family:">
    <!-- HEADER -->
    <div style="text-align:center;padding:10px 25px;color:#878787">
       <div style="font-weight:800;color:#304894;font-size:33px;text-align:center">Keetela</div>
    </div>
    <!-- BODY -->
    <div style="max-width:700px;background:#ffffff;width:96%;margin:15px auto;font-size:16px;display:block;border:1px solid #cdcdcd;border-top:none;border-radius:0 0 10px 10px;padding:0;box-shadow:0 0 25px rgba(0,0,0,0.17)">
       <div style="background:#304894;height:12px"></div>
       <div style="padding:25px">
          ${notifier.html} 
          <br>
          Best regards,<br>
          The Keetela Team
       </div>
    </div>
    <div style="padding:5px 30px;text-align:center">${motto}</div>
    <div style="text-align:center;padding:10px 25px 35px 25px;color:#878787">
       <div> &copy; Keetela 2019, <br>a Nivelo Lab Company.</div>
    </div>
    <!-- BODY, END -->
 </div>`
  };
  if (NODE_ENV === 'test') return true;
  // find receiver
  const { dataValues: { id } } = await db.User.findOne(
    { where: { email: message.to }, logging: false }
  );
  const content = {
    body: message.html,
    subject: message.subject,
    receiverId: id
  };

  db.Mail.create(content, { logging: false });
  return mailer.send(message);
};
