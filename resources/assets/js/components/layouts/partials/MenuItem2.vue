<template>
	<li v-link-active v-if="!isParent">
		<a v-link="{name:item.url, activeClass:'active'}"><i :class="item.iconClass"></i> {{item.name}}</a>
	</li>
	<li v-else class="treeview">
		<a href="#"><i :class='item.iconClass'></i> <span>{{item.name}}</span> <i class="fa fa-angle-left pull-right"></i></a>
		<ul class="treeview-menu">
			<crea-menu v-for="itemenu in item.children" :item="itemenu" :is-active="
			itemenu.active" :is-parent="itemenu.children.length>0" ></crea-menu>
		</ul>
	</li>
</template>

<script>

import MenuItem from './MenuItem.vue';

	module.exports = {
		components: {
			creaMenu: MenuItem
		},
		props:{
			item: {
				type: Object,
				required: true
			},
			isActive: {
				type: Boolean,
				required: true
			},
			isParent: {
				type: Boolean,
				required: true
			}
		}
	}

</script>