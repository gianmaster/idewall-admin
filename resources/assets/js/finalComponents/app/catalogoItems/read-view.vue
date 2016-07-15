<template>
<loading-app v-if="loading===true"></loading-app>
	<div class="row" v-else>
		<div class="col-xs-12">
			<strong>Nombre:</strong>
			<p>{{newModel.nombre}}</p>
		</div>
		<div class="col-xs-12">
			<strong>Descripción:</strong>
			<p>{{newModel.descripcion}}</p>
		</div>
		<div class="col-xs-12">
			<a v-link="{path: '/catalogos'}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> VOLVER</a>
		</div>
	</div>
</template>

<script>
	
import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		ready(){
			this.read();
		},
		data(){
			return {
				newModel: {},
				loading: true,
				url: 'api/catalogos'
			}
		},

	}


</script>