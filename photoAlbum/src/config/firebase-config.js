import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHVXDBbtwp4fS1v7i5to13K77hzHVWBKM",
  authDomain: "photoalbum-1a065.firebaseapp.com",
  projectId: "photoalbum-1a065",
  storageBucket: "photoalbum-1a065.appspot.com",
  messagingSenderId: "976033449327",
  appId: "1:976033449327:web:bbc430fc99b8216000d49a"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const storage = firebase.storage();