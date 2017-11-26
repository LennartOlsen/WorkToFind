<template>
    <b-container fluid>
        <b-row>
            <b-col>
            	<li class="contracts-list" v-for="contract in contractList" :key="contract.id">
					<div class="item-content">
						<div class="item-divider">{{contract.description}}</div>
						<div class="item-text-wrap">
							<b-row>
								<b-col align-h="start" cols="11">
									<ul>
										<router-link :to="{ name: 'contract-view', params: {id: contract.id } }">
											<li>UID: {{contract.uid}}</li>
											<li>Hours: {{contract.hours}}</li>
											<li>Employee: {{profileName[contract.uid]}}</li>
										</router-link>
									</ul>
								</b-col>
								<b-col  cols="1">
									<button>Bid</button>
								</b-col>
							</b-row>
						</div>
					</div>
				</li>
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

<style>
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
</style>