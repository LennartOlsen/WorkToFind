<template>
    <b-container fluid>
        <h1>Hello Contracts</h1>
        <contract-form-component>
        </contract-form-component>
        <contract-list-componet>
        </contract-list-componet>
    </b-container>
</template>

<script>
import * as settings from '../../settings'
import contractFormComponent from './contract-form'
import contractListComponet from './contract-list'
export default {
    name : 'contracts-component',
    data : function(){
        return {
            profile:null
        }
    },
    monuted : function() {
        console.log(settings.getCurrentUser())
    },
    components: {
        contractFormComponent,
        contractListComponet
    }
}
</script>

<style>

</style>
