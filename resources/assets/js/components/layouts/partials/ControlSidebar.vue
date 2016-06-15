<template>
	<!-- Control Sidebar -->
	<aside class="control-sidebar control-sidebar-dark">
		<!-- Create the tabs -->
		<ul class="nav nav-tabs nav-justified control-sidebar-tabs">
			<li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
			<li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
		</ul>
		<!-- Tab panes -->
		<div class="tab-content">
			<!-- Home tab content -->
			<div class="tab-pane active" id="control-sidebar-home-tab">
			<h3 class="control-sidebar-heading">Actividad reciente</h3>
				<ul class='control-sidebar-menu'>
					<li>
						<a href='javascript::;'>
							<i class="menu-icon fa fa-birthday-cake bg-red"></i>
							<div class="menu-info">
								<h4 class="control-sidebar-subheading">Cumpleaños</h4>
								<p>01-07-1990</p>
							</div>
						</a>
					</li>
				</ul><!-- /.control-sidebar-menu -->

				<h3 class="control-sidebar-heading">Progreso</h3>
				<ul class='control-sidebar-menu'>
					<li>
						<a href='javascript::;'>
							<h4 class="control-sidebar-subheading">
								Custom Template
								<span class="label label-danger pull-right">70%</span>
							</h4>
							<div class="progress progress-xxs">
								<div class="progress-bar progress-bar-danger" style="width: 70%"></div>
							</div>
						</a>
					</li>
				</ul><!-- /.control-sidebar-menu -->

			</div><!-- /.tab-pane -->
			<!-- Stats tab content -->
			<div class="tab-pane" id="control-sidebar-stats-tab">Status</div><!-- /.tab-pane -->
			<!-- Settings tab content -->
			<div class="tab-pane" id="control-sidebar-settings-tab">
				<form method="post">
					<h3 class="control-sidebar-heading">Ajustes Generales</h3>
					<div class="form-group">
						<label class="control-sidebar-subheading">
							Panel de reporte
							<input type="checkbox" class="pull-right" />
						</label>
						<p>
							Ajustes de información
						</p>
					</div><!-- /.form-group -->
				</form>
			</div><!-- /.tab-pane -->
		</div>
</aside><!-- /.control-sidebar

<!-- Add the sidebar's background. This div must be placed
	immediately after the control sidebar -->
	<div class='control-sidebar-bg'></div>
</template>

<script>
	
	

</script>