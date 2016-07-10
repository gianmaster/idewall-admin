
function myAlert(type, message){
	if(typeof message === 'object'){
		for(var elem in message) {
			message[elem].forEach(function (item) {
				Lobibox.notify(type, {
					msg: item,
					sound: false
				});
			});
		}
	}else{
		Lobibox.notify(type, {
			msg: message,
			sound: false
		});
	}

}

export default {
    niceAlert: myAlert,
    tryError(err){
		if (err.status == 401){
			myAlert('error', 'Su sesión ha expirado, por favor vuelva a ingresar sus credenciales');
			this.$router.go('/lockscreen');
		}
		else if (err.status == 403){
			console.log(err.data.message);
			myAlert('warning', err.data.message);
		}else{
    		myAlert('error', 'Se ha presentado un error al tratar de traer los datos del sistema');
    	}

    }
}
