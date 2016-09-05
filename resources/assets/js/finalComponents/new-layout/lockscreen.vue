<template>
	<div class="lockscreen-logo">
		<a href="#"><i class="fa fa-lock fa-3x"></i><!--<b>Admin</b>LTE</a>-->
	</div>
	<!-- User name -->
	<div class="lockscreen-name">Giancarlos Cercado</div>

	<!-- START LOCK SCREEN ITEM -->
	<div class="lockscreen-item">
		<!-- lockscreen image -->
		<div class="lockscreen-image">
			<img :src="avatar" alt="User Image">
		</div>
		<!-- /.lockscreen-image -->

		<!-- lockscreen credentials (contains the form) -->
		<form class="lockscreen-credentials" @submit.prevent="retrieveLogin">
			<div class="input-group">
				<input type="password" class="form-control" placeholder="password">

				<div class="input-group-btn">
					<button type="submit" class="btn"><i class="fa fa-arrow-right text-muted"></i></button>
				</div>
			</div>
		</form>
		<!-- /.lockscreen credentials -->

	</div>
	<!-- /.lockscreen-item -->
	<div class="help-block text-center">
		Ingresa tu contraseña para recuperar tu sesión
	</div>
	<div class="help-block text-center">
		Ó
	</div>
	<div class="text-center">
		<a href="login">Ingresa con otra cuenta de usuario</a>
	</div>
	<!--
	<div class="lockscreen-footer text-center">
		Copyright © 2016 <b><a href="http://giancarloscercado.com" class="text-black">Giancarlos Cercado</a></b><br>
		All rights reserved
	</div>
	-->
</template>

<style>
	.lockscreen-name{
		text-align: center;
    	font-weight: 600;
	}
	.lockscreen-logo{
		margin-top: 25px;
	}

</style>

<script>
	export default {
		name: 'lockscreen',
		methods: {
			retrieveLogin: function(){
				alert('Recuperando tu sesion');
			}
		},
		data(){
			return{
				avatar: 'img/user2-160x160.jpg'
			}
		}
	}
</script>

