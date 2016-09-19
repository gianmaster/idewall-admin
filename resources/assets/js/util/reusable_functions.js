
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
	/**
	 * Resta 2 fechas en cadena de texto con el siguiente formato HH:mm
	 * @param inicio
	 * @param fin
	 * @returns {string}
     */
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

		if (minutos.length < 2) {
			minutos = "0" + minutos;
		}

		return horas+":"+minutos;

	},
	/**
	 * Suma 2 fechas en cadena con el siguiente formato HH:mm
	 * @param inicio
	 * @param fin
	 * @returns {string}
     */
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
			minutos = "0" + minutos;
		}

		return horas+":"+minutos;

	},
	/**
	 * Retorna la diferencia de entre 2 horas en una cadena de texto en los formatos HH:mm o HHhmm
	 * @param ini
	 * @param fin
	 * @returns {number}
     */
	difHoras(ini, fin){
		const horaIni = parseInt(ini.substr(0,2));
		const horaFin = parseInt(fin.substr(0,2));
		const minutoIni = parseInt(ini.substr(3,2));
		const minutoFin = parseInt(fin.substr(3,2));
		return (horaFin-horaIni) + (minutoFin-minutoIni === 0 ? 0 : 0.5);
	},
	/**
	 * Retorna en decimal el equivalente a una hora en formato 00:30
	 * @param hora
	 * @returns {number}
     */
	horaCharToNum(hora){
		return parseInt(hora.substr(0, 2)) + (parseInt(hora.substr(3, 2)) == 0 ? 0 :  0.5);
	},
	/**
	 * 
	 * @param val
	 * @returns {string}
     */
	decimalToHoraStr(val){
		if(val === null) return '0:00';
		const hora = parseInt(val.split('.')[0]);
		const minutos = parseInt(val.split('.')[1]) == 0 ? '00' : '30';
		return (hora + ':' + minutos);
	},
	/**
	 * retorna un array con 2 valores numericos que corresponde a un rango
	 * @param ini
	 * @param fin
	 * @returns {*[]}
     */
	generaRangoHora(ini, fin){
		let hIni = parseInt(ini.substr(0,2));
		let hFin = parseInt(fin.substr(0,2))+1;
		return [hIni, hFin];
	}

	
}
