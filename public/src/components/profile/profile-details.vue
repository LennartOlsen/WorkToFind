<template>
    <b-container fluid v-if="profile">
        <b-row>
            <b-col cols="10">
        <b-card no-body>
        <b-img slot="header"rounded="circle" center v-if="profile.photoURL" :src=profile.photoURL width="100" height="100" blank-color="#777" alt="img" class="m-1" />
        <b-img slot="header"rounded="circle" center v-else  src="http://www.freeiconspng.com/uploads/profile-icon-9.png" width="100" height="100" blank-color="#777" alt="img" class="m-1" />
        <b-list-group flush>
            <b-list-group-item>Name : {{profile.displayName}}</b-list-group-item>
            <b-list-group-item>Profile Type : {{profile.type}}</b-list-group-item>
            <b-list-group-item v-if="profile.state">Current State : {{profile.state}}</b-list-group-item>
        </b-list-group>
        <b-card-body v-if="profile.numberOfRatings">
            <b-row>
                <b-col>Number Of Ratings : {{profile.numberOfRatings}}</b-col>
                <b-col>Total Ratings : {{profile.totalRating}}</b-col>
                <b-col>Average Rating : {{profile.averageRating}}</b-col>
            </b-row>
        </b-card-body>
        <b-card-footer>
            <a v-if="canEdit" @click="toggleEdit"
               class="card-link">Edit</a>
            <a class="card-link" style="color: red">Delete</a>
        </b-card-footer>
    </b-card>
        <b-row v-if="edits">
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
                <b-form-group
                        :state="validProfileType"
                        :feedback="feedbackProfileType" >
                <b-form-radio-group id="btnradios2"
                        buttons
                        button-variant="outline-primary"
                        size="lg"
                        v-model="profile.type"
                        :options="types"
                        name="radioBtnOutline"/>
                </b-form-group>
                <b-button :variant='buttonVariant' :disabled="buttonVariant == 'warning'" @click='submitProfile'>Submit</b-button>
            </form>
        </b-row>
            </b-col>
            <b-col cols="2" class="text-center">
                <h3>Contracts</h3>
                <p>on going</p>
                <li>sample</li>
                <li>sample</li>
                <li>sample</li>
                <br>
                <p>finished</p>
                <li>sample</li>
                <li>sample</li>
                <li>sample</li>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ProfileStore from '../../repositories/profiles'
import * as settings from '../../settings'
import store from '../../repositories/profiles'
import ProfileForm from './profile-form.vue'
import {TYPES} from '../../models/profile'

export default {
    name : 'profile-details-component',
    props : ['id'],
    components : {
        ProfileForm
    },
    data : function() {
        return {
            profile : null,
            edits : false,
            types : TYPES     
        }
    },
    mounted : function(){
        ProfileStore.get(this.id).then( profile => {
            this.profile = profile
        })
    },
    computed : {
        canEdit(){
            return this.profile.uid == settings.getCurrentUser().uid
        },
        validDisplayName() {
            return this.profile.displayName.length > 0 ? 'valid' : 'invalid'
        },
        feedbackDisplayName() {
            return this.profile.displayName.length > 0 ? 'Your name must be at least 1 char' : 'The field seems to be empty'
        },
        validProfileType() {
            return this.profile.type == null ? 'invalid' : 'valid'
        },
        feedbackProfileType() {
            return this.profile.type == null ? 'Select a profile type please' : ''
        },
        buttonVariant() {
            return this.profile.type != null && this.profile.displayName != null ? "success" : "warning"
        }
    }, 
    methods : {
        toggleEdit(){
            this.edits = !this.edits
        },
        submitProfile(){
            ProfileStore.update(this.profile.uid, this.profile).then(error => {
                if(!error){
                    this.$emit("updated", this.profile)
                }
            })
            console.log(this.profile)
            this.edits = !this.edits
        }
    } 
}
</script>

<style scoped>
     div.card-footer > a {
        color: blue;
        cursor: pointer;
    }
</style>
