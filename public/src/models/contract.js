//@ts-check

export default class Contract {
    constructor(id,
        uid, 
        description = '', 
        employee = null,
        hours = 0,
        updateTime = null,
        deleteTime = null,
        max_price = 0,
        next_bid = null,
        label = null){
            
            if(id == null){
                throw "Contract initialized with no id"
            }
            if(uid == null){
                throw "Contract initialized with no uid"
            }
            this.id = id
            this.uid = uid
            this.employee = employee
            this.hours = hours
            this.max_price = max_price
            this.next_bid = next_bid
            this.label = null

            this.updateTime = updateTime
            this.deleteTime = deleteTime
    }

    static fromFirebase(fb){
        let entity = new Contract(fb.id, fb.uid)
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