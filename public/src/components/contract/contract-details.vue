<template>
    <b-container fluid v-if="contract" >
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
    </b-container>
</template>

<script>
import ContractStore from '../../repositories/contracts'
import * as settings from '../../settings'
import store from '../../repositories/contracts'
import ContractForm from './contract-form.vue'

export default {
    name : 'contract-details-component',
    props : ['id'],
    components : {
        ContractForm
    },
    data : function() {
        return {
            contract : null,
            edits : false
        }
    },
    mounted : function(){
        if(!this.id){
            console.error("You not welcome here")
        }
        ContractStore.get(this.id).then( contract => {
            this.contract = contract
        })
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
        }
    } 
}
</script>

<style>

</style>
