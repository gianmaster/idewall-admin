export default {

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

        if (horas.length < 2) {
            horas = "0" + horas;
        }

        return horas+":"+minutos;

    }
}