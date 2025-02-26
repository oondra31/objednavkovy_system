import { createRouter, createWebHistory } from 'vue-router';
import Orders from '../pages/Orders.vue';
import Colleagues from '../pages/Colleagues.vue';
import NewOrder from '../pages/NewOrder.vue';   // Komponenta pro novou objednávku

const routes = [
  { path: '/', component: Orders },
  { path: '/colleagues', component: Colleagues },
  { path: '/order/new', component: NewOrder },        // Nová objednávka bez parametru
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
