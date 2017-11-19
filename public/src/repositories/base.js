//@ts-check
import firebase from 'firebase'

export default class BaseRepository {
    constructor(key){
        this.key = key
        this.dbRef = firebase.database
    }
}