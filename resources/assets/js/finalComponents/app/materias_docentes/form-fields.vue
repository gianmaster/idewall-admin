<template>

	<div class="col-xs-12">
		<div class="{'invalid': isInvalid}">
			<label>Docente: <span class="__user">{{docente}}</span></label>
			<multiselect
			:options="options"
			  :selected.sync="selected"
			  :multiple="true"
			  :searchable="true"
			  :close-on-select="true"
			  :clear-on-select="false"
			  placeholder="Seleccione máximo 3 materias"
			  :hide-selected="true"
			  label="desc"
			  :close-on-select="true"
			  :max="3"
			  :taggable="true"
			  select-label="Presione enter para seleccionar"
			  deselect-label="Presione enter para remover"
			  :limit-text="templateLimit"
			  key="materia"></multiselect>
		</div>

	</div>

</template>

<style>

	.__user{
		color: #656464;
	}

</style>

<script>

	import Multiselect from 'vue-multiselect';

	export default {
		computed: {
			isInvalid () {
				return this.isTouched && this.selected.length === 0
			},
			docente(){
				const {nombres, abreviatura, apellidos} = this.dataModel;
				return `${abreviatura}. ${nombres} ${apellidos}`;
			}
		},
		
		components: {
			'multiselect': Multiselect
		},

		props: {
			selected: {
				type: Array,
				default: function(){
					return [];
				}
			},
			dataModel: {
				type: Object,
				required: false,
				default: function(){
					return {
						id: null,
						nombres: null,
						apellidos: null,
						abrevatura: null,
					}
				}
			}
		},
		data(){
			return {
				options: [
					{
						materia:17,
						desc: 'Opcion 1'
					},
					{
						materia:18,
						desc: 'Opcion 2'
					},
					{
						materia:19,
						desc: 'Opcion 3'
					},
					{
						materia:20,
						desc: 'Opcion 4'
					},
					{
						materia:12,
						desc: 'Opcion 5'
					},
					{
						materia:34,
						desc: 'Opcion 6'
					},
					{
						materia:41,
						desc: 'Opcion 7'
					},
					{
						materia:33,
						desc: 'Opcion 8'
					},
				],
				templateLimit: count => `y ${count} más`

			}
		}
	}
	
</script>
