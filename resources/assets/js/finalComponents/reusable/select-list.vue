<template>
	<select name="" id="" v-model="selectValue" :class="className">

		<option v-if="selectLabel" disabled>{{selectLabel}}</option>
		<template v-if="labelKey && valueKey">
			<option v-for="item in data" :value="item[valueKey]">{{item[labelKey]}}</option>
		</template>
		<template v-else>
			<option v-for="item in data" :value="item">{{item}}</option>
		</template>

	</select>
</template>

<script>
	export default{
		name: 'select-list',
		ready: function(){
			let self = this;
			this.$http.get(this.url).then(function(resp){
				self.data= resp.data.data;
			}, function(err){
				console.warn(err);
			});
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
				type: String | Number,
				required: true
			}

		},
		methods: {

		}
	}
</script>