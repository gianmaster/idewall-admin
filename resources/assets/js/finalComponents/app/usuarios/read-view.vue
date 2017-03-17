<template>
	<loading-app v-if="loading===true"></loading-app>

	<div class="row" v-else>

		<div class="col-xs-12 col-sm-4 col-md-3">
			<img :src="newModel.avatar" class="profile-ima-edit" alt="Responsive image">
		</div>

		<div class="col-sm-6 col-xs-12">
			<strong>Nombre Completo:</strong>
			<p>{{newModel.name}}</p>
		</div>

		<div class="col-sm-6 col-xs-12">
			<strong>Correo Electrónico:</strong>
			<p>{{newModel.email}}</p>
		</div>

		<div class="col-sm-6 col-xs-12">
			<strong>Estado:</strong>
			<p>{{newModel.state}}</p>
		</div>


		<div class="col-xs-12" style="padding-top: 50px;">
			<a v-link="{path: '/usuarios'}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> VOLVER</a>
		</div>
	</div>
</template>

<script>
	
	import myMixins from './mixins';
	import {urlUsuarios} from '../config';

	export default {
		mixins: [myMixins],
		ready(){
			this.read();
		},
		data(){
			return {
				newModel: {},
				loading: true,
				url: urlUsuarios
			}
		},

	}


</script>