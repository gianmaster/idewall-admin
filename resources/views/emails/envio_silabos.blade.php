<body>
    <p>
        Saludos {{ $docente }}. Reciba un saludo de parte del sistema de asignación de cargas horarias.
    </p>
    <p>
        Se adjuntan los sílabos de las materias que debe impartir en el {{ $mensaje }}
    </p>
    <p>
        Para descargar una copia de su horario distributivo de click <a href="{{ Request::root() }}/reportes/cursos/{{$ciclo_docente}}/distributivo">aquí</a>.
    </p>
    <p>
        Muchas gracias,
    </p>
    <p>
        <small>Universidad de Guayaquil - ingenieria en Sistemas Administrativos Computarizados</small>
    </p>
</body>