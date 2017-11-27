//@ts-check
const functions = require('firebase-functions');
const admin = require('firebase-admin');

/** Firebase DB init */
admin.initializeApp(functions.config().firebase);


exports.createProfileInDB = functions.auth.user().onCreate(event => {
    let profile = {}
    profile.uid = event.data.uid
    profile.displayName = event.data.displayName
    profile.photoURL = event.data.photoURL
    return admin.database().ref("profiles").child(profile.uid).set(profile,(error) => {
        if(error){
            console.log(error)
        } else {
            console.log("User created", profile.displayName)
        }
    })
});

exports.reactToNewBid = functions.database.ref('contracts/{contractId}/bids').onUpdate(event => {
    let bid = event.data
})