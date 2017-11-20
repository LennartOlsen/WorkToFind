//@ts-check
export const STATES = {
    ACCEPTED : 'accepted'
}

export default class Bid {
    constructor(
        id,
        uid,
        contractId = null,
        state = null,
        value = null,
        updateTime = null,
        deleteTime = null,
    ){
        if(id == null){
            throw "Bid initialized with no id"
        }
        if(uid == null){
            throw "Bid initialized with no uid"
        }

        this.id = id
        this.uid = uid
        this.contractId = contractId
        this.value = value
        this.state = state
        this.updateTime = updateTime
        this.deleteTime = deleteTime
    }

    static fromFirebase(fb){
        let entity = new Bid(fb.id, fb.uid)
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