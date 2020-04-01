var admin = require("firebase-admin");
var serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://maniac-talkers.firebaseio.com",
    storageBucket: "gs://maniac-talkers.appspot.com/"
  });

const db = admin.firestore();

module.exports = {admin, db, serviceAccount};