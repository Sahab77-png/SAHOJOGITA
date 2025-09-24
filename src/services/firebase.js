import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { API_KEY } from '../config/constants';
const firebaseCofig = {
  apiKey: API_KEY,
  authDomain: 'sahojogita-cef4d.firebase.com',
  projectId: 'sahojogita-cef4d',
  storageBucket: 'sahojogita.appspot.com',
  messagingSenderId: '597695025500',
  appId: '1:336653539423:android:3bc120a338c240a185a3ea',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCofig);
}
export { auth, firestore as db, messaging };
