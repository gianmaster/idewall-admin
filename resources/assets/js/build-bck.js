import Vue from 'vue';
import Resource from 'vue-resource';
import Router from 'vue-router';

//Aditional componentes - no necesary VUE, but no use Jquery

Vue.use(Router);
Vue.use(Resource);

Vue.transition('bounce', {
        enterClass: 'bounceInLeft',
        leaveClass: 'bounceOutRight'
    });

    Vue.transition('flip', {
        enterClass: 'flipInX',
        leaveClass: 'flipOutX'
    });

    Vue.transition('lightSpeed', {
        enterClass: 'lightSpeedIn',
        leaveClass: 'lightSpeedOut'
    });

    Vue.transition('fade', {
        enterClass: 'fadeIn',
        leaveClass: 'fadeOut'
    });

    Vue.transition('slide', {
        enterClass: 'slideInUp',
        leaveClass: 'slideOutUp'
    });

    Vue.transition('zoom', {
        enterClass: 'zoomIn',
        leaveClass: 'zoomOut'
    });

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

