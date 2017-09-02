import App from './App.vue'
import loginBox from './pages/loginBox.vue'
import notFound from './pages/notFound.vue'
import chatRoom from './pages/chatRoom.vue'

export default [
{
    path: '/',
    name: 'home',
    redirect: 'login',
    meta: {
        requiresAuth: true
    }
},
{
    path: '/login',
    name: 'login',
    component: loginBox,
    meta: {
        requiresAuth: false
    }
},
{
    path: '/room',
    name: 'chatRoom',
    component: chatRoom,
    meta: {
        requiresAuth: true
    }
},
{
    path: '*',
    name: 'notFound',
    component: notFound,
    meta: {
        requiresAuth: false
    }
}]
