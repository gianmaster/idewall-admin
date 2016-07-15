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
	
	import fnc from '../../../util/reusable_functions';

	const URL = 'api/catalogos';

	export default {
		ready(){
			this.read();
		},
		data(){
			return {
				createMode: false,
				newModel: {},
				loading: true
			}
		},
		methods: {
			read: function(){
				this.loading = true;
				this.$http.get(URL + '/' + this.$route.params.model_id).then(function(resp){
					this.newModel = resp.data.data;
					this.loading = false;
				}, function(err){
					console.warn(err);
					fnc.niceAlert('error', err.message);
					this.loading = false;
				});
			}
		}

	}


</script>