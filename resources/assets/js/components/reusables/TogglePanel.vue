<template>
	<div class="box box-default">
		<div class="box-header with-border">
			<h3 class="box-title"><slot name="title"></slot></h3>
			<div class="box-tools pull-right">
				<button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Expandir"><i class="fa fa-minus"></i></button>
				<button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Cerrar"><i class="fa fa-times"></i></button>
			</div><!-- /.box-tools -->
		</div><!-- /.box-header -->
		<div class="box-body">
			<slot name="body"></slot>
		</div><!-- /.box-body -->
	</div><!-- /.box -->
</template>


<script>
	
	module.exports = {
		props: {
			remove: {
				type: Boolean,
				required: false,
				default: false
			}
		}
	}

</script>

