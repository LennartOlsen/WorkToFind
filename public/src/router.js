import VueRouter from 'vue-router'

import tasksContainer from './components/tasks/task-container.vue'

const routes = [
    {path : '*', component : tasksContainer}
]

export default new VueRouter({mode:"history", routes})