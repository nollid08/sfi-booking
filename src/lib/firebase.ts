import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: 'AIzaSyDHxgsYiuZeDenwpejCUu5URUNsvrQzjVE',
    authDomain: 'sfi-equipment-tracker.firebaseapp.com',
    projectId: 'sfi-equipment-tracker',
    storageBucket: 'sfi-equipment-tracker.appspot.com',
    messagingSenderId: '489761858597',
    appId: '1:489761858597:web:c303ab452643c65ff78bcc',
    measurementId: 'G-BHBMK2NGJR'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);