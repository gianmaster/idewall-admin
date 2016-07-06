<template>

	<div class="row">
		<div class="col-xs-12">
			<div class="error-page">
				<h2 class="headline text-yellow"> 404</h2>
				<div class="error-content">
					<h3><i class="fa fa-warning text-yellow"></i> Oops! Recurso no encontrado.</h3>
					<p>
						Página o recurso no encontrado
						Ir a la página de inicio <a v-link="{path: '/'}">Home</a> 
					</p>
					<form class='search-form' @submit="nothingToDoHere">
						<div class='input-group'>
							<input type="text" name="search" class='form-control' placeholder="Buscar..."/>
							<div class="input-group-btn">
								<button type="submit" name="submit" class="btn btn-warning btn-flat"><i class="fa fa-search"></i></button>
							</div>
						</div><!-- /.input-group -->
					</form>
				</div><!-- /.error-content -->
			</div><!-- /.error-page -->		
		</div>
	</div>
	
</template>


<script>
	
	export default {
		methods: {
			nothingToDoHere: function(){
				alert('Nothing to do here, go to Home');
			}
		}
	}

</script>