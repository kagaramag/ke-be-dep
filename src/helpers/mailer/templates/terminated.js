import 'dotenv/config';
import * as query from '../../../queries';

export default async (data = {}) => {
  const kid = await query.Kid.findOne({ id: data.dataValues.tuteeId });
  const tutor = await query.User.findOne({ id: data.dataValues.tutorId });
  const message = {};
  message.to = kid.parent.email;
  message.subject = 'Terminate tutorship contract';
  message.notice = 'You have received this email because you have requested to cancel a contract you have with your child.  If you received this email by mistake, please contact us immediately.';
  message.html = `Dear <b>${kid.parent.firstName} ${kid.parent.lastName}</b>,<br/>
  <p>
    Following your request to stop Mr./Mrs <b>${tutor.firstName} ${tutor.lastName}</b> to continue tutoring your child,
    <br>
    We are would like to tell you that we terminated the tutorship contract between you and him/her.
    <br>
    <br>
     You can click on the link below to find find other tutor.
    <br>
    <br>
    <a
      href='http://keetela/tutors'
      style="margin:35px 0;padding:15px 35px;background:#304894;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
    Find tutors
    </a>
    <br>
  </p>`;

  return message;
};
