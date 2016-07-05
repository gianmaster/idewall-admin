<template>
	<div class="row">
		<div class="col-xs-12">
			<label>Menu padre</label>
			<select-list class-name="form-control col-xs-6" :select-value.sync="newModel.cod_padre" value-key="id" label-key="name" url="api/menu" select-label="Seleccione..." ></select-list>
		</div>
	</div>
</template>

<style></style>


<script>

import selectList from '../../reusable/select-list.vue';

	export default{
		components: {
			'select-list': selectList
		},
		data(){
			return {
				newModel: {
					cod_padre: ''
				},
				mode: '', //crear - editar
			}
		},

	}
</script>
