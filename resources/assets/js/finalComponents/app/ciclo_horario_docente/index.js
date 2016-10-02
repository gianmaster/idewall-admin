import Index from './index.vue';
import List from './list-view.vue';
import EdicionHorario from './horario_docente/index.vue';


module.exports = {
	component: Index,
    subRoutes: {
    	'/': {
    		component: List,
    		name: 'Listar'
    	},
		'/edit/:model_id': {
			component: EdicionHorario,
			name: 'EdicionHorarioDocente'
		}
    }
}
