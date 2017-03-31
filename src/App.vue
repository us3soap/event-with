<template>
<div class="app-viewport" id="app">
  <md-toolbar class="md-dense">
    <md-button v-show="user.uid" class="md-icon-button" @click.native="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title" style="flex: 1">Event-With</h2>

    <md-button @click.native="logout" v-show="user.uid" class="md-icon-button">
      <md-icon>power_settings_new</md-icon>
    </md-button>
  </md-toolbar>
  <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar class="md-medium">
      <div class="md-toolbar-container">
        <h3 class="md-title">
        <md-avatar class="md-large">
          <img v-bind:src="user.photoURL" alt="People">
        </md-avatar>
        {{user.displayName}}
       </h3>
      </div>
    </md-toolbar>
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Event-with</div>
        <div class="md-subhead">BETA</div>
      </md-card-header>

      <md-card-content>
        Un petit site fait rapidement pour permettre à tout le monde de trouver du monde pour jouer au squash...
        <br/>
        <br/>
        Si vous avez des idées d'amélioration ou que vous avez des soucis d'utilisations, n'hésitez pas à me contacter.  
      </md-card-content>

    </md-card>
  </md-sidenav>
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
import firebase from 'firebase'
import { firebaseConfig } from './configs'

firebase.initializeApp(firebaseConfig)

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
    logout: auth.logout,
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (ref) {
      console.log('Opened: ' + ref)
    },
    close (ref) {
      console.log('Closed: ' + ref)
    }
  }
}
</script>

<style>
  .bottom{
    bottom: 0;
    position: fixed;
    background-color: white;
    z-index: 5;
  }

  .fix-routes{
    margin-bottom: 50px;
  }

  .md-toolbar-container{
    margin: 10px 0;
  }
</style>
