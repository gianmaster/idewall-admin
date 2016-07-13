<template>
	<div class="row">
		<form action="" @submit.prevent="addMenu">
			<div class="col-sm-6 col-xs-12">
				<label>Menu padre</label>
				<select-list class-name="form-control col-xs-6" :select-value.sync="newModel.cod_padre" value-key="id" label-key="name" url="api/menu" select-label="Seleccione..." ></select-list>
			</div>

			<div class="col-sm-6 col-xs-12">
				<label>Titulo</label>
				<input type="text" class="form-control" v-model="newModel.titulo" minlength="3"> 
				<input type="hidden" class="form-control" :value="newModel.titulo" v-model="newModel.nombre"> 
			</div>

			<div class="col-sm-6 col-xs-12">
				<label>Font-Awesome - Icono</label>
				<input type="text" class="form-control" v-model="newModel.iconclass" minlength="3"> 
			</div>

			<div class="col-sm-6 col-xs-12">
				<label>Url</label> <small>(Opcional)</small>
				<input type="text" class="form-control" v-model="newModel.url" minlength="3"> 
			</div>

			<div class="col-sm-6 col-xs-12">
				<label>orden</label>
				<input type="number" class="form-control" v-model="newModel.orden" min="0"> 
			</div>

			<div class="clearfix"></div>

			<div class="col-xs-12">
				<div class="content">
					<button class="btn btn-success btn-flat" type="submit">Guardar</button>				
					<button class="btn btn-default btn-flat" @click.prevent="mode='listar';" type="reset">Volver</button>
				</div>
				
			</div>

		</form>
	</div>
</template>

<style></style>


<script>

import selectList from '../../reusable/select-list.vue';
import fnc from '../../../util/reusable_functions';

	export default{
		components: {
			'select-list': selectList
		},
		data(){
			return {
				newModel: {
					id: null,
					cod_padre: null,
					titulo: null,
					nombre: null,
					iconclass: null,
					url: null,
					orden: null
				},
			}
		},
		methods: {
			createMenu: function(){
				var _this = this;
				this.$http.post('api/menu', this.newModel).then(function(resp){
					console.log(resp);
					fnc.niceAlert('success','Se agrego el menú correctamente!');
					_this.$parent.mode = _this.mode ='listar';
				}, function(err){
					fnc.niceAlert('error','Se presento un error al tratar de realizar esta acción!');
					console.warn(err);
				})
			}
		}

	}
</script>
