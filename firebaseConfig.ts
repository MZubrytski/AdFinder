// Import the functions you need from the SDKs you need
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.manifest2?.extra?.firebaseApiKey,
  authDomain: Constants.manifest2?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest2?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest2?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest2?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest2?.extra?.firebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
