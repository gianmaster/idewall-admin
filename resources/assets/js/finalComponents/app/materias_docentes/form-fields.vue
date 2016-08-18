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
			  placeholder="Hasta 3 materias"
			  :hide-selected="true"
			  label="desc"
			  :close-on-select="true"
			  :max="4"
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
	import Mixins from './mixins';

	export default {
		mixins: [Mixins],
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
		ready(){
			//para la lista de materias en el formulario Modal
			this.loadList();
		},
		data(){
			return {
				options: [
					{
						materia:17,
						desc: 'Opcion 1'
					}
				],
				templateLimit: count => `y ${count} más`

			}
		}
	}
	
</script>
