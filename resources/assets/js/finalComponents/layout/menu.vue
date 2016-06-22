<template>
	<!-- Left side column. contains the logo and sidebar -->
	<aside class="main-sidebar">

		<!-- sidebar: style can be found in sidebar.less -->
		<section class="sidebar">

			<!-- Sidebar user panel (optional) -->
			<div class="user-panel">
				<div class="pull-left image">
					<img src="img/user2-160x160.jpg" class="img-circle" alt="User Image" />
				</div>
				<div class="pull-left info">
					<p>{{ username }}</p>
					<!-- Status -->
					<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
				</div>
			</div>

			<!-- search form (Optional) -->
			<form action="#" method="get" class="sidebar-form">
				<div class="input-group">
					<input type="text" name="q" class="form-control" placeholder="Search..."/>
					<span class="input-group-btn">
						<button type='submit' name='search' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
					</span>
				</div>
			</form>
			<!-- /.search form -->

			<!-- Sidebar Menu -->
			<ul class="sidebar-menu">
				<li class="header">MAIN NAVIGATION</li>
				<menu-item v-for="itemenu in menu" :item="itemenu" :is-parent="itemenu.children.length>0"></menu-item>
				<!--
				<li v-link-active><a v-link="{name:'home', activeClass:'active'}"><i class='fa fa-link'></i> <span>Dashboard</span></a></li>
				<li v-link-active><a v-link="{name: 'otro', activeClass:'active'}"><i class='fa fa-link'></i> <span>Opción 1</span></a></li>
				<li class="treeview">
					<a href="#"><i class='fa fa-link'></i> <span>Multiopción</span> <i class="fa fa-angle-left pull-right"></i></a>
					<ul class="treeview-menu">
						<li><a href="#level1">Subnivel 1</a></li>
						<li><a href="#level2">Subnivel 2</a></li>
					</ul>
				</li>
				-->
			</ul>
			
			<!-- /.sidebar-menu -->
		</section>
		<!-- /.sidebar -->
	</aside>

</template>

<script>

//configs
import MenuItem from '../reusable/menuItem.vue';

module.exports = {
	components: {
		menuItem: MenuItem
	},
	props: {
		username: {
			type: String,
			required:false,
			default: "Root User"
		}
	},
	data(){
		return {
			menu: [
				{
					iconClass: 'fa fa-dashboard',
					name: 'Dashboard',
					link: '/',
					children: []
				},
				{
					iconClass: 'fa fa-calendar',
					name: 'Usuarios',
					link: '#',
					children: [
					{
						iconClass: 'fa fa-link',
						name: 'Listado CRUD',
						link: '/usuarios',
						children: []
					},
					{
						iconClass: 'fa fa-link',
						name: 'Reportes',
						link: '/sdk',
						children: []
					},
					]
				},
				
			]
		}
	}
}

</script>