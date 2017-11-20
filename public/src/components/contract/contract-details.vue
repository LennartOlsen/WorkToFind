<template>
    <b-container fluid v-if="contract">
        <b-row>
            <b-col>
                <p>Description:</p>
                <h1>{{contract.description}}</h1>
                <p>Number of hours:</p>
                <h3>{{contract.hours}}</h3>

                <b-button variant="primary" v-if="canEdit">Edit</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ContractStore from '../../repositories/contracts'
import * as settings from '../../settings'
export default {
    name : 'contract-details-component',
    props : ['id'],
    data : function() {
        return {
            contract : null
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
    }  
}
</script>

<style>

</style>
