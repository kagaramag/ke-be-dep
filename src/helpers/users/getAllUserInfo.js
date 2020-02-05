// eslint-disable-next-line import/no-cycle
import {
  User,
  Article,
  Kid,
  Education,
  Legal,
  Location,
  TutorDetails,
  query
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
  const education = await Education.findAll({ userId: user.id });
  // get user legal document
  const details = await TutorDetails.findOne({ userId: user.id });
  // get user education
  const services = await query.findAll('Service', { userId: user.id });
  // get user legal document
  const legal = await Legal.findOne(user.id);
  let paper;
  let checkDiploma = false;
  if (
    legal
    && legal.diploma
    && legal.diploma.length > 0
    && legal.diploma !== 'NULL'
  ) {
    checkDiploma = true;
  }
  if (legal) {
    paper = {
      id: legal.id,
      createdAt: legal.createdAt,
      updatedAt: legal.updatedAt,
      diploma: checkDiploma,
      passport: !!legal.passport,
      seniorFive: !!legal.seniorFive,
      seniorSix: !!legal.seniorSix,
      cv: !!legal.cv,
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
    legal: paper || null,
    location,
    details,
    services
  };
};
