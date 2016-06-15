import Vue from 'vue';
import Resource from 'vue-resource';
import Router from 'vue-router';

Vue.use(Router);
let App = Vue.extend({});

//load my components
//import App from './components/layouts/Layout.vue';
import Layout from './components/layouts/Layout.vue';
Vue.component('pincheApp', Layout);

//router instant
let router = new Router();
//content views
import HomeView from './components/app_logic/HelloView.vue';
//config routes
router.map({
	'/home':{
		component: HomeView,
		name: "home"
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

