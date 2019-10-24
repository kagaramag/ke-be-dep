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
    idNotFound: 'the provided chat ID is not valid, it should be an integer',
    commentNotFound: 'Comment is not in history',
    highlightError:
      'Sorry the length of your highlighted text does not match with start and end index',
    noChoice: 'You have no highlights',
    choiceNotFound: 'Sorry, this highlight does not exist',
    parentError: 'Sorry, you have to be a parent to perform this action',
    configSet: 'you already have set configurations',
    configNot: "you haven't set configuration",

    // Success messages
    legal: 'Legal documents',
    deleteChoice: 'You have successfully removed your highlight',

    choosenHighlight: 'You have highlighted this text',
    messageSent: 'message successfully sent',
    deleteChat: 'chat successfully deleted',
    commentSuccess: 'Comment successfully created',
    commentFetch: 'Comments fetched successfully',
    commentDelete: 'Comment successfully deleted',
    commentEdit: 'Comment edited successfully',
    allComments: 'All previous comments',
    removeComment: 'Comment removed from history successfully',
    commentLike: 'You liked the comment',

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
    idNotFound: 'ubutumwa ushaka ntibubaho',
    commentNotFound: 'igitekerezo ntikibashije kuboneka',
    highlightError: 'ntibibashije gukunda',
    noChoice: 'Nta jambo wahisemo',
    choiceNotFound: 'Iri jambo ntiribonetse',
    parentError: 'Umubyeyi wenyine niwe wemerewe gukora kino gikorwa',

    configSet: 'Ibi byari byakozwe',

    configNot: 'ntabwo wabihisemo',

    // Success messages
    legal: 'Ibyangombwa byose',

    deleteChoice: 'Ijambo wari wahisemo rirasibwe',
    choosenHighlight: 'Uhisemo iri jambo',

    commentLike: 'Igitekerezo uragikunze',

    removeComment: 'igitekerezo cyakuwe mubindi',
    allComments: 'ibiganiro byose',
    commentEdit: 'igitekerezo cyahinduwe',
    commentDelete: 'igitekerezo cyasibwe',
    commentFetch: 'ibiganiro byatanzwe',
    commentSuccess: 'igitekerezo cyoherejwe',
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
