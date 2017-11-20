<template>
    <b-container fluid>
        <b-row>
            <form>
            
                <b-form-group
                    id="fieldset1"
                    description="Let us know your name."
                    label="Enter your name"
                    :feedback="feedbackDisplayName"
                    valid-feedback="Thank you"
                    :state="validDisplayName">
                    <b-form-input id="input1" :state="validDisplayName" v-model.trim="profile.displayName"></b-form-input>
                </b-form-group>
                <b-form-radio-group id="btnradios2"
                        buttons
                        button-variant="outline-primary"
                        size="lg"
                        v-model="profile.type"
                        :options="types"
                        name="radioBtnOutline" />
                <b-button variant="success" @click='submitProfile'>Submit</b-button>
            </form>
        </b-row>
    </b-container>
</template>

<script>
import {TYPES} from '../../models/profile'
import ProfileStore from '../../repositories/profiles'
export default {
    name : 'profile-form-component',
    props : ['profile'],
    data : function() {
        return {
            types : TYPES
        }
    },
    computed : {
        validDisplayName() {
            return this.profile.displayName.length > 0 ? 'valid' : 'invalid'
        },
        feedbackDisplayName() {
            return this.profile.displayName.length > 0 ? 'Your name must be at least 1 char' : 'The field seems to be empty'
        }
    },
    methods : {
        submitProfile(){
            ProfileStore.update(this.profile.uid, this.profile).then(error => {
                if(!error){
                    this.$emit("updated", this.profile)
                }
            })
            console.log(this.profile)
        }
    }
}
</script>