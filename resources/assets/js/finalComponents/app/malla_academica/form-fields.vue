<template>

	<!--
	<div class="col-sm-6 col-xs-12">
		<label>Catálogo</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.catalogo" value-key="id" label-key="descripcion" url="api/catalogos-list"></select-list>
	</div>
	-->

	<div class="col-sm-6 col-xs-12">
		<label>Código Item</label>
		<input type="text" class="form-control" v-model="dataModel.codigo" minlength="3" required>
		<input type="hidden" class="form-control" :value="dataModel.id">
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Descripción Item</label>
		<input type="text" class="form-control" v-model="dataModel.descripcion" minlength="6" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Orden Item</label>
		<input type="number" class="form-control" v-model="dataModel.orden" required>
	</div>

	<div class="col-xs-12">
		<div class="content">
			<button v-if="createMode" class="btn btn-success btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR</button>
			<button v-else class="btn btn-warning btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>
			<a v-link="{path: '/catalogos/'+$route.params.catalogo_id}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> VOLVER</a>
		</div>

	</div>
</template>

<script>

	import selectList from '../../reusable/select-list.vue';

	export default {
		beforeCompile(){
			if (this.createMode){
				this.dataModel = this.initModel();
			}
		},
		components: {
			'select-list': selectList
		},
		methods: {
			initModel: function(){
				return {
					catalogo: this.$route.params.catalogo_id,
					codigo: null,
					id: null,
					descripcion: null,
					orden: null,
					activo: true
				}
			},
		},
		props: {
			createMode: {
				type: Boolean,
				required: false,
				default: true
			},
			dataModel: {
				type: Object,
				required: false,
				default: function(){
					return {
						catalogo: null,
						codigo: null,
						id: null,
						descripcion: null,
						orden: null,
						activo: true
					}
				}
			}
		}
	}
	
</script>
