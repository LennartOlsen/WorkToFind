/*992421744328-h9btjplttmhcqhgkhpqod7i1pmubl27h.apps.googleusercontent.com

rTymziDjKZWJZGzhiMsLgmVl*/

//@ts-check
export const TYPES = {
    EMPLOYEE : 'employee',
    CONTRACTOR : 'contractor',
    BOTH : 'both'
}

export default class Profile {
    constructor(uid, 
        displayName = '', 
        type = null, 
        state = null,
        updateTime = null,
        deleteTime = null){
            if(uid == null){
                throw "Profile initialized with no uid"
            }
            this.uid = uid

            this.displayName = displayName
            this.type = type
            this.state = state
            this.updateTime = updateTime
            this.deleteTime = deleteTime
    }

    static fromFirebase(fb){
        let entity = new Profile(fb.uid)
        for(var key in fb){
            if(fb.hasOwnProperty(key)){
                    entity[key] = fb[key]
            }
        }
        return entity
    }

    isPristine(){
        return this.updateTime == null
    }
}