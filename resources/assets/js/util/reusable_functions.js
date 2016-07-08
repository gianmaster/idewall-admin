
function myAlert(type, message){
	Lobibox.notify(type, {
		msg: message,
		sound: false
	});
}

export default {
    niceAlert: myAlert,
    tryError(err){
    	if (err.status == 401){
    		myAlert('error', 'Su sesión ha expirado, por favor vuelva a ingresar sus credenciales');
    	}else{
    		myAlert('error', 'Se ha presentado un error al tratar de traer los datos del sistema');
    	}
    	console.warn('Error al cargar los datos del componete ' + this.name ,err);
    	this.$router.go('/lockscreen');
    }
}
