//@ts-check
import VueRouter from 'vue-router'

import contractContainer from './components/contract/contract-container.vue'
import contractDetailComponent from './components/contract/contract-details.vue'
import contractEditComponent from './components/contract/contract-form.vue'
import contractListComponent from './components/contract/contract-list.vue'
import contractFormComponent from './components/contract/contract-form.vue'
import ratingFormComponent from './components/profile/rating.vue'

const routes = [
    {path : '/contracts/:id', name: 'contract-view', component : contractDetailComponent, props : true},
    {path : '/contracts/:id/edit', component : contractEditComponent, props : true},
    {path : '/contracts', component : contractListComponent, props : true},
    {path : '/new-contract', component : contractFormComponent, props : true},
    {path : '/profile/rating/:uid', component : ratingFormComponent, props : true},
    {path : '*', component : contractContainer}
]

export default new VueRouter({mode:"history", routes})