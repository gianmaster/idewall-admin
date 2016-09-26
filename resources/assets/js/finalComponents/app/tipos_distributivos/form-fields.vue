<template>

	<div class="col-sm-6 col-xs-12">
		<label>Nombre Distributivo</label>
		<input type="text" class="form-control" v-model="dataModel.nombre" minlength="6" required>
		<input type="hidden" class="form-control" :value="dataModel.id">
	</div>

	<div class="col-sm-3 col-xs-12">
		<label>Orden</label>
		<input type="number" class="form-control" v-model="dataModel.orden" min="0" required>
	</div>

	<div class="col-sm-3 col-xs-12 text-center">
		<label>Activo</label>
		<br>
		<input type="checkbox" v-model="dataModel.activo">
	</div>

	<div class="col-xs-12">

		<hr>

		<button v-if="createMode" class="btn btn-success btn-flat btn-block" type="submit"><i class="fa fa-save"></i> GUARDAR</button>
		<button v-else class="btn btn-warning btn-flat btn-block" type="submit"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>

	</div>

</template>

<script>

	export default {
		beforeCompile(){
			if (this.createMode){
				this.dataModel = this.initModel();
			}
		},
		methods: {
			initModel: function(){
				return {
					id: null,
					activo: 0,
					nombre: null,
					orden: null,
					items:[]
				}
			}
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
						id: null,
						activo: 0,
						nombre: null,
						orden: null,
						items:[]
					}
				}
			}
		}
	}
	
</script>
