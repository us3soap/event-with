<template>
<div class="app-viewport" id="app">
  <md-toolbar class="md-dense">
    <md-icon>date_range</md-icon>

    <h2 class="md-title" style="flex: 1">Event-With</h2>

    <button v-show="user.uid" @click="logout" class="md-icon-button">
      <md-icon>power_settings_new</md-icon>
    </button>
  </md-toolbar>
  <div class="login" v-show="!user.uid">
    <div id="firebaseui-auth-container"></div>
  </div>
  <router-view class="fix-routes" v-show="user.uid"></router-view>
  <md-bottom-bar v-show="user.uid" @change="navigate" class="bottom">
    <md-bottom-bar-item md-icon="dashboard" md-active>Accueil</md-bottom-bar-item>
    <md-bottom-bar-item md-icon="search">Rechercher</md-bottom-bar-item>
    <md-bottom-bar-item md-icon="note_add">Ajouter</md-bottom-bar-item>
  </md-bottom-bar>
</div>
</template>

<script>
import auth from './services/firebaseService'
const user = auth.getUser()

export default {
  name: 'app',
  data: function () {
    return {
      user
    }
  },
  methods: {
    navigate: function (event) {
      switch (event) {
        case 1:
          this.$router.push('/event/available')
          break
        case 2:
          this.$router.push('/event/new')
          break
        default:
          this.$router.push('/')
      }
    },
    logout: auth.logout
  }
}
</script>

<style>
  .bottom{
    bottom: 0;
    position: fixed;
    background-color: white;
    z-index: 10;
  }

  .fix-routes{
    margin-bottom: 50px;
  }
</style>
