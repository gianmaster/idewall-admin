module.exports = 
[
  {
    iconClass: 'fa fa-dashboard',
    name: 'Dashboard',
    link: '/',
    children: []
  },
  {
    iconClass: 'fa fa-calendar',
    name: 'Usuarios',
    link: '#',
    children: [
    {
      iconClass: 'fa fa-link',
      name: 'Listado CRUD',
      link: '/usuarios',
      children: []
    },
    {
      iconClass: 'fa fa-link',
      name: 'Reportes',
      link: '/sdk',
      children: []
    },
    ]
  },

]