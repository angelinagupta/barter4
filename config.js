import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyC454awGZsgRiWhYIL5eEEKhgeDjXbj98k",
    authDomain: "bartersystem-aff2f.firebaseapp.com",
    projectId: "bartersystem-aff2f",
    storageBucket: "bartersystem-aff2f.appspot.com",
    messagingSenderId: "304651057978",
    appId: "1:304651057978:web:1f81c05b9abb438a4e6e03"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();