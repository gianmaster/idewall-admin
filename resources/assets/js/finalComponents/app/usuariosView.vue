<template>

	<div v-if="loading">
		<app-loading></app-loading>
	</div>

	<div v-else>
		<!-- Modo listar -->

		<div class="row" v-show="mode == 'listar'">
			<div class="col-xs-12">
				<button class="btn btn-primary btn-flat" @click.prevent="toggleMode('crear')"><i class="fa fa-plus"></i> Nuevo</button>
			</div>	

			<div class="col-xs-12">
				<table class="table table-responsive">
					<thead>
						<tr>
							<th class="text-center">Nombre</th>
							<th class="text-center">Correo</th>
							<th class="text-center">Acciones</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="model in models">
							<td>{{model.name}}</td>
							<td>{{model.email}}</td>

							<td class="text-center">

								<div class="btn-group">

									<a class="btn btn-default btn-xs" href="" @click.prevent="eveView(model.id)" ><i class="fa fa-eye" data-toggle="tooltip" title="Ver este usuario a detalle" style="font-size: 1.2em;"></i></a>

									<a class="btn btn-default btn-xs" href="" @click.prevent="eveEdit(model.id)" ><i class="fa fa-edit" data-toggle="tooltip" title="Editar este usuario" style="font-size: 1.2em;"></i></a>

									<a class="btn btn-danger btn-xs" href="" @click.prevent="eveDelete(model.id)" ><i class="fa fa-trash" data-toggle="tooltip" title="Eliminar este usuario" style="font-size: 1.2em;"></i></a>

								</div>

							</td>

						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Modo creacion / edicion -->
		<div class="row" v-show="mode == 'crear' || mode == 'editar'" >
			<div class="col-sm-6 col-xs-12">
				<div class="form-group">
					<label for="nombre">Nombre</label>
					<input type="text" id="nombre" v-model="newModel.name" class="form-control">
				</div>
			</div>
			<div class="col-sm-6 col-xs-12">
				<div class="form-group">
					<label for="correo">Email</label>
					<input type="email" id="correo" v-model="newModel.email" class="form-control">
				</div>
			</div>
			<div class="col-sm-6 col-xs-12" v-if="mode == 'crear'">
				<div class="form-group">
					<label for="correo">Contraseña</label>
					<input type="password" id="pass" v-model="newModel.password" class="form-control">
				</div>
			</div>

			<div class="col-xs-12">
				<button v-if="mode == 'crear'" class="btn btn-success btn-flat" @click.prevent="crear(newModel)"><i class="fa fa-save"></i> Guardar</button>
				<button v-if="mode == 'editar'" class="btn btn-success btn-flat" @click.prevent="modificar(newModel.id)"><i class="fa fa-save"></i> Guardar Cambios</button>
				<button class="btn btn-default btn-flat" @click.prevent="cancel">Cancelar</button>
			</div>
		</div>

		<!-- Modo lectura -->
		<div class="row" v-show="mode == 'visualizar'">
			<div class="col-xs-12">
				<label for="name">Nombre</label>
				<p>{{newModel.name}}</p>
			</div>
			<div class="col-xs-12">
				<label for="email">Correo</label>
				<p>{{newModel.email}}</p>
			</div>
			<div class="col-xs-12">
				<button class="btn btn-default btn-flat" @click.prevent="cancel"><i class="fa fa-arrow-circle-left"></i> Regresar</button>
			</div>
		</div>
	</div>

</template>

<style>
	
</style>

