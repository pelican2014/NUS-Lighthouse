import firebase from 'firebase';

const db = firebase
  .initializeApp({
    databaseURL: 'https://bt3103-lighthouse.firebaseio.com/',
  })
  .database();

export default db;
