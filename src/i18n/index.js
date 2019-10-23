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

    // Success messages
    loginSuccessful: 'You have logged in successfully',
    emailSent: 'Email sent, please check your email'
  },

  fr: {
    // Error messages
    usernameNotExists: 'Nta konti ikoresha iri zina ibashije kuboneka',
    incorrectCredentials: 'Ukoresheje ibikuranga bitari byo',

    // Success messages
    loginSuccessful: 'Ubashije kwinjira neza',
    emailSent: 'Reba ubutumwa bwoherejwe kuri email yanyu'
  }
};
