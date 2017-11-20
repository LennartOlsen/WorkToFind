//@ts-check
import VueRouter from 'vue-router'

import contractContainer from './components/contract/contract-container.vue'
import contractDetailComponent from './components/contract/contract-details.vue'

const routes = [
    {path : '/contracts/:id', component : contractDetailComponent, props : true},
    {path : '*', component : contractContainer}
]

export default new VueRouter({mode:"history", routes})