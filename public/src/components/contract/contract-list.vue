<template>
    <b-container fluid>
        <b-row>
            <b-col>
            	<ul class="todo-list">
					<li v-for="contract in contracts" :key="contract.id">
						<h1>{{contract.description}}</h1>
					</li>
				</ul>
			</b-col>
        </b-row>
    </b-container>
</template>

<script>
import ContractStore from "../../repositories/contracts"
export default {
	name : 'contracts-list',
	data : function() {
        return {
			contracts : null
        }
	},
	mounted : function() {
		console.log("i am here")
		ContractStore.get().then(contracts=>{
			console.log(contracts)
			this.contracts = contracts
		})
	}
}
</script>

<style>

</style>
