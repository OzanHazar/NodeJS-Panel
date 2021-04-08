const admin = require("firebase-admin");
const firebase = require('firebase');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mhpapp-23c4e-default-rtdb.firebaseio.com",
    storageBucket: "mhpapp-23c4e.appspot.com",
});

var firebaseConfig = {
    apiKey: "AIzaSyBW-eIzFn17YseudUJYok4X6hSjtLwcZ5Y",
    authDomain: "mhpapp-23c4e.firebaseapp.com",
    databaseURL: "https://mhpapp-23c4e-default-rtdb.firebaseio.com",
    projectId: "mhpapp-23c4e",
    storageBucket: "mhpapp-23c4e.appspot.com",
    messagingSenderId: "108412306514",
    appId: "1:108412306514:web:c62b3b69b1b339e39acb8b",
    measurementId: "G-6YJ3QR47C8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();
var bucket = admin.storage().bucket();
const authh = firebase.auth();

module.exports.auth = authh;
module.exports.admin = admin;
module.exports.db = db;
module.exports.bucket = bucket;