<template>
    <b-container fluid>
        <b-row>
            <b-col>
<<<<<<< HEAD
            	<ul class="todo-list">
					<li v-for="contract in contracts" :key="contract.id">
						<h1>{{contract.description}}</h1>
					</li>
				</ul>
=======
				<b-list-group>
					<b-list-group-item id="contracts-list" v-for="contract in contractList" :key="contract.id">
						<b-row>
							<b-card no-body style="width: 100%;">
        					<h4 slot="header">
								<router-link :to="'/contracts/' + contract.id">{{contract.label}}</router-link><br>
								<router-link :to="'/profile/'+ contract.uid" style="font-size:15px;color:grey"> {{profileName[contract.uid]}}</router-link>
							</h4>
							<b-card-body>
							 {{contract.description}}
							</b-card-body>
							<b-card-body>
								<b-row>
									<b-col><span class="boldie">Hours </span><br/>{{contract.hours}}</b-col>
									<b-col><span class="boldie">Date </span><br/>{{contract.date}}</b-col>
									<b-col><span class="boldie">Max Price </span><br/>{{contract.maxPrice}}</b-col>
									<b-col><span class="boldie">Current Bid </span><br/><span v-if="contract.currentBid">{{contract.currentBid.value}}</span></b-col>
									<b-col><span class="boldie">Winner </span><br/><span v-if="contract.currentBid && contract.currentBid.profile">{{contract.currentBid.profile.displayName}}</span></b-col>
								</b-row>
							</b-card-body>
							<div slot="footer">
								<b-row>
									<b-col cols="5" offset-md="4">
										<b-form-input id="next_bid" v-model.number="contract.nextBid" type="number"></b-form-input>
									</b-col>
									<b-col cols="2">
										<b-button variant="primary" @click="doBid(contract)">Bid</b-button>
										<b-button variant="secondary" :to="'/contracts/' + contract.id" style="color:white;cursor:default">View</b-button>
									</b-col>
								</b-row>
								<b-alert style="margin-top:10px"
									variant="danger" dismissible :show="error[contract.id]" 
									@dismissed="error[contract.id]=false">
										Next Bid ({{contract.nextBid}}) must be smaller than ({{contract.currentBid.value}})
								</b-alert>	
							</div>
							</b-card>
						</b-row>
					</b-list-group-item>
				</b-list-group>
>>>>>>> 8ab30d2cc8af76ca6448324ead65723d680ba8d0
			</b-col>
        </b-row>
    </b-container>
</template>

<script>
<<<<<<< HEAD
import ContractStore from "../../repositories/contracts"
=======
import ContractStore from '../../repositories/contracts'
import BidStore from '../../repositories/bids'
import Profiles from '../../repositories/profiles'
import Bid, {STATES} from '../../models/bid'
import Contract from '../../models/contract'
import * as Helpers from '../../helpers'
import * as Settings from '../../settings'

// import * as settings from '../../settings'
>>>>>>> 8ab30d2cc8af76ca6448324ead65723d680ba8d0
export default {
	name : 'contract-list-component',
	data : function() {
        return {
<<<<<<< HEAD
			contracts : null
        }
	},
	mounted : function() {
		console.log("i am here")
		ContractStore.get().then(contracts=>{
			console.log(contracts)
			this.contracts = contracts
		})
=======
			contractList: null,
			error : [],
			profileName: {},
			profile : null,
			showDismissibleAlert: []
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
		Profiles.get(Settings.getCurrentUser().uid).then( profile => {
			this.profile = profile
		})
	},
	methods : {
		doBid(contract){
			if(contract.currentBid && contract.nextBid >= contract.currentBid.value){
				this.$set(this.error ,contract.id , true)
				return;
			}
			let b = new Bid(
				Helpers.uuidv4(), 
				Settings.getCurrentUser().uid, 
				contract.id,
				STATES.NEW,
				contract.nextBid,
				null,
				null,
				this.profile)

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
>>>>>>> 8ab30d2cc8af76ca6448324ead65723d680ba8d0
	}
}
</script>

<style scoped>
	#contracts-list{
		border: 0px
	}
</style>