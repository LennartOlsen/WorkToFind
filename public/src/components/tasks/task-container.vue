<template>
    <h1>Hello Tasks</h1>
</template>

<script>
import * as settings from '../../settings'
export default {
    name : 'tasks-component',
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
