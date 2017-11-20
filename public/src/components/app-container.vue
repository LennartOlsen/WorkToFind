<template>
    <b-container fluid>
        <b-row>
            <b-col>
                some sidebar
            </b-col>
            <b-col cols="10">
                <router-view v-if="profile && !profile.isPristine()">
                </router-view>
                <template v-if="profile && profile.isPristine()">
                    <h2>Please update your profile to carry on</h2>
                    <profile-form-component :profile="profile" 
                                            @updated="updatedProfile">
                    </profile-form-component>
                </template>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ProfileStore from '../repositories/profiles'
import ProfileFormComponent from './profile/profile-form'
export default {
    name : 'app-container-component',
    components : {
        ProfileFormComponent
    },
    props : ['user'],
    data : function() {
        return {
            profile : null,
        }
    },
    mounted : function(){
        let _this = this
        ProfileStore.get(this.user.uid).then( profile => {
            _this.profileCallback(profile)
            _this.profile = profile
        })
    },
    methods : {
        profileCallback(profile){
        },
        updatedProfile(profile){
            this.profile = profile
            this.$set(this.profile, profile)
        }
    }
}
</script>

<style>

</style>
