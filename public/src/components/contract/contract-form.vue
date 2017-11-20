<template>
    <b-container fluid v-if="model">
        <b-row>
            <b-col>
                <form>
                    <b-form-group
                    id="fieldset1"
                    description="Describe the contract."
                    label="Describe the contract">
                        <b-form-textarea id="textarea1"
                            v-model="model.description"
                            placeholder="Describe the contract here..."
                            :rows="3"
                            :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>
                    <b-form-group
                    id="fieldset2"
                    description="Number of hours to complete contract."
                    label="Number of hours">
                        <b-form-input id="input2" v-model.number="model.hours" type="number" ></b-form-input>
                    </b-form-group>
                
                    <b-button @click='submitContract'>Submit</b-button>
                </form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Contract from '../../models/contract'
import * as helpers from '../../helpers'
import * as settings from '../../settings'
import store from '../../repositories/contracts'

export default {
    name: 'contract-form',
    props: ["contract"],
    data : function() {
        return {
            model : null
        }
    },
    mounted: function(){
        if( this.contract){
            this.model = this.contract
        } else {
            this.model = new Contract(helpers.uuidv4(), settings.getCurrentUser().uid)
        }
    },
    methods: {
        submitContract(){
            store.update(this.model.id, this.model).then(error => {
                if(error){
                    console.log(error)
                } else {
                    console.log("Contract updated/created")
                }
            })

            console.log("hej", this.model)
        }
    }
}
</script>

<style>

</style>
