import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBx6hg_fpHbYwCRXwfO61wIxbYCOttBxCg",
    authDomain: "storyhub-80181.firebaseapp.com",
    projectId: "storyhub-80181",
    storageBucket: "storyhub-80181.appspot.com",
    messagingSenderId: "167638328130",
    appId: "1:167638328130:web:d146ebe0ce46a8b63a5edb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();