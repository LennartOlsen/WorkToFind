<template>
    <b-container fluid v-if="contract" v-bind:class="{ updated: isUpdated }">
        <b-row v-if="!edits" class="my-2">
            <b-col>
                <b-card no-body>
                    <b-card-body slot="header">
                    <h4>Contract</h4>
                    {{contract.label}}
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>Description: {{contract.description}}</b-list-group-item>
                        <b-list-group-item>Number of hours: {{contract.hours}}</b-list-group-item>
                        <b-list-group-item>Max price : {{contract.maxPrice}}</b-list-group-item>
                        <b-list-group-item>Current bid : <span v-if="contract.currentBid">{{contract.currentBid.value}}</span></b-list-group-item>
                        <b-list-group-item>Bid By : <span v-if="contract.currentBid && contract.currentBid.profile">{{contract.currentBid.profile.displayName}}</span></b-list-group-item>                    
                    </b-list-group>
                    <b-card-footer>
                        <a v-if="canEdit" @click="toggleEdit"
                        class="card-link" style="cursor:default">Edit</a>
                        <a class="card-link" style="color:red;cursor:default">Delete</a>
                    </b-card-footer>
                </b-card>
            </b-col>
        </b-row>
        
        <b-row v-if="edits" class="my-2">
            <contract-form :contract="contract"></contract-form>
        </b-row>

        <b-row v-if="contract.currentBid" class="current-bid my-2">
            <b-col>
                <b-card title="Current Bid" :subTitle="getSub()">
                <b-row>
                    <b-col>
                        <span>By: </span>
                        <h4 style="display:inline-block">
                            <router-link :to="'/profile/' + contract.currentBid.profile.uid">
                                {{contract.currentBid.profile.displayName}}
                            </router-link>
                        </h4>
                    </b-col>
                    <b-col>
                        <b-button href="#"
                        variant="primary">Select Winning Bid</b-button>
                    </b-col>
                </b-row>
                </b-card>
            </b-col>
        </b-row>

        <b-row class="my-2">
            <b-col>
				<b-list-group v-if="bidList">
					<b-list-group-item v-for="bid in bidList" :key="bid.id">
                        {{bid.value}} - by 
                        <span v-if="bid.profile"> {{bid.profile.displayName}} </span>
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
            isUpdated : false,
            profileName : {}       
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
        },
        getSub(){
            if(this.contract.currentBid.value){
                return 'Value ' + this.contract.currentBid.value
            }
            return 'Not yet placed'
        }
    } 
}
</script>

<style scoped>
    div.container-fluid .current-bid .card {
        background-color: rgba(0,0,0,0);
        -webkit-transition: background-color 200ms;
        -moz-transition: background-color 200ms;
        transition: background-color 200ms;
    }
    div.container-fluid.updated .current-bid .card {
        background-color: rgba(255,0,0,0.2);
        -webkit-transition: background-color 200ms;
        -moz-transition: background-color 200ms;
        transition: background-color 200ms;
    }
</style>
