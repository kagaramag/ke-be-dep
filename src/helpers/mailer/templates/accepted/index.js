import * as query from '../../../../queries';

export default async (data = {}) => {
  const kid = await query.Kid.findOne({ id: data.dataValues.tuteeId });
  const tutor = await query.User.findOne({ id: data.dataValues.tutorId });
  const message = {};
  message.to = kid.parent.email;
  message.subject = 'Tutorship accepted';
  message.notice = 'You have received this email because you are a parent.  If you received this email by mistake, you may leave it or contact us.';
  message.html = `Dear <b>${kid.parent.firstName} ${kid.parent.lastName}</b>,<br/>
  <p>
  We are very excited to tell you that ${tutor.firstName} ${tutor.lastName} has accepted  to tutor your adorable kid <b>${kid.names}</b>
  <br>
    Click on the link below, to start tracking the tutorship information day by day including direct message with tutor, study material, kid performance, etc.<br>
    <div style="width:100%;margin:10px 0;clear:both">
    <a
      href='http://keetela.com'
      style="margin:35px 0;padding:15px 35px;background:#304894;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
    Tutorship
    </a>
    </div>
    <br>
    If you don't have time or it is not possible for you to tutor this kid, please you can kindly reject this request.

  </p>`;
  return message;
};
