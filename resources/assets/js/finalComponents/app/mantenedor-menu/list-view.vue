<template>
	<app-gestor-menu url="api/menu"></app-gestor-menu>
</template>

<script>
	import management from '../../reusable/menuManagement.vue';

	export default {
		components: {
			'app-gestor-menu': management
		}
	}
</script>