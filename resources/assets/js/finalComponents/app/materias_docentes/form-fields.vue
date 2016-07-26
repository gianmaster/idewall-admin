<template>

	<div class="col-xs-12">
		<div class="{'invalid': isInvalid}">
			<label>Seleccione las materias para </label>
			<multiselect
					:options="options",
					:selected.sync="selected",
					:multiple="true",
					:searchable="true",
					:allow-empty="false",
					:hide-selected="true",
					:max-height="400",
					:max="5"
					placeholder="Al menos una, máximo 3"></multiselect>
		</div>

	</div>

</template>

<style>

</style>

<script>

	import selectList from '../../reusable/select-list.vue';

	import Multiselect from 'vue-multiselect';

	export default {
		computed: {
			isInvalid () {
				return this.isTouched && this.selected.length === 0
			},
		},
		beforeCompile(){
			if (this.createMode){
				this.dataModel = this.initModel();
			}
		},
		components: {
			'select-list': selectList,
			'multiselect': Multiselect
		},
		methods: {
			initModel: function(){
				return {
					selected: []
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
						selected: null
					}
				}
			}
		}
	}
	
</script>
