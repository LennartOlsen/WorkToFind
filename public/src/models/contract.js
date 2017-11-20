//@ts-check

export default class Contract {
    constructor(id, 
        description = '', 
        uid = null, 
        employee = null,
        hours = null,
        updateTime = null,
        deleteTime = null){
            
            if(id == null){
                throw "Contract initialized with no uid"
            }
            if(uid == null){
                throw "Contract initialized with no owner"
            }
            this.id = id
            this.uid = uid
            this.employee = employee
            this.hours = hours

            this.updateTime = updateTime
            this.deleteTime = deleteTime
    }

    static fromFirebase(fb){
        let entity = new Contract(fb.id)
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