// Firebase config for grocery-store-website
const firebaseConfig = {
  apiKey: "AIzaSyCqIe0O17xL_FCTlbIXbsG-OGnoXocvknY",
  authDomain: "grocery-store-website-94c85.firebaseapp.com",
  projectId: "grocery-store-website-94c85",
  storageBucket: "grocery-store-website-94c85.firebasestorage.app",
  messagingSenderId: "230329464838",
  appId: "1:230329464838:web:08a7992f5d65aaa066ab87"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

