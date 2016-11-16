<template>
	<div class="row">
		<form action="" @submit.prevent="create">
			
			<form-inputs :create-mode="createMode" :data-model.sync="newModel"></form-inputs>

		</form>
	</div>
</template>

<script>
	
	import inputs from './form-fields.vue';
	import {urlDocentes} from '../config';
	import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		route: {
			data: function(transition){
				transition.next();
			}
		},
		data(){
			return {
				createMode: true,
				newModel: {},
				url: urlDocentes
			}
		},
		components: {
			'form-inputs': inputs
		},

	}
</script>
