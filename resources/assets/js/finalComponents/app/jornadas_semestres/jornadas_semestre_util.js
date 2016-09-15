import f from '../../../util/reusable_functions';

export default {

    sumarHorasMateria: function(idMat, horario){

        let total = '00:00';
        console.log(idMat, horario);

        for(let dia of horario){

            if(typeof dia.materias !== 'undefined'){

                for(let mat in dia.materias){

                    if(typeof mat.materia !== 'undefined'){

                        if(mat.materia == idMat){
                            if(materia.total){
                                total = f.sumarHoras(total, materia.total);
                            }
                        }

                    }
                }
            }

        }

        return total;

    }
    
}