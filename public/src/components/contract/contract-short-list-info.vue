<template>
    <b-list-group>
        <b-list-group-item v-for="contract in contractList" :key="contract.id">
            <b-row>
                {{contract.label}} - <b> Bid </b> : 
            </b-row>
        </b-list-group-item>
    </b-list-group>
</template>
  
<script>
import ContractStore from '../../repositories/contracts'
import store from '../../repositories/contracts'

export default {
    name: 'contract-short-info-component',
    props : ['id'],
    component : {

    },
    data : function() {
        return {
            contractList : []
        }
    },
    mounted : function() {
        if(this.id) {
            // console.log("Not for you")
            // console.log(this.id)
        }
        ContractStore.getByUID(this.id).then ( contractList => {
            this.contractList = contractList;
            console.log(this.contractList)
        })
        // ContractStore.get(null).then( contractList => {
        //     this.contractList = contractList;
        //     console.log(contract)
        // });
    }
  
}
</script>

<style>

</style>
