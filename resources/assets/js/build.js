import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueFilter from 'vue-filter';
import ExternalComponents from './config/externalComponents';

//global filters
Vue.use(VueFilter);

// install router
Vue.use(VueResource);
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#csrf_token').getAttribute('value');

ExternalComponents(Vue);

// install router
Vue.use(VueRouter);

//external components
const progress = require('vue-progressbar');
Vue.use(progress);

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
    component: require('./finalComponents/layout/notfound.vue')
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
