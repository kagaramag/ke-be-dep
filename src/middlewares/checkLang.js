import Polyglot from 'node-polyglot';
import { messages } from '../i18n';

exports.runPolyglot = (req, res, next) => {
  const locale = req.locale.language;

  console.log(locale);
  req.polyglot = new Polyglot();

  // fr is for kinyarwanda translations

  /*
  setting up headers
 accept-language: fr_MX or en_MX
*/
  if (locale == 'fr') {
    req.polyglot.extend(messages.fr);
    next();
  }
  if (locale == 'en') {
    req.polyglot.extend(messages.en);
    next();
  }
};
