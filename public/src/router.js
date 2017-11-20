import VueRouter from 'vue-router'

import contractContainer from './components/contract/contract-container.vue'

const routes = [
    {path : '*', component : contractContainer}
]

export default new VueRouter({mode:"history", routes})