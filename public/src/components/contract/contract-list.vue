<template>
    <b-container fluid>
        <b-row>
            <b-col>
				<b-list-group>
					<b-list-group-item v-for="contract in contractList" :key="contract.id">
							<b-row>
								<b-col cols="12">
									<router-link :to="'/contracts/' + contract.id">
										<h3 style="display:inline-block;">{{contract.description}}</h3> <span>by {{profileName[contract.uid]}}</span>
									</router-link>
								</b-col>
								<b-col cols="10">
									<b-row>
										<b-col><span class="boldie">Hours </span><br/>{{contract.hours}}</b-col>
										<b-col><span class="boldie">Date </span><br/>{{contract.date}}</b-col>
										<b-col><span class="boldie">Max Price </span><br/>{{contract.max_price}}</b-col>
									</b-row>
								</b-col>
								<b-col cols="2">
									<b-button variant="primary">Bid</b-button><b-form-input id="date_input" v-model.number="contract.nextbid" type="number"></b-form-input>
								</b-col>
							</b-row>
						</div>
					</b-list-group-item>
				</b-list-group>
			</b-col>
        </b-row>
    </b-container>
</template>

<script>
import ContractStore from '../../repositories/contracts'
import Profiles from '../../repositories/profiles'

// import * as settings from '../../settings'
export default {
	name : 'contract-list-component',
	data : function() {
        return {
			contractList: null,
			profileName: {}
        }
	},
	mounted : function() {
		ContractStore.get(null).then( contractList => {
			this.contractList = contractList;

			this.contractList.forEach(contract => {
				Profiles.get(contract.uid).then( profile => {
					this.$set(this.profileName, contract.uid ,profile.displayName);
				});
			});
		})
	}
}
</script>

<style scoped>
	.contracts-list{
		list-style: none;
		padding: 1em;
		border-bottom: solid 1px #ccc;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-transition: all 1s;
		transition: all 1s;
	}
	.item-avatar .item-content .item-text-wrap {
		font-size: 14px;
		line-height: 1.3;
	}
	a {
		color: #2c3e4f;
		font : outline;
	}
	a:hover { 
    	color: black;
	}
	.boldie {
		font-weight: 800;
	}
</style>