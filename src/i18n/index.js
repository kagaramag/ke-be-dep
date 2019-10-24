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
    messageError: 'the message should be a string and should not be empty',
    invalidAccount: 'your account is not valid',
    serverError: 'Oops, something went wrong',
    notdeleteChat: 'chat not deleted',

    // Success messages
    messageSent: 'message successfully sent',
    deleteChat: 'chat successfully deleted',

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
    messageError: 'Ntibyemewe kohereza ubutumwa burimo ubusa',

    invalidAccount: 'Konti yawe ntiremezwa',
    serverError: 'Reba ko ufite internet ikora neza',

    // Success messages
    deleteChat: 'ubutumwa burasibwe',
    notdeleteChat: 'ubutumwa ntibubashije gusibwa',
    messageSent: 'ubutumwa bwoherejwe',
    signupSuccessful:
      'Murakoze gufunguza konti. Reba email tukoherereje ubashe gutangiza konti yanyu',
    deactivateAccount: 'Konti yawe irasibwe',
    loginSuccessful: 'Ubashije kwinjira neza',
    emailSent: 'Reba ubutumwa bwoherejwe kuri email yanyu',
    passChanged: "Byizaaa! ijambo ry'ibanga ryawe ryahinduwe."
  }
};
