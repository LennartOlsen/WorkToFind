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
				console.log("User", user)
				_this.user = user
				_this.loggedIn = true
			} else {
				console.log("No user")
			}
		});
	},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
