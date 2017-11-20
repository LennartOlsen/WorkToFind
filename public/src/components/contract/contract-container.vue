<template>
    <b-container fluid>
        <h1>Hello Contracts</h1>
        <contract-form-component>
        </contract-form-component>
    </b-container>
</template>

<script>
import * as settings from '../../settings'
import contractFormComponent from './contract-form'
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
        contractFormComponent
    }
}
</script>

<style>

</style>
