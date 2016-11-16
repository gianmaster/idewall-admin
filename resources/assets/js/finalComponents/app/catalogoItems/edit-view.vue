<template>
<loading-app v-if="loading===true"></loading-app>
	<div class="row" v-else>
		<form action="" @submit.prevent="update">
			
			<form-inputs :create-mode="createMode" :data-model.sync="newModel"></form-inputs>

		</form>
	</div>
</template>

<script>
	
	import inputs from './form-fields.vue';
	import {urlCatalogo} from '../config';
	import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		route: {
			data: function(transition){
				this.generateUrl();
				transition.next();
			}
		},
		ready(){
			this.read();
		},
		data(){
			return {
				createMode: false,
				newModel: {},
				loading: true,
				url: urlCatalogo
			}
		},
		components: {
			'form-inputs': inputs
		},

	}


</script>