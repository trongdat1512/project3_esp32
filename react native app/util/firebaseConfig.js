import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCz8Ni49aBBhmsop-J0yINvgqY1d9tmivU",
    authDomain: "project3-8fdac.firebaseapp.com",
    projectId: "project3-8fdac",
    storageBucket: "project3-8fdac.appspot.com",
    messagingSenderId: "170641220852",
    appId: "1:170641220852:web:4b0cc467da52eae06f2aa1",
    measurementId: "G-7N4G3M3BES"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
