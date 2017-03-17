import Index from './index.vue';
import Mantenedor from './mantenedor.vue';

module.exports = {
    component: Index,
    subRoutes: {
        '/': {
            component: Mantenedor,
            name: 'mantenedor-reportes'
        }
    }
}