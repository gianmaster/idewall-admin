<template>
	
	<div class="content">
		<div class="row">
			<view-data-table
					title="Malla Academica"
					:url="url"
					:columns="columnsConf"
					:message="messageConf"
					:operators="operatorsConf"
			></view-data-table>
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
						name: 'id',
						type: 'number',
						title: 'ID',
						hidden: false,
						width: '5%',
						searchable: true
					},
					{
						name: 'codigo_materia',
						type: 'string',
						title: 'Cod. Materia',
						hidden: false,
						width: '12%',
						searchable: true
					},
					{
						name: 'nombre_materia',
						type: 'string',
						title: 'Nombre Materia',
						width: '30%'
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
						hidden: false,
						template: function(item){
							return `<i class="${item.length > 0 ? 'fa fa-check text-green' : 'fa fa-close text-red'}"><i>`;
						},
						searchable: true
					}
				]
			}
		},
		components: {
			viewDataTable
		}
	}

</script>

