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

	function formateaHora(hora){
		const time = hora.split('.');
		if(time[1] == 50){
			return `${time[0]}:30H`;
		}else{
			return `${time[0]}:00H`;
		}
	}

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
					titleClass: 'text-center',
					fieldClass: 'text-center',
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
					titleClass: 'text-center',
					fieldClass: 'text-center',
					hidden: false,
					sortable: true
				},
				{
					title: 'Horas Académicas',
					field: 'horas_academicas_asignadas',
					titleClass: 'text-center',
					fieldClass: 'text-center',
					hidden: false,
					sortable: false,
					template: '<span class="text-green"><i class="fa fa-clock-o"></i> ${col.horas_academicas_asignadas.replace(".",":").replace("5","3")}H</span>'
				},
				{
					title: 'Horas Distributivos',
					field: 'horas_complementarias',
					titleClass: 'text-center',
					fieldClass: 'text-center',
					hidden: false,
					sortable: false,
					template: '<span class="text-green"><i class="fa fa-clock-o"></i> ${col.horas_complementarias.replace(".",":").replace("5","3")}H</span>'
				},
				{
					title: 'Total Horas',
					field: 'total',
					titleClass: 'text-center',
					fieldClass: 'text-center',
					hidden: false,
					sortable: false,
					template: '<span class="text-green"><i class="fa fa-clock-o"></i> ${col.total.replace(".",":").replace("5","3")}H</span>'
				},
				{
					title: 'Opciones',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					itemActions: [
						{
							nameEmit: 'pdf-horario-event',
							btnClass: 'btn btn-success btn-xs',
							iconClass: 'fa fa-file-pdf-o',
							label: 'Descargar'
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
			'pdf-horario-event' : function(model){
				this.$router.go(`/horariosdocentes/edit/${model.ciclo_docente}`);
			},
			//when modal emit ok
			'event-end-edit': function(){
				this.update();
			}
		}
	}

</script>

