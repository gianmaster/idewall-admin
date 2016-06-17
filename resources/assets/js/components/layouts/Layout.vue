<template>
	<main-header :username.sync="user" :auth.sync="authorization"></main-header>
	<sidebar :username.sync="user" :auth.sync="authorization"></sidebar>

	<div class="content-wrapper">
		<content-header></content-header>
		<!-- Main content -->
        <section class="content">
            <!-- Your Page Content Here -->
            <router-view></router-view><!-- router del vue.js -->
        </section><!-- /.content -->
	</div>

	<sidebar-control></sidebar-control>

	<main-footer :made-date.sync="fecha_creacion_sitio"></main-footer>

</template>

<script>

import MainHeader from './partials/MainHeader.vue';
import Sidebar from './partials/Sidebar.vue';
import HeaderContent from './partials/HeaderContent.vue';
import ControlSidebar from './partials/ControlSidebar.vue';
import Footer from './partials/Footer.vue';



module.exports = {
	components: {
		mainHeader: MainHeader,
		sidebar: Sidebar,
		contentHeader: HeaderContent,
		sidebarControl: ControlSidebar,
		mainFooter: Footer
	},

	data(){
		return{
			authorization: true,
			user: "Giancarlos Cercado",
			fecha_creacion_sitio: 2015
		}
	}

}
	
</script>