<script>

	import Pagination from '../reusable/pagination.vue';
	import Loading from '../reusable/loading.vue';

	const BASE_URL = '/admin_lte/public/api';

	export default{
		name: 'Usuarios',
		components: {
			'app-loading' : Loading,
			'vuetable-pagination-bootstrap' : Pagination
		},
		data(){
			return{
				newModel: {},
				models: [],
				mode: 'listar',
				loading: false,
				columns: [
					{
						name: 'name',
						title: 'Nombre Completo',
						//sortField: 'name'
					},
					{
						name: 'email',
						title: 'Correo',
						//sortField: 'email'
					},
					{
						name: 'created_at',
						title: 'Fecha creación',
						callback: "dateToChar|%Y-%m-%d %T"
						//sortField: 'created_at'
					},
					{
						name: 'updated_at',
						title: 'Fecha modificación',
						callback: "dateToChar|%Y-%m-%d %T"
						//sortField: 'updated_at'
					}
	            ],
	            paginationInfoTemplate: 'Montrar: {from} de {to} de {total} registros',
	            paginationConfig: {
	            	wrapperClass: 'pagination',
                    icons: { first: '', prev: '', next: '', last: ''},
                    activeClass: 'active',
                    linkClass: 'btn btn-default',
                    pageClass: 'btn btn-default'
	            }
			}
		},
		route: {
			data: function(transition){
				var self = this;
				self.$parent.$parent.$data.title = 'Usuarios';
				transition.next();	
				//self.$parent.$parent.$data.title = 'Usuarios';
				//	transition.next();
				/*
				setTimeout(function () {
					self.$parent.$parent.$data.title = 'Usuarios';
					transition.next();
				}, 800);
				*/
			}
		},
		ready(){
			this.loading = true;
			this.listar();
			this.toggleMode('listar');
			this.$parent.listPath = ['Usuarios'];
			
		},
		methods: {
			crear: function(model){
				var self = this;
				self.loading = true;
				this.$http.post(`${BASE_URL}/users`, this.newModel).then((resp) => {
					Lobibox.notify('success', {
						msg: 'Se creo el usuario correctamente!',
						sound: false
					});
					self.listar();
					this.toggleMode('listar');
				}, (err) => {
					self.loading = false;
					console.warn(err);
					Lobibox.notify('error', {
						msg: 'Se presento un error al querer realizar esta acción',
						sound: false
					});
				});
			},
			modificar: function(_id){
				var self = this;
				self.loading= true;
				this.$http.put(`${BASE_URL}/users/${_id}`, this.newModel).then((resp) => {
					Lobibox.notify('success', {
						msg: 'Se creo el usuario correctamente!',
						sound: false
					});
					self.listar();
					this.toggleMode('listar');
					this.newModel = {};
				}, (err) => {
					console.warn(err);
					self.loading = false;
					Lobibox.notify('error', {
						msg: 'Se presento un error al querer realizar esta acción',
						sound: false
					});
				});
			},
			eveDelete: function(_id){
				if(confirm('¿Estás seguro?')){
					this.loading = true;
					var self = this;
					this.$http.delete(`${BASE_URL}/users/${_id}`).then((resp) => {
						Lobibox.notify('success', {
							msg: 'Se eliminó el usuario correctamente!',
							sound: false
						});
						self.listar();
						this.toggleMode('listar');
					}, (err) => {
						console.warn(err);
						Lobibox.notify('error', {
							msg: 'Se presento un error al querer realizar esta acción',
							sound: false
						});
					});
				}
			},
			eveEdit: function(_id){
				this.loading = true;
				this.ver(_id);
				this.toggleMode('editar');
			},
			eveView: function(_id){
				this.loading = true;
				this.ver(_id);
				this.toggleMode('visualizar');
			},
			listar: function(){
				this.$http.get(`${BASE_URL}/users`).then((resp) => {
					this.models = resp.data.data;
					this.loading = false;
				}, (err) => {
					console.warn(err);
					this.loading = false;
				});
			},
			ver: function(_id){
				this.$http.get(`${BASE_URL}/users/${_id}`).then((resp) => {
					this.newModel = resp.data.data;
					this.loading = false;
				}, (err) => {
					console.warn(err);
					this.loading = false;
				});
			},
			cancel: function(){
				this.newModel = {};
				this.toggleMode('listar');
			},

			toggleMode: function (mode) {
				 this.mode = this.$parent.description = mode;
			},

			dateToChar: function(date, format){
				return date ? this.$options.filters.date(date, format) : 'Vacio';

			}
		},

	}

</script>
