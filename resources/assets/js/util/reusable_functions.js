
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
		console.log(err, 'entros');
		if (err.status == 401){
			myAlert('error', 'Su sesión ha expirado, por favor vuelva a ingresar sus credenciales');
			this.$router.go('/lockscreen');
		}
		else if (err.status == 403) {
			console.log(err.data.message);
			myAlert('warning', err.data.message);
		}
		else if (err.status == 302){
				console.log('Bad credentials');
				myAlert('warning', 'Credenciales Incorrectas');
		}else{
			console.log(err);
    		myAlert('error', 'Se ha presentado un error al tratar de traer los datos del sistema');
    	}

    },
	restarHoras(inicio, fin) {

		const inicioMinutos = parseInt(inicio.substr(3, 2));
		const inicioHoras = parseInt(inicio.substr(0, 2));

		const finMinutos = parseInt(fin.substr(3, 2));
		const finHoras = parseInt(fin.substr(0, 2));

		let transcurridoMinutos = finMinutos - inicioMinutos;
		let transcurridoHoras = finHoras - inicioHoras;

		if (transcurridoMinutos < 0) {
			transcurridoHoras--;
			transcurridoMinutos = 60 + transcurridoMinutos;
		}

		let horas = transcurridoHoras.toString();
		let minutos = transcurridoMinutos.toString();

		if (horas.length < 2) {
			horas = "0" + horas;
		}

		if (horas.length < 2) {
			horas = "0" + horas;
		}

		return horas+":"+minutos;

	},
	sumarHoras(inicio, fin) {

		const inicioMinutos = parseInt(inicio.substr(3, 2));
		const inicioHoras = parseInt(inicio.substr(0, 2));

		const finMinutos = parseInt(fin.substr(3, 2));
		const finHoras = parseInt(fin.substr(0, 2));

		let transcurridoMinutos = finMinutos + inicioMinutos;
		let transcurridoHoras = finHoras + inicioHoras;

		if (transcurridoMinutos > 59) {
			transcurridoHoras++;
			transcurridoMinutos = transcurridoMinutos - 60;
		}

		let horas = transcurridoHoras.toString();
		let minutos = transcurridoMinutos.toString();

		if (horas.length < 2) {
			horas = "0" + horas;
		}

		if (minutos.length < 2) {
			horas = "0" + minutos;
		}

		return horas+":"+minutos;

	}
	
}
