import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CatalogView },         

  ]
})

export default router