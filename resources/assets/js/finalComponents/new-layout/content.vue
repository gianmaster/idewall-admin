<template>

	<!-- Content Wrapper. Contains page content -->
	<div v-else class="content-wrapper">
		<router-view></router-view>
		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->
</template>

<script>

	module.exports = {
		name : 'Content',		
	}
</script>
