import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD3ptXgOfD2jLpSnLfCYcHFkflh7eyiX7E",
  authDomain: "crwn-clothing-db-ae03c.firebaseapp.com",
  projectId: "crwn-clothing-db-ae03c",
  storageBucket: "crwn-clothing-db-ae03c.appspot.com",
  messagingSenderId: "317139061576",
  appId: "1:317139061576:web:20377303bbc3458052817d",
  measurementId: "G-XB5VKP4MHJ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
