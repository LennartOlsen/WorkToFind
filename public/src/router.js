import VueRouter from 'vue-router'

import tasksComponent from './components/tasks.vue'

const routes = [
    {path : "/tasks", component : tasksComponent},
    {path : '*', component : tasksComponent}
]

export default new VueRouter({mode:"history", routes})