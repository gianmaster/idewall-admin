<template>

  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>Alexander Pierce</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">MAIN NAVIGATION</li>
        <menu-item v-for="itemenu in menu" :item="itemenu" :is-active="itemenu.active" :is-parent="itemenu.children.length>0"></menu-item>

      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
  
</template>

<script>

import MenuItem from '../../components/layouts/partials/MenuItem.vue';

  module.exports = {
    name: 'Menu',
    components: {
      'menu-item' : MenuItem
    },
    data: function(){
      return {
        menu: [
        {
          iconClass: 'fa fa-dashboard',
          name: 'Home',
          url: '/',
          active: false,
          children: []
        },
        {
          iconClass: 'fa fa-cogs',
          name: 'Configuraciones',
          url: '/condif',
          active: false,
          children: []
        },
        {
          iconClass: 'fa fa-calendar',
          name: 'Reportes',
          url: '/',
          active: true,
          children: [
          {
            iconClass: 'fa fa-link',
            name: 'Mensuales',
            url: '/new',
            active: false,
            children: []
          },
          {
            iconClass: 'fa fa-link',
            name: 'Sucursales',
            url: '/list',
            active: true,
            children: []
          },
          ]
        },
        
      ]
      }
    }
  }
</script>