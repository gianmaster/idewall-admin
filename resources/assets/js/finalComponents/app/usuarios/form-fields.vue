<template>

	<div class="col-xs-12 col-sm-4 col-md-3" v-if="!createMode">
		<img :src="dataModel.avatar" class="profile-ima-edit" alt="Responsive image">
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Nombre Completo</label>
		<input type="text" class="form-control" v-model="dataModel.name" minlength="3" required>
		<input type="hidden" class="form-control" :value="dataModel.id">
	</div>

	<div class="col-sm-6 col-xs-12" v-if="createMode">
		<label>Contraseña</label>
		<input type="text" class="form-control" v-model="dataModel.password" minlength="3">
		<span class="text-primary"><small>Solo llenarlo en necesita reestablecer la contraseña</small></span>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Correo Electrónico</label>
		<input type="email" class="form-control" v-model="dataModel.email" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>URL Avatar</label>
		<input type="url" class="form-control" placeholder="http://igmbur.com/user/profile.png" v-model="dataModel.avatar">
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Rol de acceso</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.rol" value-key="id" label-key="name" url="api/rol" :is-required="true"></select-list>
	</div>

	<div class="col-sm-6 col-xs-12">
		<b></b><b></b><b></b>
		<strong>Estado Usuario</strong>
		<div class="checkbox">
			<label>
				<input type="checkbox" v-model="dataModel.state" :true-value="byTrue" :false-value="byFalse"> Activo
			</label>
		</div>
	</div>

	<div class="col-xs-12">
		<div class="content">
			<button v-if="createMode" class="btn btn-success btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR</button>
			<button v-else class="btn btn-warning btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>
			<a v-link="{path: '/usuarios'}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> VOLVER</a>
		</div>

	</div>
</template>

<style>
	.profile-ima-edit{
		width: 200px;
		height: 200px;
		border-radius: 50%;
		margin-right: 10px;
		margin-top: -2px;
	}
</style>

<script>

	import selectList from '../../reusable/select-list.vue';

	export default {
		beforeCompile(){
			if (this.createMode){
				this.dataModel = this.initModel();
			}else{
				this.dataModel.password = '';
			}
		},
		components: {
			'select-list': selectList
		},
		data(){
			return {
				byFalse: 'INACTIVO',
				byTrue: 'ACTIVO'
			}
		},
		methods: {
			initModel: function(){
				return {
					name: null,
					email: null,
					password: null,
					id: null,
					state: null,
					rol: null,
					avatar: null
				}
			},
		},
		props: {
			createMode: {
				type: Boolean,
				required: false,
				default: true
			},
			dataModel: {
				type: Object,
				required: false,
				default: function(){
					return {
						name: null,
						email: null,
						password: null,
						id: null,
						state: null,
						rol: null,
						avatar: null
					}
				}
			}
		}
	}
	
</script>
