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
									<b-col><span class="boldie">Max Price </span><br/>{{contract.maxPrice}}</b-col>
									<b-col><span class="boldie">Current Bid </span><br/><span v-if="contract.currentBid">{{contract.currentBid.value}}</span></b-col>
									<b-col><span class="boldie">Winner </span><br/>{{contract.winner}}</b-col>
								</b-row>
							</b-col>
							<b-col cols="2">
								<b-row>
									<b-col cols="3">
										<b-button variant="primary" @click="doBid(contract)">Bid</b-button>
										<span class="error" v-show="error[contract.id]" v-if="contract.currentBid">
											Next Bid ({{contract.nextBid}}) must be smaller than ({{contract.currentBid.value}})
										</span>
									</b-col>
									<b-col cols="9">
										<b-form-input id="next_bid" v-model.number="contract.nextBid" type="number"></b-form-input>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</b-list-group-item>
				</b-list-group>
			</b-col>
        </b-row>
    </b-container>
</template>

<script>
import ContractStore from '../../repositories/contracts'
import BidStore from '../../repositories/bids'
import Profiles from '../../repositories/profiles'
import Bid, {STATES} from '../../models/bid'
import Contract from '../../models/contract'
import * as Helpers from '../../helpers'
import * as Settings from '../../settings'

// import * as settings from '../../settings'
export default {
	name : 'contract-list-component',
	data : function() {
        return {
			contractList: null,
			error : [],
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
		let _this = this
		ContractStore.Subscribe( (snap, prevChildKey) => {
			this.updateContract(snap)
		}, null, "child_changed")
	},
	methods : {
		doBid(contract){
			if(contract.currentBid && contract.nextBid >= contract.currentBid.value){
				this.error[contract.id] = true
				return;
			}
			let b = new Bid(
				Helpers.uuidv4(), 
				Settings.getCurrentUser().uid, 
				contract.id,
				STATES.NEW,
				contract.nextBid)

			contract.pushBid(b)

			ContractStore.update(contract.id, contract)
		},
		updateContract(snap){
			if(snap.exists()){ /** Handle deleted or removed contracts */
				let updatedContract = Contract.fromFirebase(snap.val())
				/** Figure out if in list */
				let found = false;
				let c = null;
				for(let index in this.contractList){
					c = this.contractList[index]
					if(c.id == updatedContract.id){
						found = true
						break;
					}
				}
				if(found == false){
					this.contractList.push(updatedContract)
				} else {
					c = updatedContract
				}
			}
		}
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