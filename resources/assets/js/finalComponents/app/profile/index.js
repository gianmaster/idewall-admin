import Index from './index.vue';
import Edit from './edit-view.vue';

module.exports = {
    component: Index,
    subRoutes: {
        '/' : {
            name: 'Edición',
            component: Edit
        }
    }
};