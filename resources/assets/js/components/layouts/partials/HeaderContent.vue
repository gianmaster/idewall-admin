<template>
	<section class="content-header">
		<h1>
			{{title_page}}
			<small>{{page_description}}</small>
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
			<li v-show="$index > 0" v-for="item in listPath" :class="{'active': listPath.length-1 == $index}" track-by="$index">{{item}}</li>
		</ol>
	</section>
</template>

<script>
	
module.exports = {
	props: {
		title_page: {
			type: String,
			required: false,
			default: "DashBoard"
		},
		page_description: {
			type: String,
			required: false,
			default: ""
		}
	},
	computed:{
		listPath: function(){
			return this.$route.path.split('/');
		}
	}
}

</script>