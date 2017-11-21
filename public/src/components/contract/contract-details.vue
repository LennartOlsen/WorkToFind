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
            <b-col>
                <form>
                    <b-form-group
                    id="fieldset1"
                    description="Describe the contract."
                    label="Describe the contract">
                        <b-form-textarea id="textarea1"
                            v-model="contract.description"
                            text="contract.description"
                            :rows="3"
                            :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>
                    <b-form-group
                    id="fieldset2"
                    description="Number of hours to complete contract."
                    label="Number of hours">
                        <b-form-input id="input2" v-model.number="contract.hours" type="number" >{{ contract.hours }}</b-form-input>
                    </b-form-group>
                
                    <b-button variant="primary"  @click='submitContract'>Submit</b-button>
                </form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ContractStore from '../../repositories/contracts'
import * as settings from '../../settings'
import store from '../../repositories/contracts'
export default {
    name : 'contract-details-component',
    props : ['id'],
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
