import Index from './index.vue';
import List from './list-view.vue';

module.exports = {
	component: Index,
	subRoutes: {
		'/': {
			component: List,
			name: 'Listar'
		}
	}
};

