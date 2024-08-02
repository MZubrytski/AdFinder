// Import the functions you need from the SDKs you need
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
// import { Platform } from 'react-native';
// import 'dotenv/config';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =
  // Platform.OS === 'web'
  //   ? {
  //       apiKey: process.env.FIREBASE_API_KEY,
  //       authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //       projectId: process.env.FIREBASE_PROJECT_ID,
  //       storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //       messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //       appId: process.env.FIREBASE_APP_ID,
  //     }
  //   :
  {
    apiKey: Constants.manifest2?.extra?.expoClient?.extra?.firebaseApiKey,
    authDomain:
      Constants.manifest2?.extra?.expoClient?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest2?.extra?.expoClient?.extra?.firebaseProjectId,
    storageBucket:
      Constants.manifest2?.extra?.expoClient?.extra?.firebaseStorageBucket,
    messagingSenderId:
      Constants.manifest2?.extra?.expoClient?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest2?.extra?.expoClient?.extra?.firebaseAppId,
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
