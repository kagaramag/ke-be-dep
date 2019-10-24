export const availableLangs = ['fr', 'en'];

// fr is for kinyarwanda translations

/*
setting up headers
accept-language: fr_MX or en_MX
*/

export const messages = {
  en: {
    // Error messages
    usernameNotExists: 'This user with the username does not exist',
    incorrectCredentials: 'The credentials you provided are incorrect',
    noAccess: 'Unauthorized access',
    userNotFound: 'sorry, user with id  not found!!',
    emailNotFound: 'email not found..',
    passwordNotMatching: 'Passwords are not matching',
    passEmpty: 'the password can not be empty',
    required: 'required',
    passNotChanged: 'Password not updated',

    // Success messages
    signupSuccessful:
      'Thank you for registering. Please, check your email to activate your account',
    loginSuccessful: 'You have logged in successfully',
    deactivateAccount: 'User account deleted successfully',
    passChanged: 'Success! your password has been changed.',
    emailSent: 'Email sent, please check your email'
  },

  fr: {
    // Error messages
    usernameNotExists: 'Nta konti ikoresha iri zina ibashije kuboneka',
    incorrectCredentials: 'Ukoresheje ibikuranga bitari byo',
    noAccess: 'Nta burenganzira ubifitiye',
    userNotFound: 'Konti ye ntibashije kuboneka',
    emailNotFound: 'iyo email ntibaho',
    passwordNotMatching: "Amagambo y'ibanga ntabwo asa, ongera",
    passEmpty: "Nta jambo ry'ibanga wanditse",
    passNotChanged: "ijambo ry'ibanga ntiryahindutse",
    required: 'irakenewe',
    // Success messages
    signupSuccessful:
      'Murakoze gufunguza konti. Reba email tukoherereje ubashe gutangiza konti yanyu',
    deactivateAccount: 'Konti yawe irasibwe',
    loginSuccessful: 'Ubashije kwinjira neza',
    emailSent: 'Reba ubutumwa bwoherejwe kuri email yanyu',
    passChanged: "Byizaaa! ijambo ry'ibanga ryawe ryahinduwe."
  }
};
