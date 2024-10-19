import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'registrationList',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/studentRegistration',
    name: 'studentRegistration',
    component: () => import('@/views/StudentRegistration.vue'),  // Novo nome do arquivo
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

