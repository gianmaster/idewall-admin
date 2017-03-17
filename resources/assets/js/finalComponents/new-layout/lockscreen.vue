<template>
	<div class="lockscreen-logo">
		<a href="#"><i class="fa fa-lock fa-3x"></i><!--<b>Admin</b>LTE--></a>
	</div>
	<!-- User name -->
	<div class="lockscreen-name">{{name}}</div>

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
				<input type="password" class="form-control" placeholder="password" name="password" id="pass" required>
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

	var fnc = require('../../util/reusable_functions.js');

	export default {
		name: 'lockscreen',
		route: {
			data: function(transition){
				this.loadProfile();
				transition.next();
			}
		},
		methods: {
			retrieveLogin: function(){
				this.$http.post(this.urlLogin, {
					email: this.email,
					password: document.querySelector('#pass').value
				}).then(function(resp){
					fnc.niceAlert('success', 'Su sesión vuelve a estar activa');
					this.$router.go('/');
				}, fnc.tryError);
			},
			loadProfile: function(){
				const profile = this.$parent.$parent.profile;
				this.name = profile.name;
				this.email = profile.email;
				this.avatar = profile.avatar;
				this.name = profile.name;
			}
		},
		data(){
			return{
				name: 'Giancarlos Cercado',
				avatar: 'img/user2-160x160.jpg',
				email: 'giancarloscercado@gmail.com',
				urlLogin: 'login'
			}
		}
	}
</script>

