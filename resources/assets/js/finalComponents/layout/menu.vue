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
				<menu-item v-for="itemenu in menu" :item="itemenu" :is-parent="hasChildren(itemenu.children)"></menu-item>
				
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
	methods: {
		hasChildren: function(nodo){
			if(typeof nodo === 'undefined')
				return false;
			return nodo.length>0;
		},
		loadMenu: function(){
			let self = this;
			self.$http.get(self.urlMenu).then(function(resp){
				console.log(resp.data);
				self.menu=resp.data.data;
			}, function(err){
				console.warn(err);
			});
		}
	},
	ready(){
		 this.loadMenu();
	},
	data(){
		return {
			urlMenu: 'api/menu',
			/*menu: [
				{
					iconClass: 'fa fa-dashboard',
					name: 'Dashboard',
					link: '/',
					children: []
				},
				{
					iconClass: 'fa fa-th-list',
					name: 'Menu',
					link: '/menu',
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
					{
						iconClass: 'fa fa-link',
						name: 'Otra version de pagineo',
						link: '/paginate',
						children: []
					},
					]
				},
				
			]*/
		}
	}
}

</script>