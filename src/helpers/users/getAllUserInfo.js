// eslint-disable-next-line import/no-cycle
import {
 User, Article, Kid, Education, Legal, Location 
} from '../../queries';

export default async (username) => {
  const user = await User.getUserByUsername({ username });
  // get articles by user
  if (!user) {
    return null;
  }
  const articles = await Article.getAll(10, 0, {
    userId: user.id,
    status: 'published'
  });
  // get user kids
  const kids = await Kid.findAll({ userId: user.id });
  // get user education
  const education = await Education.findAll({ username: user.username });
  // get user education
  const legal = await Legal.findOne(user.id);
  let paper;
  if (legal) {
    paper = {
      id: legal.id,
      createdAt: legal.createdAt,
      diploma: !!legal.diploma,
      passport: !!legal.passport,
      seniorFive: !!legal.seniorFive,
      seniorSix: !!legal.seniorSix,
      status: legal.status
    };
  }
  // get user location
  const location = await Location.findOne(user.id);
  return {
    user,
    articles,
    kids,
    education,
    legal: paper,
    location
  };
};
