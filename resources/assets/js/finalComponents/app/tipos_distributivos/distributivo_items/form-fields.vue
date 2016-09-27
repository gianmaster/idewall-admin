<template>

	<form action="" @submit.prevent="submitEvent">

		<div class="col-sm-6 col-xs-12">
			<label>Nombre Item</label>
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

		<div class="col-sm-6 col-xs-12 text-center">
			<label>Modificable <small>(sí es dinámico en la asignación por docente)</small></label>
			<br>
			<input type="checkbox" v-model="dataModel.modificable">
		</div>

		<div class="col-xs-12">

			<hr>

			<button v-if="mode=='create'" class="btn btn-success btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR</button>
			<button v-else class="btn btn-warning btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>
			<button class="btn btn-default btn-flat" @click="mode='list'">CANCELAR</button>

		</div>

	</form>

</template>

<script>

	import mixins from './mixins';

	export default {
		props: {
			mode: {
				type: String,
				required: false,
				default: 'create'
			},
			dataModel: {
				type: Object,
				required: false,
				default: function(){
					return {
						activo: 1,
						id: null,
						id_distributivo: null,
						modificable: 0,
						nombre: '',
						orden: 0
					}
				}
			},
			currentDistributivo: {}
		},
		mixins: [mixins]
	}
	
</script>

