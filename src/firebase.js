import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyABmTa09SWMgii6gL_dP4bkpZnznHTXWRU",
    authDomain: "trading-app-ff609.firebaseapp.com",
    projectId: "trading-app-ff609",
    storageBucket: "trading-app-ff609.appspot.com",
    messagingSenderId: "880497580690",
    appId: "1:880497580690:web:6a49661ffbb914d851a44b"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  
  export {db}