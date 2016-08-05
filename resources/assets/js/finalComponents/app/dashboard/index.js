import Index from './index.vue';
import View from './view.vue';

module.exports = {
    component: Index,
    subRoutes: {
        '/': {
            component: View,
            name: 'Mostrar'
        }
    }
}