<template>
    <h1>Hello Contracts</h1>
</template>

<script>
import * as settings from '../../settings'
export default {
    name : 'contracts-component',
    data : {
        profile : null
    },
    monuted : function() {
        console.log(settings.getCurrentUser())
    }
}
</script>

<style>

</style>
