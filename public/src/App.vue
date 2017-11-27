<template>
  <div id="app" v-show="ready">
		<login-component v-if="!loggedIn"></login-component>
		<app-container-component v-if="loggedIn" :user="user">

		</app-container-component>
  </div>
</template>

<script>
import loginComponent from './components/login'
import appContainerComponent from './components/app-container'
import * as settings from './settings'

export default {
	name: 'app',
	components : {
		loginComponent,
		appContainerComponent
	},
	data () {
		return {
			msg: 'Walecume to Work To Find',
			loggedIn : false,
			ready : false,
			user : null
		}
	},
	mounted() {
		let _this = this
		settings.getFirebase().auth().onAuthStateChanged(function(user) {
			_this.ready = true
			if (user) {
				_this.user = user
				_this.loggedIn = true
			} else {
				console.log("No user")
			}
		});
	},
}
</script>
