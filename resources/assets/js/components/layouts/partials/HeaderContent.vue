<template>
	<section class="content-header">
		<h1>
			{{title_page}}
			<small>{{page_description}}</small>
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
			<li class="active">Dashboard</li>
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
	}
}

</script>