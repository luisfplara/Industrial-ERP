import { initializeApp, getApps, cert } from 'firebase-admin/app';


const serviceAccount = JSON.parse(
    process.env.FIREBASE_SECRET_KEY_ADM as string
  );

const firebaseAdminConfig = {
    credential: cert( serviceAccount||'')
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}