/**
 * Esto se lo debe hacer luego de tener cargada la instancia de vue-resource
 */

 import Vuetable from 'vuetable/src/components/Vuetable.vue';
 import VuetablePagination from 'vuetable/src/components/VuetablePagination.vue';
 import VuetablePaginationDropdown  from 'vuetable/src/components/VuetablePaginationDropdown.vue';
 import VuetablePaginationBootstrap from 'vuetable/src/components/VuetablePaginationBootstrap.vue';

 module.exports = function(Vue){
 	Vue.component('vuetable', Vuetable);
 	Vue.component('vuetable-pagination', VuetablePagination)
 	Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown)
 	Vue.component('vuetable-pagination-bootstrap', VuetablePaginationBootstrap)
 }

