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
        body_class: "skin-blue sidebar-mini fixed",
        menus: menu || [] //esto deberia ser cargado una vez logoneado
      }
    },
    replace: false,
    components: {
      'app-header' : require('./layout/header.vue'),
      'app-menu': require('./layout/menu.vue'),
      'app-content': require('./layout/content.vue'),
      'app-control': require('./layout/control.vue'),
      'app-footer': require('./layout/footer.vue'),
    }
  }
  
</script>