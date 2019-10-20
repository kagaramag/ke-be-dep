import random from 'random-int';
import db from '../../models';

export default async (firstName, lastName) => {
  let prevUsername = `${firstName}.${lastName}`;
  const nextUsername = '';

  const reCheckUser = async () => {
    prevUsername = await db.User.findOne({ username: prevUsername });
    return prevUsername;
  };
  if (prevUsername !== nextUsername) {
    return nextUsername;
  }
};
