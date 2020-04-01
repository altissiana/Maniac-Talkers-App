const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const {db} = require('./util/admin');

const FBAuth = require('./util/fbAuth'); 

const { getAllScreams,  
    postAScream, 
    getScream, 
    commentOnScream,
    likeScream,
    unlikeScream, 
    deleteScream
} = require('./posts/screams');

const { 
    signup, 
    login, 
    uploadImage, 
    addUserDetails,
    getAuthenticateUser,
    getUserDetails,
    markNotificationsRead
} = require('./posts/users');

//scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postAScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', FBAuth, deleteScream);
app.post('/scream/:screamId/like', FBAuth, likeScream);
app.post('/scream/:screamId/unlike', FBAuth, unlikeScream);
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

//users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticateUser);
app.get('/user/:name', getUserDetails)
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions
        .firestore
        .document('likes/{id}')
        .onCreate((snapshot) => {
        return db.doc(`/screams/${snapshot.data().screamId}`).get()
        .then(doc => {
            if(doc.exists && doc.data().userName !== snapshot.data().userName){
                return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().userName,
                    sender: snapshot.data().userName,
                    type: 'like',
                    reade: false,
                    screamId: doc.id
                });
            }
        })
        .catch((err) => {
            console.error(err);
        });
});

exports.createNotificationOnComment = functions
.region('us-central1')
.firestore.document('comments/{id}')
.onCreate((snapshot) => {
    return db.doc(`/screams/${snapshot.data().screamId}`)
    .get()
    .then((doc) => {
        if (doc.exist && doc.data().userName !== snapshot.data().userName) {
            return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userName,
                sender: snapshot.data().userName,
                type: 'comment',
                read: false,
                screamId: doc.id
            });
        }
    })
    .catch((err) => {
        console.error(err);
    });
});

exports.deleteNotificationOnUnlike = functions
.region('us-central1')
.firestore.document('likes/{id}')
.onDelete((snapshot) => {
    return db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .catch(err => {
        console.error(err);
        return;
    });
});

exports.onUserImageChange = functions
.region('us-central1')
.firestore.document('/users/{userId}')
.onUpdate((change) => {
    if(change.before.data().imageUrl !== change.after.data().imageUrl){
        let batch = db.batch();
            return db.collection('screams').where('userHandle', '==', change.before.data().name).get()
        .then((data) => {
            data.forEach(doc => {
            const scream = db.doc(`/screams/${doc.id}`);
            batch.update(scream, { userImage: change.after.data().imageUrl });
            });
                return batch.commit();
        });
    }
});

exports.onScreamDelete = functions
.region('us-central1')
.firestore.document('screams/{screamId}')
.onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch;
    return db.collection('comments').where('screamId', '==', screamId).get()
        .then(data => {
            data.forEach(doc => {
                batch.delete(db.doc(`/comments/${doc.id}`))
            })
            return db.collection('likes').where('screamId', '==', screamId).get()
        })
        .then(data => {
            data.forEach(doc => {
                batch.delete(db.doc(`/likes/${doc.id}`))
            })
            return db.collection('notifications').where('screamId', '==', screamId).get()
        })
        .then(data => {
            data.forEach(doc => { 
                batch.delete(db.doc(`/notifications/${doc.id}`))
            })
            return batch.commit();
        })
        .catch(err => console.error(err));       
});
