<template>
	<!-- Left side column. contains the logo and sidebar -->
	<aside class="main-sidebar">

		<!-- sidebar: style can be found in sidebar.less -->
		<section class="sidebar">
			<!--
			<div class="logo-panel">
				<img :src="logo" class="img-circle" alt="Logo Universidad Image" />
			</div>
			-->
			<div class="user-panel">
				<div class="pull-left image">
					<img :src="logo" class="img-circle" alt="Logo universidad" />
				</div>
				<div class="pull-left info">
					<p><small>UNIVERSIDAD DE GUAYAQUIL</small></p>
					<p>FCA - ISAC</p>
				</div>
			</div>
			<div class="sidebar-form logo-menu-title">
				<p class="text-center">Sistema de Distribución de Cargas Horarias</p>
			</div>

			<!-- Sidebar user panel (optional) -->
			<!--
			<div class="user-panel">
				<div class="pull-left image">
					<img :src="avatar" class="img-circle" alt="User Image" />
				</div>
				<div class="pull-left info">
					<p>{{ username }}</p>
					<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
				</div>
			</div>
			-->

			<!-- search form (Optional) -->
			<!--
			<form action="#" method="get" class="sidebar-form">
				<div class="input-group">
					<input type="text" name="q" class="form-control" placeholder="Search..."/>
					<span class="input-group-btn">
						<button type='submit' name='search' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
					</span>
				</div>
			</form>
			-->
			<!-- /.search form -->

			<!-- Sidebar Menu -->
			<ul class="sidebar-menu">
				<li class="header">Menú Principal</li>
				<menu-item v-for="itemenu in menu" :item="itemenu" :is-parent="hasChildren(itemenu.children)"></menu-item>
				
			</ul>
			
			<!-- /.sidebar-menu -->
		</section>
		<!-- /.sidebar -->
	</aside>

</template>

<style>
	.logo-panel{
		position: relative;
	}
	.logo-panel img{
		width: 100%;
	}
	.logo-menu-title{
	    background: #222d32;
	    color: #b8c7bf;
	    font-variant: small-caps;
	    font-weight: bold;
	    font-size: 1.2em;
	    border-radius: 0px !important;
	    border: 0px !important;
	    margin: 0px !important;
	}
	

	.user-panel > .image > img {
	    max-width: 50px !important;
	}
	.img-circle {
	    border-radius: 15% !important;
	    background: white !important;
	}
	
</style>

<script>

//configs
import fnc from '../../util/reusable_functions';


import MenuItem from '../reusable/menuItemLevel1.vue';

module.exports = {
	components: {
		menuItem: MenuItem
	},
	props: {
		username: {
			type: String,
			required:false,
			default: "Giancarlos Cercado"
		},
		avatar: {
			type: String,
			required:false,
			default: 'img/user2-160x160.jpg'
		},
		logo:{
			type: String,
			required: false,
			default: 'img/ug/icon-logo-without-letters-min.png'
		}
	},
	methods: {
		hasChildren: function(nodo){
			if(typeof nodo === 'undefined')
				return false;
			return nodo.length>0;
		}
	},
	ready(){
		let self = this;
		self.$http.get(self.urlMenu).then(function (resp) {
			self.menu = resp.data.data;
		}, fnc.tryError);
	},
	data(){
		return {
			urlMenu: 'api/menu?orderBy=orden&sorterBy=desc',
			menu: [
			{
				iconClass: 'fa fa-book',
				name: 'Materias',
				link: '/materias',
				children: []
			}
			]
		}
	}
}

</script>