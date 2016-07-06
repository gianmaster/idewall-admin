<template>
	<section class="content-header">
		<h1>
			{{title}}
			<small>{{$route.name}}</small>
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
			<li v-show="listPath.length > 0" v-for="item in listPath" :class="{'active': listPath.length-1 == $index}" track-by="$index">{{item}}</li>
		</ol>
	</section>
</template>
<script>
	export default {
		props: {
			title: {
				type: String,
				required: true
			},
			listPath: {
				type: Array,
				required: false,
				default: function(){
					return [];
				}
			}
		}
	}
</script>