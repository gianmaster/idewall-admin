import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
//import VueFilter from 'vue-filter';
import ExternalComponents from './config/externalComponents';

//directivas para hacer drag and drop
import VueDragableFor from 'vuedragablefor';
Vue.use(VueDragableFor);

Vue.config.debug = true;

//global filters
//Vue.use(VueFilter);

import moment from 'moment';
window.moment = moment;

// install router
Vue.use(VueResource);
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#csrf_token').getAttribute('value');

ExternalComponents(Vue);

// install router
Vue.use(VueRouter);

//external components
//const progress = require('vue-progressbar');
//Vue.use(progress);

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
  },
  '/': {
    component: require('./finalComponents/app/dashboard/index.vue'),
  },
  /*
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


  '/usuarios': require('./finalComponents/app/usuarios/index.js'),

  '/materias': require('./finalComponents/app/materias/index.js'),

  '/malla_academica': require('./finalComponents/app/malla_academica/index.js'),

  '/docentes': require('./finalComponents/app/docentes/index.js'),

  '/materias_docentes': require('./finalComponents/app/materias_docentes/index.js'),

  '/menu': require('./finalComponents/app/mantenedor-menu/index.js'),

  '/catalogos': require('./finalComponents/app/catalogos/index.js'),

  '/catalogos/:catalogo_id': require('./finalComponents/app/catalogoItems/index.js'),

  '/jornadasemestres': require('./finalComponents/app/jornadas_semestres/index.js'),

  '/lockscreen': {
    component: require('./finalComponents/new-layout/lockscreen.vue')
  }
});


//bootstrap
const App = Vue.extend(require('./finalComponents/layoutView.vue'));

router.start(App, '#app');

//solo para hacer debug
window.router = router;
