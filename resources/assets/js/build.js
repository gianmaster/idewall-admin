import Vue from 'vue';
import Resource from 'vue-resource';
import Router from 'vue-router';

import transitions from './components/transitions';

//Aditional componentes - no necesary VUE, but no use Jquery

Vue.use(Router);
Vue.use(Resource);

transitions(Vue);

let App = Vue.extend({});

Vue.http.options.root = '/api';
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#csrf_token').getAttribute('value');


//load my components
//import App from './components/layouts/Layout.vue';
import Layout from './components/layouts/LayoutNew.vue';
Vue.component('pincheApp', Layout);


//router instant
let router = new Router();
//content views
import HomeView from './components/app_logic/HelloView.vue';
import NotFoundView from './components/layouts/errors/404.vue';
import UsersView from './components/app_logic/Users/list.vue';
//config routes
router.map({
	'/':{
		component: UsersView,
		name: "home",
	},
	'other':{
		component: HomeView,
		name: "otro"
	},
	'profile':{
		component: NotFoundView,
		name: 'profile',
		subRoutes: {
			'/edit' : {
				component: NotFoundView,
				name: 'custom1',	
			},
			'/create' : {
				component: NotFoundView,
				name: 'custom2',	
			},

		}
	}
	
});

/*
new Vue({
	el: "#thefuckingapp",
	components: {
		pincheApp: App
	}
});
*/

router.start(App, '#thefuckingapp');

