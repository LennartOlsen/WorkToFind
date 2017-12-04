<template>
    <b-container fluid>
        <b-row v-if="profile && profile.type == 'CONTRACTOR'">
            <b-col>
                <h3>My Contracts</h3>
                <b-list-group >
                    <b-list-group-item v-for="contract in contractList" :key="contract.id">
                        <router-link :to="'/contracts/' + contract.id">{{contract.label}}</router-link>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
        <b-row v-if="profile && profile.type == 'EMPLOYEE'">
            <b-col>
                <h3>Bid list</h3>
                <b-list-group >
                    <b-list-group-item v-for="bid in bidList" :key="bid.id">
                        <p>Bid value: {{ bid.value }} <img src="../../assets/check.png" v-if="bid.state == 'winning'"/></p>
                    </b-list-group-item> 
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>
  
<script>
import ContractStore from '../../repositories/contracts'
import ProfileBidsStore from '../../repositories/profile-bids'
import store from '../../repositories/contracts'
import Profiles from '../../repositories/profiles'
import * as Settings from '../../settings'
import BidsStore from '../../repositories/bids'

export default {
    name: 'contract-short-info-component',
    props : ['id'],
    component : {

    },
    data : function() {
        return {
            contractList : [],
            bidList : [],
            profile : null
        }
    },
    mounted : function() {
        Profiles.get(Settings.getCurrentUser().uid).then( profile => {
			this.profile = profile
		})
        if(this.id) {
            // console.log("Not for you")
            // console.log(this.id)
        }
        ContractStore.getByUID(this.id).then ( contractList => {
            this.contractList = contractList;
            console.log(this.contractList)
        })
        
        ProfileBidsStore.get(Settings.getCurrentUser().uid).then(idList => {
            if(idList.bids){
                for(let id in idList.bids){
                    this.fetchBid(id)
                }
            } else {
                this.error = "No bids found for contract"
            }
        })
    },
    methods: {
        fetchBid(id){
            BidsStore.get(id).then(bid => {
                this.bidList.unshift(bid)
            })
        },
        getContractByBid(bid){
            ContractStore.get(bid.contractId).then( contract => {
                console.log(contract)
                return
            })
        },
        test(bid){
            ContractStore.get(bid.contractId).then( contract => {
                this.contractList[contract.id] = contract
            })
            return "TEST"
        }
    }
  
}
</script>

<style>

</style>
