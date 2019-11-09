import * as query from '../../../../queries';

export default async (data = {}) => {
  const kid = await query.Kid.findOne({ id: data.dataValues.tuteeId });
  const message = {};
  message.to = kid.parent.email;
  message.subject = 'Tutorship Accepted';
  message.notice = 'You have received this email because you are a member of keetela.com.  If you received this email by mistake, Please, contact us as soon as possible.';
  message.html = `Hello,<br/>
  <p>
  We would like to tell you that we terminated the tutorship contract you with ${kid.parent.firstName} ${kid.parent.lastName} to tutor ${kid.parent.gender === 'male' ? 'his' : 'her'} kid ${kid.names}
  </p>`;
  return message;
};
