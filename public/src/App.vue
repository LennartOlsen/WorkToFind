<template>
  <div id="app">
    <h1>{{ msg }}</h1>
      <login-component v-if="!loggedIn"></login-component>
  		<router-view></router-view>
  </div>
</template>

<script>
import loginComponent from './components/login'
import * as settings from './settings'

export default {
	name: 'app',
	components : {
		loginComponent
	},
	data () {
		return {
		msg: 'Walecume to Work To Find',
		loggedIn : false,
		}
	},
	mounted() {
		let _this = this
		settings.getFirebase().auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log("User", user)
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
  text-align: center;
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
