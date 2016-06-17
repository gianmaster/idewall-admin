<template>
	<content-header></content-header>
		<!-- Main content -->
        <section class="content">
            <!-- Your Page Content Here -->
            <slot></slot>
        </section><!-- /.content -->
</template>


<script>

export default{
	props:{
		title_page: {
			type: String,
			required: false,
			default: "DashBoard"
		},
		page_description: {
			type: String,
			required: false,
			default: ""
		},
		breadcrumb: {
			type: Array,
			required: false, 
			default: function(){
				return [
					{
						url: '#',
						name: 'Home',
						iconFont: 'fa fa-dashboard',
						active: false,
					}
				]
			}
		}
	}
}
	
</script>