<template>
	
	<div class="content">
		<div class="row">
			<view-data-table
					title="Malla Academica"
					:url="url"
					:columns="columnsConf"
					:message="messageConf"
					:operators="operatorsConf"
			>
				<button type="button" @click="$emit('addRow')" id="add" class="heading-item dv-btn" slot="top-widget"><i class="fa fa-plus"></i></button>
				<div slot="options" class="text-center">Opciones</div>
				<div slot="row-option" class="text-center">
					<div class="btn-group">
						<a class="btn btn-default btn-xs" href="javascript:;" @click="$emit('editRow', col)">
							<i data-toggle="tooltip" class="fa fa-eye" title="" data-original-title="Visualizar"></i>
						</a><a class="btn btn-default btn-xs" href="javascript:;">
							<i data-toggle="tooltip" class="fa fa-edit" title="Editar"></i>
						</a><a class="btn btn-danger btn-xs" href="javascript:;">
							<i data-toggle="tooltip" class="fa fa-trash" title="Eliminar"></i>
						</a>
					</div>
				</div>
			</view-data-table>
		</div>
	</div>

</template>


<script>

	import viewDataTable from '../reusable/viewDataTable.vue';
	import {endpoint} from './config';
	const url = `${endpoint}/malla_academica/all`;

	export default {
		data(){
			return {
				url: url,
				operatorsConf: [
					{label: 'Contenga', value: 'LIKE', types: ['*']},
					{label: 'Igual', value: '=', types: ['*']},
					{label: 'No Igual', value: '<>', types: ['*']},
					{label: 'Menor que', value: '<', types: ['number', 'date']},
					{label: 'Mayor que', value: '>', types: ['number', 'date']},
					{label: 'Menor igual que', value: '<=', types: ['number', 'date']},
					{label: 'Mayor igual que', value: '>=', types: ['number', 'date']},
					{label: 'Entre (Separado por coma)', value: 'BETWEEN', types: ['number', 'date']},
					{label: 'Incluya (Separado por coma)', value: 'IN', types: ['*']}
				],
				messageConf: {
					info: 'Mostrando $1 - $2 de $3 registros',
					per_page: 'Items por Pagina',
					no_data: 'No hay registros'
				},
				columnsConf: [

					{
						name: 'codigo_materia',
						type: 'string',
						title: 'Código',
						hidden: false,
						width: '10%',
						searchable: true
					},
					{
						name: 'nombre_materia',
						type: 'string',
						title: 'Nombre Matéria',
						width: '20%'
					},
					{
						name: 'semestre',
						type: 'string',
						title: 'Semestre',
						hidden: false,
						width: '10%',
						searchable: true
					},
					{
						name: 'horas',
						type: 'string',
						title: 'Horas',
						hidden: false,
						width: '10%',
						searchable: true
					},
					{
						name: 'tipo_materia',
						type: 'string',
						title: 'Tipo',
						hidden: false,
						width: '10%',
						searchable: true
					},
					{
						name: 'tipo_asignacion',
						type: 'string',
						title: 'Asignacion',
						hidden: false,
						width: '10%',
						searchable: true
					},
					{
						name: 'estado',
						type: 'string',
						title: 'Estado',
						hidden: false,
						width: '10%',
						searchable: true
					},
					{
						name: 'silabos',
						type: 'string',
						title: 'Silabos',
						width: '10%',
						hidden: false,
						template: function(item){
							return `<i class="${item.length > 0 ? 'fa fa-check text-green' : 'fa fa-close text-red'}"><i>`;
						},
						searchable: true,
						class: 'text-center'
					}
				]
			}
		},
		components: {
			viewDataTable
		},
		events: {
			addRow(model){
				console.log('entro al agregar');
			},
			editRow(model){
				console.log('editar', model);
			}
		}
	}

</script>
