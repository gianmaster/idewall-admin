<template>
	<div id="menu-content">
		<p>{{caption}}</p>
		<ul class="tree">
			<li v-for="item in data"><strong>{{item.name}}</strong> - <i class="fa fa-pencil edit-option" data-toggle="tooltip" title="Editar"></i> - <i class="fa fa-trash delete-option" data-toggle="tooltip" title="Eliminar"></i>
				<ul v-if="item.children.length>0">
					<li v-for="it in item.children">{{it.name}} - <i class="fa fa-pencil edit-option" data-toggle="tooltip" title="Editar"></i> - <i class="fa fa-trash delete-option" data-toggle="tooltip" title="Eliminar"></i></li>
				</ul>
			</li>
			
		</ul>
	</div>
</template>

<style>
	#menu-content {
		background:white;
		font:normal normal 13px/1.4 Segoe,"Segoe UI",Calibri,Helmet,FreeSans,Sans-Serif;
		padding:50px;
	}


/**
 * Framework starts from here ...
 * ------------------------------
 */

 .tree,
 .tree ul {
 	margin:0 0 0 1em; /* indentation */
 	padding:0;
 	list-style:none;
 	color:#369;
 	position:relative;
 }

 .tree ul {margin-left:.5em} /* (indentation/2) */

 .tree:before,
 .tree ul:before {
 	content:"";
 	display:block;
 	width:0;
 	position:absolute;
 	top:0;
 	bottom:0;
 	left:0;
 	border-left:1px solid;
 }

 .tree li {
 	margin:0;
 	padding:0 1.5em; /* indentation + .5em */
 	line-height:2em; /* default list item's `line-height` */
 	position:relative;
 }

 .tree li:before {
 	content:"";
 	display:block;
 	width:10px; /* same with indentation */
 	height:0;
 	border-top:1px solid;
 	margin-top:-1px; /* border top width */
 	position:absolute;
 	top:1em; /* (line-height/2) */
 	left:0;
 }

 .tree li:last-child:before {
 	background:white; /* same with body background */
 	height:auto;
 	top:1em; /* (line-height/2) */
 	bottom:0;
 }

 .edit-option, .delete-option{
 	color: #336699;
 }
 .edit-option:hover{
 	cursor: pointer;
 	color: orange;
 }

 .delete-option:hover{
 	cursor: pointer;
 	color: red;
 }
</style>

<script>
	
export default {
	ready: function(){
		let self = this;
		self.$http.get(self.url).then(function(resp){
			self.data = resp.data.data;
		}, function(err){
			console.warn(err);
		});
	},

	name: 'management-menu',
	props: {
		caption: {
			type: String,
			required: false,
			default : ''
		},
		url: {
			type: String,
			required: false,
			default: '/admin_lte/public/api/menu',
		},
		data: {
			type: Array,
			required: false,
			default: function(){
				return [];
			}
		}
	},
}

</script>