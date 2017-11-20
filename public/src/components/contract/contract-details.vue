<template>
    <b-container fluid v-if="contract">
        <b-row>
            <b-col>
                <h1>{{contract.description}}</h1>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ContractStore from '../../repositories/contracts'
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
    }  
}
</script>

<style>

</style>
