import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// install router
Vue.use(VueResource);
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#csrf_token').getAttribute('value');

// install router
Vue.use(VueRouter);

// routing
/*
const router = new VueRouter({
  history: true, 
  saveScrollPosition: true
})
*/
const router = new VueRouter();

router.map({
  '*' : {
    component: require('./finalComponents/reusable/notFound.vue')
  },
  '/': {
    component: require('./components2/dashboard.vue')
  },
  '/usuarios': {
    component: require('./finalComponents/app/usuariosView.vue')
  },
  '/user/new': {
    component: require('./components2/users/new.vue')
  }
});


//bootstrap
const App = Vue.extend(require('./finalComponents/layoutView.vue'));

router.start(App, '#app');

//solo para hacer debug
window.router = router;
