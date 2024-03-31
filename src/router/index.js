import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '../views/Registration/View.vue'
import RegistrationCreate from '../views/Registration/Create.vue'
import StudentView from '../views/Student/View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/registration/create',
      name: 'registrationCreate',
      component: RegistrationCreate
    },
    {
      path: '/students',
      name: 'students',
      component: StudentView
    }
  ]
})

export default router
