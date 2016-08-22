import Index from './index.vue';
import List from './list-view.vue';
import Create from './create-view.vue';
import Edit from './edit-view.vue';

module.exports = {
	component: Index,
    subRoutes: {
		'/': {
			component: List,
			name: 'Listar'
		},
		'/create' : {
			name: 'Crear',
			component: Create
		},
		'/edit/:model_id' : {
			name: 'Edición',
			component: Edit
		}
    }
};

