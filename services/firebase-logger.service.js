import firebase from 'firebase';

export const logError = async (error, info) => {
  const db = firebase.database();
  const date = new Date();
  const user = firebase.auth().currentUser || 'not_logged_in';
  try {
    console.log('FIREBASE ERROR', error);
    console.log('FIREBASE INFO', info);
    await db.ref(`errors/${date.valueOf()}`).set({
      error: error.toString(),
      info: info.toString(),
      user
    });
  } catch (err) {
    console.log('error persisting failed:', err);
  }
};