<template>
	<app-gestor-menu :url="urlMenu"></app-gestor-menu>
</template>

<script>
	import management from '../../reusable/menuManagement.vue';
	import {urlMenu} from '../config';

	export default {
		components: {
			'app-gestor-menu': management
		},
		data (){
			return {
				url: urlMenu
			}
		}
	}
</script>