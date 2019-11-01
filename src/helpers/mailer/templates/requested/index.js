import * as query from '../../../../queries';

export default async (data = {}) => {
  const kid = await query.Kid.findOne({ id: data.dataValues.tuteeId });
  const tutor = await query.User.findOne({ id: data.dataValues.tutorId });
  const message = {};
  message.to = tutor.email;
  message.subject = 'Tutorship request';
  message.notice = 'You have received this email because you are a tutor.  If you received this email by mistake, you may leave it or contact us.';
  message.html = `Dear <b>${tutor.firstName} ${tutor.lastName}</b>,<br/>
  <p>
  We are very excited to tell you that ${kid.parent.firstName} ${kid.parent.lastName} has requested you to tutor his/her adorable kid <b>${kid.names}</b>
  <br>
    To confirm this request, please click on the link below.<br>
    <div style="width:100%;margin:10px 0;clear:both">
    <a
      href='http://keetela.com'
      style="margin:35px 0;padding:15px 35px;background:#304894;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
    Accept Request
    </a>
    </div>
    <br>
    If you don't have time or it is not possible for you to tutor this kid, please you can kindly reject this request.

  </p>`;
  return message;
};
