export const endpoint = 'http://ug_laravel_vue.dev/api';//'http://idewall.com/api';

//dashboard
export const urlMe = `${endpoint}/me`;
export const urlCiclo = `${endpoint}/ciclo`;
export const urlCiclos = `${endpoint}/ciclos`;
export const urlDashboard = `${endpoint}/dashborad/{ciclo}`;
//modulo usuarios
export const urlUsuarios = `${endpoint}/users`;
//rol
export const urlRoles = `${endpoint}/rol`;
//menu
export const urlMenu = `${endpoint}/menu`;
export const urlMenuList = `${endpoint}/menu-list`;
//catalogos
export const urlCatalogos = `${endpoint}/catalogos`;
//catalogo item
export const urlCatalogoItem = `${endpoint}/catalogos/REPLACEME/items`;
export const urlListaItems = `${endpoint}/catalogos-list`;
//tipos distributivos
export const urlTiposDistri = `${endpoint}/tiposdistributivo`;
//malla academica
export const urlMalla = `${endpoint}/malla_academica`;
//docentes
export const urlDocentes = `${endpoint}/docentes`;
export const urlMateriasDocente = `${endpoint}/docentes/materias`;
export const urlCicloDocente = `${endpoint}/ciclo/param/docentes`;
export const urlListaMaterias = `${endpoint}/malla_academica/all`;

//jornada semestre
export const urlJornadaSemestre = `${endpoint}/jornadasemestre`;
//ciclo horario docente
export const urlcicloHorarioDocente = `${endpoint}/ciclohorariodocente`;
//horario docente
export const urlHorarioDocente = `${endpoint}/horariomateriasdocente`;
//reportes
export const urlCicloHorarioDocenteRpt = `${endpoint}/ciclohorariodocente/{ciclo}/ciclo`;
export const urlCicloJornadaSemestreRpt = `${endpoint}/jornadasemestre/{ciclo}/ciclo`;
