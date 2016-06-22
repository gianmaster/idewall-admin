<template>
	<li v-link-active v-if="!isParent">
		<a v-link="{path:item.link, activeClass:'active'}"><i :class="item.iconClass"></i> <span>{{item.name}}</span></a>
	</li>
	<li v-else class="treeview">
		<a href="#"><i :class='item.iconClass'></i> <span>{{item.name}}</span> <i class="fa fa-angle-left pull-right"></i></a>
		<ul class="treeview-menu">
			<crea-menu v-for="itemenu in item.children" :item="itemenu"  :is-parent="itemenu.children.length>0" ></crea-menu>
		</ul>
	</li>
</template>

<script>

import MenuItem from './crossMenuItem.vue';

	module.exports = {
		components: {
			creaMenu: MenuItem
		},
		props:{
			item: {
				type: Object,
				required: true
			},
			isParent: {
				type: Boolean,
				required: true
			}
		}
	}

</script>