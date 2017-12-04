//@ts-check
import Bid from './bid'

export default class Contract {
    /**
     * 
     * @param {*} id 
     * @param {*} uid 
     * @param {*} description 
     * @param {*} employee 
     * @param {*} hours 
     * @param {*} updateTime 
     * @param {*} deleteTime 
     * @param {*} maxPrice 
     * @param {*} nextBid 
     * @param {*} label 
     * @param {Object<string, Bid>} bids 
     * @param {Bid} currentBid
     * @param {Bid} winningBid
     */
    constructor(id,
        uid, 
        description = '',
        employee = null,
        hours = 0,
        updateTime = null,
        deleteTime = null,
        maxPrice = 0,
        nextBid = null,
        label = null,
        bids = {},
        currentBid = null,
        winningBid = null){
            
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
            this.maxPrice = maxPrice
            this.nextBid = nextBid
            this.label = label
            this.bids = bids
            this.currentBid = currentBid

            this.updateTime = updateTime
            this.deleteTime = deleteTime
            
            this.winningBid = winningBid
    }

    static fromFirebase(fb){
        let entity = new Contract(fb.id, fb.uid)
        for(var key in fb){
            if(fb.hasOwnProperty(key)){
                if(key == 'bids'){
                    /** Do nothing */
                } else if( key == 'currentBid' ){
                    entity[key] == Bid.fromFirebase(fb[key])
                } else if( key == 'winningBid' ){
                    entity[key] == Bid.fromFirebase(fb[key])
                }else {
                    entity[key] = fb[key]
                }
            }
        }
        return entity
    }

    isPristine(){
        return this.updateTime == null
    }

    /**
     * 
     * @param {Bid} bid 
     */
    pushBid(bid){
        this.currentBid = bid;
        
        return this
    }
}