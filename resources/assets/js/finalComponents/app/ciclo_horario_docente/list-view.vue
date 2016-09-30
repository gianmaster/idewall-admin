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

	const tagL = "<span class='color-palette label bg-primary'>";
	const tagR = "</span>";

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
				url: 'api/ciclohorariodocente',
				toolbar: null,
				currentModel: {},
				materiasSeleccionadas: [],
				datos: [],
				columnas: [
				{
					title: 'Período',
					field: 'anio',
					hidden: false,
					sortable: true,
					template: '${col.anio} - ${col.anio+1} (${col.ciclo})'
				},
				{
					title: 'Docente',
					field: 'nombres',
					hidden: false,
					sortable: true,
					template: '${col.abreviatura}. ${col.nombres} ${col.apellidos}'
				},
				{
					title: 'Identificación',
					field: 'identificacion',
					hidden: false,
					sortable: true
				},
				{
					title: 'Horas Clases',
					field: 'horas_academicas_asignadas',
					hidden: false,
					sortable: false,
					template: '<span class="text-green"><i class="fa fa-clock"></i> ${col.horas_academicas_asignadas}</span>'
				},//color-palette label bg-navy
				{
					title: 'Opciones',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					itemActions: [
						{
							nameEmit: 'horario-docente-event',
							btnClass: 'btn btn-success btn-xs',
							iconClass: 'fa fa-calendar',
							label: 'Definir Horario'
						}
					]
				}
				],
				loading: false
			}
		},
		components: {
			'cool-table' : coolTable,
			'app-loading' : Loading,
			'app-modal' : Modal,
			'formulario':formulario
		},
		events: {
			'horario-docente-event' : function(model){
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
