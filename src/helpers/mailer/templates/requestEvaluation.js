import * as query from '../../../queries';

export default async (data = {}) => {
  const message = {};
  message.to = data.email;
  message.subject = 'Request evaluation';
  message.notice =
    'You have received this email because you are a tutor.  If you received this email by mistake, you may leave it or contact us.';
  message.html = `Dear <b>${data.firstName} ${data.lastName}</b>,<br/>
  <p>
  We have received your request successfully. We are going to evaluate your profile, we shall get back to you as soon as possible.
  <br>
  To continue, click on the link below.<br>
    <div style="width:100%;margin:10px 0;clear:both">
    <a
      href="${data.domain}/en/dashboard/t"
      style="margin:35px 0;padding:13px 35px;background:#304894;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
    My dashboard
    </a>
    </div>
  <br>
  </p>`;
  return message;
};
