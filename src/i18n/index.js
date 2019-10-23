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

    // Success messages
    loginSuccessful: 'You have logged in successfully',
    emailSent: 'Email sent, please check your email'
  },

  fr: {
    // Error messages
    usernameNotExists: 'Nta konti ikoresha iri zina ibashije kuboneka',

    // Success messages
    loginSuccessful: 'Ubashije kwinjira neza',
    emailSent: 'Reba ubutumwa bwoherejwe kuri email yanyu'
  }
};
