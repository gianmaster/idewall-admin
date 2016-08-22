<?php

use Illuminate\Database\Seeder;

use App\Entities\Ciclo;
use App\Entities\JornadasSemestre;

class JornadaSemestreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Por defecto asigno 8 semestres con la jornada nocturna
        $ciclo = Ciclo::where('estado', 'VIGENTE')->first();

        JornadasSemestre::create([
            'ciclo'             => $ciclo->id,
            'catalogo_semestre' => 'SEM1',
            'catalogo_aula'     => 'A56',
            'catalogo_jornada'  => 'NOC',
        ]);

        JornadasSemestre::create([
            'ciclo'             => $ciclo->id,
            'catalogo_semestre' => 'SEM2',
            'catalogo_aula'     => 'A56',
            'catalogo_jornada'  => 'NOC',
        ]);

        JornadasSemestre::create([
            'ciclo'             => $ciclo->id,
            'catalogo_semestre' => 'SEM3',
            'catalogo_aula'     => 'A56',
            'catalogo_jornada'  => 'NOC',
        ]);

        JornadasSemestre::create([
            'ciclo'             => $ciclo->id,
            'catalogo_semestre' => 'SEM4',
            'catalogo_aula'     => 'A56',
            'catalogo_jornada'  => 'NOC',
        ]);


        JornadasSemestre::create([
            'ciclo'             => $ciclo->id,
            'catalogo_semestre' => 'SEM5',
            'catalogo_aula'     => 'A56',
            'catalogo_jornada'  => 'NOC',
        ]);

        JornadasSemestre::create([
            'ciclo'             => $ciclo->id,
            'catalogo_semestre' => 'SEM6',
            'catalogo_aula'     => 'A56',
            'catalogo_jornada'  => 'NOC',
        ]);

        JornadasSemestre::create([
            'ciclo'             => $ciclo->id,
            'catalogo_semestre' => 'SEM7',
            'catalogo_aula'     => 'A56',
            'catalogo_jornada'  => 'NOC',
        ]);

        JornadasSemestre::create([
            'ciclo'             => $ciclo->id,
            'catalogo_semestre' => 'SEM8',
            'catalogo_aula'     => 'A56',
            'catalogo_jornada'  => 'NOC',
        ]);
    }
}
