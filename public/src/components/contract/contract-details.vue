<template>
    <b-container fluid v-if="contract" v-bind:class="{ updated: isUpdated }">
        <b-row v-if="!edits">
            <b-col>
                <p>Description:</p>
                <h1>{{contract.description}}</h1>
                <p>Number of hours:</p>
                <h3>{{contract.hours}}</h3>
                <b-button variant="primary" v-if="canEdit" @click="toggleEdit">Edit</b-button>
            </b-col>
        </b-row>
        
        <b-row v-if="edits">
            <contract-form :contract="contract"></contract-form>
        </b-row>

        <b-row v-if="contract.currentBid">
            <b-col>
				<h3>Current Bid</h3>
                {{contract.currentBid.value}}
                <span v-if="contract.currentBid && contract.currentBid.profile"> {{contract.currentBid.profile.displayName}} </span>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
				<b-list-group v-if="bidList">
					<b-list-group-item v-for="bid in bidList" :key="bid.id">
                        {{bid.value}} - by
                        <span v-if="contract.currentBid && contract.currentBid.profile"> {{contract.currentBid.profile.displayName}} </span>
					</b-list-group-item>
				</b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ContractStore from '../../repositories/contracts'
import * as settings from '../../settings'
import store from '../../repositories/contracts'
import ContractForm from './contract-form.vue'
import Bid from '../../models/bid'

export default {
    name : 'contract-details-component',
    props : ['id'],
    components : {
        ContractForm
    },
    data : function() {
        return {
            contract : null,
            edits : false,
            bidList : [],
            isUpdated : false
        }
    },
    mounted : function(){
        if(!this.id){
            console.error("You not welcome here")
        }
        ContractStore.get(this.id).then( contract => {
            this.contract = contract
            this.bidList = contract.bids
        })
		ContractStore.Subscribe( (snap, prevChildKey) => {
			this.updateContract(snap)
		}, this.id, "child_changed")
    },
    computed : {
        canEdit(){
            return this.contract.uid == settings.getCurrentUser().uid
        }
    }, 
    methods : {
        toggleEdit(){
            this.edits = !this.edits
        },
        submitContract(){
            store.update(this.contract.id, this.contract).then(error => {
                if(error){
                    console.log(error)
                } else {
                    console.log("Contract updated/created")
                    this.edits = !this.edits
                }
            })
        },
        updateContract(snap){
            console.log(snap.key)
            console.log(this.bidList)
            if(snap.key == "currentBid"){
                let b = Bid.fromFirebase(snap.val())
                
                this.bidList[b.id] = b

                this.contract.currentBid = b

                this.isUpdated = true
                let _this = this
                setTimeout(function(){
                    _this.isUpdated = false;
                }, 2000);
            }
        }
    } 
}
</script>

<style scoped>
    div.container-fluid {
        background-color: rgba(0,0,0,0);
        -webkit-transition: background-color 200ms;
        -moz-transition: background-color 200ms;
        transition: background-color 200ms;
    }
    div.container-fluid.updated {
        background-color: rgba(255,0,0,0.2);
        -webkit-transition: background-color 200ms;
        -moz-transition: background-color 200ms;
        transition: background-color 200ms;
    }
</style>
