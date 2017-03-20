//job
//export const endpoint = 'http://localhost:8000/api';//'http://idewall.com/api'
//laptop
export const endpoint = 'api';//'http://idewall.com/api'

export const urlMe = `${endpoint}/me`;
export const urlCiclo = `${endpoint}/ciclo`;
export const urlCicloCierre = `${endpoint}/ciclo/cierre`;
export const urlCiclos = `${endpoint}/ciclos`;
export const urlDashboard = `${endpoint}/dashborad/{ciclo}`;
export const urlParalelosCiclo = `${endpoint}/catalogo/paralelos/ciclo/activo`;
//modulo usuarios
export const urlUsuarios = `${endpoint}/users`;
export const urlAvatar = `${endpoint}/avatar`;
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
export const urlExportDocentes = `${endpoint}/download/docentes`;
export const urlMateriasDocente = `${endpoint}/docentes/materias`;
export const urlCicloDocente = `${endpoint}/ciclo/param/docentes`;
export const urlListaMaterias = `${endpoint}/malla_academica/all`;
export const urlEliminaDocenteCiclo = `${endpoint}/ciclo/docente/{ciclodocente}`;

//jornada semestre
export const urlJornadaSemestre = `${endpoint}/jornadasemestre`;
//ciclo horario docente
export const urlcicloHorarioDocente = `${endpoint}/ciclohorariodocente`;
//horario docente
export const urlHorarioDocente = `${endpoint}/horariomateriasdocente`;
//reportes
export const urlCicloHorarioDocenteRpt = `${endpoint}/ciclohorariodocente/{ciclo}/ciclo`;
export const urlCicloJornadaSemestreRpt = `${endpoint}/jornadasemestre/{ciclo}/ciclo`;
// en excel
export const urlDownloadHorarioCurso = `${endpoint}/donwload/horarios/{ciclo}`;
export const urlDownloadDistributivos = `${endpoint}/donwload/distributivos/{ciclo}`;

//envio de silabos
export const urlEnvioSilabosDocente = `${endpoint}/silabos/envio/docente`;
export const urlEnvioTodosSilabosDocente = `${endpoint}/silabos/envio/docente/todos`;
export const urlDocentesDisponibles = `${endpoint}/docentes-disponibles`;

//modificacion de configuraciones de reportes
export const urlConfigReportes = `${endpoint}/config/reportes`;