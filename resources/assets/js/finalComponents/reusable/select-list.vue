<template>
	<select v-if="data.length<=0" :class="className" disabled>
		<option>Cargando.....</option>
	</select>
	<select v-else v-model="selectValue" :class="className" :required="isRequired">

		<option v-if="selectLabel" disabled selected :value="nullValue">{{selectLabel}}</option>

		<template v-if="labelKey && valueKey">
			<option v-for="item in data" value="{{item[valueKey]}}" >{{item[labelKey]}}</option>
		</template>
		<template v-else>
			<option v-for="item in data" :value="item">{{item}}</option>
		</template>
		<option v-if="nullableLabel" :value="nullValue">{{nullableLabel}}</option>

	</select>
</template>

<script>
	export default{
		name: 'select-list',
		ready: function(){
			let self = this;
			if (this.url){
				this.$http.get(this.url).then(function(resp){
					self.data = resp.data.data;
				}, function(err){
					console.warn(err);
				});	
			}
			
		},
		props:{
			className: {
				type: String,
				required: false,
				default: null
			},
			labelKey: {
				type: String,
				required: false,
				default: null
			},
			valueKey: {
				type: String,
				required: false,
				default: null
			},
			data: {
				type: Array,
				required: false,
				default: function(){
					return [];
				}
			},
			url: {
				type: String, 
				reqruired: false,
				default: null
			},
			selectLabel: {
				type: String, 
				required: false,
				default: null
			},
			noDataLabel: {
				type: String,
				required: false,
				default: 'No hay datos'
			},
			selectValue: {
				type: Number | String,
				required: true
			},
			nullableLabel: {
				type: String,
				required: false,
				default: null
			},
			nullValue: {
				deafult: null
			},
			isRequired: {
				type: Boolean,
				required: false,
				default: false
			}

		},
		methods: {

		}
	}
</script>