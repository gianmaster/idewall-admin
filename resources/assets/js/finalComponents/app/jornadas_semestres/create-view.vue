<template>
	<div class="row">
		<form action="" @submit.prevent="create">
			
			<form-inputs :create-mode="createMode" :data-model.sync="newModel"></form-inputs>

		</form>
	</div>
</template>

<script>
	
	import inputs from './form-fields.vue';

	import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		data(){
			return {
				createMode: true,
				newModel: {},
				url: 'api/jornadasemestre'
			}
		},
		components: {
			'form-inputs': inputs
		}

	}
</script>
