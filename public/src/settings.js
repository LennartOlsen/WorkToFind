//@ts-check
import firebase from 'firebase'
  
const config = {
    apiKey: "AIzaSyAjHOxVjMQvv-EDVxTr8oqzV3ASy3GCy5I",
    authDomain: "worktofind-49ccf.firebaseapp.com",
    databaseURL: "https://worktofind-49ccf.firebaseio.com",
    projectId: "worktofind-49ccf",
    storageBucket: "worktofind-49ccf.appspot.com",
    messagingSenderId: "992421744328"
};

export function getFirebase(){
    if (firebase.apps.length === 0) {
        firebase.initializeApp(config)
    }
    return firebase
}

export function getCurrentUser() {
    return getFirebase().auth().currentUser
}