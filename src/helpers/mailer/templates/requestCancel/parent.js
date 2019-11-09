import * as query from '../../../../queries';

export default async (data = {}) => {
  const kid = await query.Kid.findOne({ id: data.dataValues.tuteeId });
  const tutor = await query.User.findOne({ id: data.dataValues.tutorId });
  const message = {};
  message.to = kid.parent.email;
  message.subject = 'Notice: Termination of tutorship contract';
  message.notice = 'You have received this email because you have requested to cancel a contract you have with your child.  If you received this email by mistake, please contact us immediately.';
  message.html = `Hello <b>${kid.parent.firstName} ${kid.parent.lastName}</b>,<br/>
  <p>
    You have request to cancel the contract you have with <b>${tutor.firstName} ${tutor.lastName} </b>.
    <br>
    We understand that there is different reasons that may cause the termination of contract. However we encourage our customers to get in touch with us and see if we can't do something else.<br />
    Our staffs are always available to help our tutors to build a good sense of rapport. <br><br>
    Please, allow us to contact you as soon as possible before terminating the contract. But, note that, we don't force you to stay with a tutor.
    <br>
  </p>`;
  return message;
};
