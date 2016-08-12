<template>
  <div v-if="login">
    <app-header :username.sync="profile.name" :avatar.sync="profile.avatar" :from-date.sync="fromDate"></app-header>
    <app-menu :username.sync="profile.name" :avatar.sync="profile.avatar"></app-menu>
    <app-content :title="title"></app-content>
    <app-control></app-control>
    <app-footer></app-footer>
  </div>

</template>

<script>

  var menu = require('../config/menus.js');

  var fnc = require('../util/reusable_functions.js');

  module.exports = {
    name : 'Layout',
    ready(){
      this.loadProfile();
    },
    methods: {
      loadProfile: function(){
        this.$http.get('api/me').then(function(resp){
          this.profile = resp.data;
        }, fnc.tryError);
      }
    },
    computed: {
      fromDate: function(){
        if(this.profile.created_at){
          return this.profile.created_at.substr(0, 10);
        }
        return this.profile.created_at;
      }
    },
    data: function(){
      return {
        title: null,
        profile: {
          name: 'Root',
          avatar: 'img/user2-160x160.jpg',
          rol: 0,
          email: 'root@root.com',
          created_at: 'Ago. 2016'
        },
        login: true,
        body_class: "sidebar-mini skin-blue fixed",
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