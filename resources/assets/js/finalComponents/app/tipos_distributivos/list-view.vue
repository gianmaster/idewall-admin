<template>
	
	<div v-if="loading">
		<app-loading></app-loading>
	</div>

	<div v-else>
		<cool-table 
		:option-toolbar="toolbar"
		:url="url" 
		:data.sync="datos" 
		:columns="columnas" 
		filter-key-word="search">
		</cool-table>

		<!-- Modal para la creacion y/o edicion del tipo de distributivo -->
		<app-modal :title="getModalTitle" :show.sync="showModal" @ok="toggleModal" @cancel="toggleModal" emit-when-ok="dispatch-ok-modal" :large="true">

			<div class="row">
				<form action="" @submit.prevent="submitForm">

					<form-fields :data-model.sync="currentModel" :create-mode="createMode"></form-fields>

				</form>
			</div>

		</app-modal>


		<!-- Modal para la creacion y/o edicion del tipo de distributivo -->
		<app-modal :title="'Tipo Distributivo - '+currentModel.nombre+' - Items'" :show.sync="showModalItems" @ok="showModalItems=false" @cancel="showModalItems=false" emit-when-ok="dispatch-ok-modal" :large="true">

			<div class="row">

				<items-distributivo :current-distributivo.sync="currentModel" ></items-distributivo>

			</div>

		</app-modal>

	</div>

</template>


<style>

	.__materia{
		color: #656464;
	}

</style>

<script>

	import Loading from '../../reusable/loading.vue';

	import Modal from '../../reusable/modal.vue';
	
	import coolTable from '../../reusable/cool-table.vue';

	import myMixins from './mixins';

	import formFields from './form-fields.vue';

	import ItemsDistributivo from './distributivo_items/create-edit-item-view.vue';

	import {urlTiposDistri} from '../config';

	export default {
		mixins: [myMixins],
		route: {
			data: function(transition){
				this.load();
				transition.next();
			}
		},
		computed: {
			getModalTitle: function(){
				return this.createMode ? 'Crear Tipo Distributivo' : 'Modificar Tipo Distributivo'
			},
			getTitleDistributivo: function(){
				if(this.currentModel){
					return '';
				}else{
					return `Tipo Distributivo ${this.currentModel.nombre} - Items`;
				}
			}
		},
		name: 'TiposAtributosGrid',
		data(){
			return {
				url: urlTiposDistri,
				toolbar: {
					iconClass: 'fa fa-plus',
					iconClassOptions: 'fa fa-cogs',
					label: 'Agregar',
					labelOptions: 'Campos visibles',
					nameEmit: 'distributivo-create-event',
					btnClass: 'btn btn-primary btn-flat'
				},
				datos: [],
				columnas: [
					{
						title: 'ID',
						field: 'id',
						hidden: false,
						sortable: true
					},
					{
						title: 'Tipo Distributivo',
						field: 'nombre',
						hidden: false,
						sortable: true
					},
					{
						title: 'Orden',
						field: 'orden',
						hidden: false,
						sortable: true
					},
					{
						title: 'Registros',
						field: 'items',
						hidden: false,
						sortable: true,
						template: '<span class="badge">${col.items.length}</span>'
					},
					{
						title: 'Activo',
						field: 'activo',
						hidden: false,
						sortable: true,
						template: '${col.activo == 1 ? "<input type=checkbox checked disabled/>" : "<input type=checkbox disabled/>"}'
					},
					{
						title: 'Acciones',
						titleClass: 'text-center',
						hidden: false,
						fieldClass: 'text-center',
						itemActions: [
							{
								nameEmit: 'distributivo-view-event',
								btnClass: 'btn bg-gray btn-xs',
								iconClass: 'fa fa-list-ol',
								label: 'Visualizar Items'
							},
							{
								nameEmit: 'distributivo-update-event',
								btnClass: 'btn btn-default btn-xs',
								iconClass: 'fa fa-edit',
								label: 'Editar'
							},
							{
								nameEmit: 'distributivo-delete-event',
								btnClass: 'btn btn-danger btn-xs',
								iconClass: 'fa fa-trash',
								label: 'Eliminar'
							}
						]
					}
				],
				loading: false,
				loading_button: false,
				currentModel: {},
				showModal: false,
				showModalItems: false,
				createMode: true
			}
		},
		components: {
			'cool-table' : coolTable,
			'app-loading' : Loading,
			'app-modal' : Modal,
			'formFields' : formFields,
			'itemsDistributivo': ItemsDistributivo
		},
		events: {
			'distributivo-create-event' : function(model){
				this.createMode = true;
				this.toggleDataModel(model);
				this.toggleModal();
			},
			'distributivo-update-event' : function(model){
				this.createMode = false;
				this.toggleDataModel(model);
				this.toggleModal();
			},
			'distributivo-delete-event' : function(model){
				this.destroy(model);
			},
			'distributivo-view-event': function(model){
				this.createMode = false;
				this.toggleDataModel(model);
				this.showModalItems = true;
			},
			'dispatch-ok-modal' : function(){
				null;
			}
		}
		
	}

</script>

