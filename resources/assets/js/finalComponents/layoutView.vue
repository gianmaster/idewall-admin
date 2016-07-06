<template>
  <div v-if="login">
    <app-header></app-header>
    <app-menu></app-menu>
    <app-content :title="title"></app-content>
    <app-control></app-control>
    <app-footer></app-footer>
  </div>

</template>

<script>

  var menu = require('../config/menus.js');

  module.exports = {
    name : 'Layout',
    data: function(){
      return {
        title: null,
        login: true,
        body_class: "hold-transition skin-blue sidebar-mini fixed", 
        menus: menu || [] //esto deberia ser cargado una vez logoneado
      }
    },
    replace: false,
    components: {
      'app-header' : require('./new-layout/header.vue'),
      'app-menu': require('./new-layout/menu.vue'),
      'app-content': require('./new-layout/content.vue'),
      'app-control': require('./new-layout/control.vue'),
      'app-footer': require('./new-layout/footer.vue'),
    }
  }
  
</script>