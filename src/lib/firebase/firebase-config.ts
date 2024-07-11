/* eslint-disable eslint-comments/require-description -- If you use directive comments, you should explain why you use them.*/

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { initializeApp, getApps, getApp, FirebaseOptions  } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import  {getFirestore} from "firebase/firestore";

// eslint-disable-next-line no-console
console.log( 'process.env.FIREBASE_CLIENT_SECRET',process.env.FIREBASE_CLIENT_SECRET )


//const firebaseConfig = JSON.parse(
//  process.env.FIREBASE_CLIENT_SECRET || ''
//) as FirebaseOptions;  
const firebaseConfig:FirebaseOptions  = {
  apiKey: 'AIzaSyAajbckN86uioXVxZ4jDizWs-gybbIv9B8',
  authDomain: 'polvilho-tres-coqueiros-erp.firebaseapp.com',
  projectId: 'polvilho-tres-coqueiros-erp',
  storageBucket: 'polvilho-tres-coqueiros-erp.appspot.com',
  messagingSenderId: '711465347696',
  appId: '1:711465347696:web:cd16b4f2d237f97ed562b5',
  measurementId: 'G-Z1QJ96RC6C'
}
  //console.log(firebaseConfig)

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestoreInstance  = getFirestore(app);

export {auth, provider, firestoreInstance}