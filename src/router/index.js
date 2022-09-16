import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    redirect: '/steganography/encode',
  },
  {
    path: '/steganography',
    name: 'steganography',
    component: () => import('@/views/home/Home.vue'),
    children: [
      {
        path: 'encode',
        name: 'encode',
        component: () => import('@/views/encode/index.vue'),
      },
      {
        path: 'decode',
        name: 'decode',
        component: () => import('@/views/decode/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
