import * as query from '../../../../queries';

export default async (data = {}) => {
  const tutor = await query.User.findOne({ id: data.dataValues.tutorId });
  const message = {};
  message.to = tutor.email;
  message.subject = 'Request evaluation';
  message.notice =
    'You have received this email because you are a tutor.  If you received this email by mistake, you may leave it or contact us.';
  message.html = `Dear <b>${tutor.firstName} ${tutor.lastName}</b>,<br/>
  <p>
  We have received your request successfully. We are going to evaluate your profile, we shall get back to you as soon as possible.
  <br>
  <br>
  Best regards,
  </p>`;
  return message;
};
