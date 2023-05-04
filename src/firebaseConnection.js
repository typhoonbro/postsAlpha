import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCqTeQBVk-i7zzctPpczGXLhDK8FlvJFzY",
    authDomain: "movies-88ad5.firebaseapp.com",
    projectId: "movies-88ad5",
    storageBucket: "movies-88ad5.appspot.com",
    messagingSenderId: "27570765232",
    appId: "1:27570765232:web:fd069e43cfd0c8f2366a75",
    measurementId: "G-T4E9XXFHY5"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  export {db};