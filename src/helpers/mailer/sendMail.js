/* eslint-disable import/no-cycle */
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
    'Igniting mind for success'
  ];
  const motto = mottos[Math.floor(Math.random() * mottos.length)];
  const message = {
    to: to || notifier.to,
    from: EMAIL_SENDER,
    subject: notifier.subject,
    fromname: 'Keetela - Igniting minds for success',
    text: 'Keetela.com',
    html: `<div style="width:100%;background:#ffffff;font-family:'Open Sans', sans-serif;font-weight:300">
    <!-- HEADER -->
    <div style="padding:10px 25px;">
       <img src="https://res.cloudinary.com/ninjas/image/upload/v1578860690/logo_XII_blue_vqpfkc.svg"
       style="width:100%;max-width:240px;height:80px;margin:15px auto;display:block;" alt="Keetela"
    </div>
    <!-- BODY -->
    <div style="max-width:700px;background:#ffffff;width:96%;margin:15px auto;font-size:16px;display:block;padding:0;">
       <div style="padding:25px">
          ${notifier.html} 
          <br>
          Best regards,<br>
          The Keetela Team
       </div>
    </div>
    <div style="padding:5px 15px;text-align:center;font-size:14px;">${motto}</div>
    <div style="font-size:14px;text-align:center;padding:5px 25px 35px 25px;color:#878787">
       <div>  &copy; Copyright ${new Date().getFullYear()}, <b>Keetela</b> Ltd</div>
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
