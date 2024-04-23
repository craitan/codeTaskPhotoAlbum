import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHVXDBbtwp4fS1v7i5to13K77hzHVWBKM",
  authDomain: "photoalbum-1a065.firebaseapp.com",
  projectId: "photoalbum-1a065",
  storageBucket: "photoalbum-1a065.appspot.com",
  messagingSenderId: "976033449327",
  appId: "1:976033449327:web:bbc430fc99b8216000d49a"
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

export const storage = getStorage(app);