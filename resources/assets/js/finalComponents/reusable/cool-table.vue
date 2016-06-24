<template>
	<div v-if="optionToolbar" :class="divSeparatorClass">
		<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="true" :title="optionToolbar.label">
			<i :class="optionToolbar.iconClass"></i>
		</button>
		<ul class="dropdown-menu">
			<li v-for="(idx, col) in columns">
				<span class="checkbox">
					<label @click="toggleColumns(idx)">
						<strong>{{ col.title }} <i class="fa fa-check font-success" v-if="!col.hidden"></i><i class="fa fa-close font-error" v-else></i></strong>
						<!--
						<i class="fa fa-check" v-if="col.hidden"></i>
						<i class="fa fa-close" v-else></i>
						-->
					</label>
				</span>
			</li>	
		</ul>
	</div>

	<div :class="divSeparatorClass">
		<table :class="tableClass">
			<thead v-if="requireHeader">
				<tr>
					<th v-for="col in columns | filterBy false in 'hidden'" :class="col.titleClass">{{col.title}}</th>
				</tr>
			</thead>
			
			<tbody>
				<tr v-for="item in data">

					<td v-for="col in columns | filterBy false in 'hidden'" :class="col.fieldClass">
						
						<div v-if="!col.itemActions">{{ item[col.field] }}</div>
						
						<div v-else class="btn-group">

							<a v-for="act in col.itemActions" :class="act.btnClass" href="" @click.prevent="dispacher(act.nameEmit, item)" >
								<i :class="act.iconClass" data-toggle="tooltip" :title="act.label"></i>
							</a>

						</div>

						<!--
						<pre>{{item | json }}</pre>
					-->

				</td>

			</tr>
		</tbody>
		
	</table>
</div>

</template>

<style>
	.font-success{
		color: #00a65a;
	}

	.font-error{
		color: #dd4b39;
	}
</style>

<script>

	function schemaModel(toModel){
		if(toModel.field){
			Object.assign(toModel, {
				hidden: toModel.hidden ? toModel.hidden :false,
				field: toModel.field ? toModel.field : '',
				fieldClass: toModel.fieldClass ? toModel.fieldClass : '',
				title: toModel.title ? toModel.title : toModel.field.toUpperCase(),
				titleClass: toModel.titleClass ? toModel.titleClass : '',
				filterable: toModel.filterable ? toModel.filterable : false,
				applyFilter: toModel.applyFilter ? toModel.applyFilter : null, 
				template: toModel.template ? toModel.template : null, 
				itemActions: toModel.itemActions ? toModel.itemActions : null 
			});	
		}else{
			if(toModel.itemActions){
				if(toModel.itemActions.length<=0){
					throw ('ModelError: itemActions proptype is required in columns object if is not a field');
				}
				else{
					Object.assign(toModel, {
						hidden: toModel.hidden ? toModel.hidden :false,
						field: toModel.field ? toModel.field : '',
						fieldClass: toModel.fieldClass ? toModel.fieldClass : '',
						title: toModel.title ? toModel.title : toModel.field.toUpperCase(),
						titleClass: toModel.titleClass ? toModel.titleClass : '',
						filterable: toModel.filterable ? toModel.filterable : false,
						applyFilter: toModel.applyFilter ? toModel.applyFilter : null, 
						template: toModel.template ? toModel.template : null, 
						itemActions: toModel.itemActions ? toModel.itemActions : null 
					});
				}
			}else
			throw ('ModelError: field proptype is required in columns object');
		}

	}


	function arrayToScema(listModels){
		listModels.forEach( function(element, index) {
			schemaModel(element);
		});
	}
	
	export default {
		props: {
			optionToolbar: { 
				type: Object, 
				default: function(){
					return {
						iconClass: 'glyphicon glyphicon-cog',
						label: 'Campos visibles'
					}
				}
			},
			tableClass: { type: String, default: 'table table-bordered table-striped'},
			requireHeader: {type: Boolean, default: true},
			divSeparatorClass: {type: String, default: 'col-xs-12'},
			endpoint: {type: String, default: '/admin_lte/public/api/users'},
			sortable: {
				type: Object,
				default: function(){
					return {
						ascendingIcon:'glyphicon glyphicon-chevron-up',
						descendingIcon:'glyphicon glyphicon-chevron-down'
					}	
				}
			},
			columns: {
				type: Array, default: function(){
					return [
					{
						field: 'name',
						hidden: true
					},
					{
						field: 'email',
						hidden: true
					},
					{
						title: 'Acciones',
						hidden: true,
						itemActions: [
						{
							nameEmit: 'view-event',
							btnClass: 'btn btn-default btn-xs',
							iconClass: 'fa fa-eye',
							label: 'Visualizar',
						},
						{
							nameEmit: 'view-event',
							btnClass: 'btn btn-default btn-xs',
							iconClass: 'fa fa-edit',
							label: 'Editar',
						},
						{
							nameEmit: 'view-event',
							btnClass: 'btn btn-danger btn-xs',
							iconClass: 'fa fa-trash',
							label: 'Eliminar',
						}
						]
					}
					]
				}
			}, 
			pagination: {
				type: Object, 
				default : function(){
					return {
						templateNoRegister: 'No hay registros',
						templateRegister: 'Mostrando: {0} - {1} de {2} registros',
						first: "Ir al Inicio",
						previous: "Previa",
						next: "Siguiente",
						last: "Ir al Final",
						refresh: "Actualizar",
						searchable: false,
						data: {
							total:150,
							per_page:15,
							current_page:1,
							last_page:10,
							next_page_url:"http:\/\/vuetable.ratiw.net\/api\/users?page=2",
							prev_page_url:null,
							from:1,
							to:15,
							per_page_list: [10, 15, 20, 15, 50]
						}
					}
				}
			}, 
			data: {
				type: Array,
				deafult: function(){
					return []
				}
			}      
		},
		methods: {
			toggleColumns: function(idx){
				console.log('el index es ' + idx , this.columns[idx].hidden);
				this.columns[idx].hidden = !this.columns[idx].hidden;
			},
			loadData: function(url) {
				var self = this;
				console.log('entra pero vale caca', url);
				self.$http.get(url).then((resp) => {
					console.log('esta es la data', resp);
					self.data = resp.data.data;
				}, (err) => {
					console.warn(err, 'error while try to load the endpoit', url);
				});
			},
			dispacher: function(event, model){
				this.$dispatch(event, model);
			}

		},
		ready(){
			this.loadData(this.endpoint);
		},
		created(){
			arrayToScema(this.columns);
		},
		data(){
			return {
				otro: 'hola'
			}
		}
	}

</script>