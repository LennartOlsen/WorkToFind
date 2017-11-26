<template>
    <b-container fluid>
        <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#">NavBar</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
                <em>User</em>
                </template>
                <b-dropdown-item>Profile</b-dropdown-item>
                <b-dropdown-item v-on:click="logout()">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
        </b-navbar>
        <b-row>
            <b-col cols="2">
                <li><h4>some sidebar</h4></li>
                <li><router-link to="/contracts">List of contracts</router-link></li>
                <li><router-link to="/new-contract">Add contract</router-link></li>
            </b-col>
            <b-col cols="9">
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
import * as settings from './../settings'
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
            console.log("Got Profile ", profile)
            if(profile == null){
                ProfileStore.watchOnce(_this.user.uid).then(profile => {
                    console.log("watchOnce Profile ", profile)
                    _this.profile = profile
                })
            }
            _this.profile = profile
        })
    },
    methods : {
        profileCallback(profile){
        },
        updatedProfile(profile){
            this.profile = profile
            this.$set(this.profile, profile)
        },
        logout() {
            settings.logOut()
            window.location.replace('/')
        }
    }
}
</script>

<style>

</style>
