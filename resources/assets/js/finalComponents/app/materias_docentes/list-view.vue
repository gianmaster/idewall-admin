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

	<!-- Modal logic -->

	<app-modal title="Asignación de Materias" :show.sync="showModal" @ok="toggleModal" @cancel="toggleModal" emit-when-ok="event-end-edit">
		<div class="row">
			<form action="" @submit.prevent="update">

				<formulario :data-model.sync="currentModel" :selected.sync="materiasSeleccionadas"></formulario>

			</form>
		</div>
	</app-modal>

</div>

</template>

<script>

	import Loading from '../../reusable/loading.vue';

	import Modal from '../../reusable/modal.vue';

	import coolTable from '../../reusable/cool-table.vue';

	import formulario from './form-fields.vue';

	import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		route: {
			data: function(transition){
				this.load();
				transition.next();
			}
		},
		data(){
			return {
				showModal: false,
				url: 'api/ciclo/param/docentes',
				toolbar: null,
				currentModel: {},
				materiasSeleccionadas: [],
				datos: [],
				columnas: [
				{
					title: 'Ciclo',
					field: 'ciclo',
					hidden: false,
					sortable: true,
					template: '${col.ciclo_detail.anio} - ${col.ciclo_detail.anio+1} (${col.ciclo_detail.ciclo})'
				},
				{
					title: 'Docente',
					field: 'nombres',
					hidden: false,
					sortable: true,
					template: '${col.docente_detail.abreviatura}. ${col.docente_detail.nombres} ${col.docente_detail.apellidos}'
				},
				{
					title: 'Materias',
					field: 'materias',
					hidden: false,
					sortable: false,
					template: '${col.materias_docente_ciclo.map(function(ele){return ele.materia_detail.nombre_materia;}).join(", ")}'
				},
				{
					title: 'Gestionar Materias',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					itemActions: [
						{
							nameEmit: 'materias-docente-update-event',
							btnClass: 'btn btn-primary btn-xs',
							iconClass: 'fa fa-pencil',
							label: 'Modificar',
						}
					]
				}
				],
				loading: false,
			}
		},
		components: {
			'cool-table' : coolTable,
			'app-loading' : Loading,
			'app-modal' : Modal,
			'formulario':formulario
		},
		events: {
			'materias-docente-update-event' : function(model){
				this.toggleDataModel(model.docente_detail, model.materias_docente_ciclo);
				this.toggleModal();
			},
			//when modal emit ok
			'event-end-edit': function(){
				this.update();
			}
		}
	}

</script>
