import * as query from '../../../../queries';

export default async (data = {}) => {
  const kid = await query.Kid.findOne({ id: data.dataValues.tuteeId });
  const tutor = await query.User.findOne({ id: data.dataValues.tutorId });
  const message = {};
  message.to = kid.parent.email;
  message.subject = 'Tutorship request rejected';
  message.notice = 'You have received this email because you are a parent.  If you received this email by mistake, Please, contact us right await.';
  message.html = `Dear <b>${kid.parent.firstName} ${kid.parent.lastName}</b>,<br/>
  <p>
  Thank you for you interest in hiring  <b>${tutor.firstName} ${tutor.lastName}</b> as a tutor of <b>${kid.names}</b>. 
  Unfortunately, due to ${tutor.gender === 'male' ? 'his' : 'her'} different reasons ${tutor.gender === 'male' ? 'he' : 'she'} could not tutor your child.
  <br>
    We would like to suggest your to look for another tutor in our directory<br>
    <a
      href='http://keetela.com'
      style="margin:35px 0;padding:15px 35px;background:#304894;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
    Find tutor
    </a>
  </p>`;
  return message;
};
