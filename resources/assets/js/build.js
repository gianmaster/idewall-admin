import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
//import VueFilter from 'vue-filter';
import ExternalComponents from './config/externalComponents';


Vue.config.debug = true;

//global filters
//Vue.use(VueFilter);

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
    component: require('./finalComponents/reusable/notFound.vue'),
  },/*
  '/': {
    component: require('./components2/dashboard.vue')
  },
  '/usuarios': {
    component: require('./finalComponents/app/usuariosView.vue')
  },
  '/menu': {
    component: require('./finalComponents/app/testMantenedorMenu.vue')
  },
  '/sdk': {
    component: require('./finalComponents/app/testVueTable.vue')
  },
  '/paginate': {
    component: require('./finalComponents/app/testPagination.vue')
  },*/
  '/materias': require('./finalComponents/app/materias/index.js'),
  '/menu': require('./finalComponents/app/mantenedor-menu/index.js'),
  '/lockscreen': {
    component: require('./finalComponents/new-layout/lockscreen.vue')
  },
  
});


//bootstrap
const App = Vue.extend(require('./finalComponents/layoutView.vue'));

router.start(App, '#app');

//solo para hacer debug
window.router = router;
