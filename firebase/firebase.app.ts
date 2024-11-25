// import { initializeApp, getApp } from '@react-native-firebase/app';
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyCe1pQjvjjE3iU_4YkUGXT3CEQjxXfAcxY",
  authDomain: "boulderbuddy-197ef.firebaseapp.com",
  projectId: "boulderbuddy-197ef",
  storageBucket: "boulderbuddy-197ef.firebasestorage.app",
  messagingSenderId: "519489626237",
  appId: "1:519489626237:web:9bca26332cb02c159bd114",
  measurementId: "G-X5DKCTQQLG",
  databaseURL: 'default'
}

export default function getFireApp() {
  let app: FirebaseApp;

  if (Platform.OS === 'web') {
    app = initializeApp(firebaseConfig);
  } else if (Platform.OS === 'android') {
    console.log('TO DO: set up android support');
    app = initializeApp(firebaseConfig);
  } else {
    console.log('TO DO: set up android support');
    app = initializeApp(firebaseConfig);
  }

  return getApp(app.name);
}
