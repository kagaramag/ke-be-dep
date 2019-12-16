import uniqid from 'uniqid';

export default number => uniqid.process().substring(0, number);
