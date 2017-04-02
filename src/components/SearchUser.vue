<template>
  <div class="phone-viewport">
<md-list>

    <md-list-item>
      <md-input-container>
        <label>Saisissez le nom ou prénom de la personne recherchée</label>
        <md-input v-model="search" placeholder="Rechercher"></md-input>
      </md-input-container>

      <md-divider class="md-inset"></md-divider>
    </md-list-item>
    <transition name="fade">
      <md-list-item v-for="user in filterUser">
        <md-avatar>
          <img :src="user.photoURL" :alt="user.displayName">
        </md-avatar>

        <span>{{user.displayName}}</span>

        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">add</md-icon>
        </md-button>
      </md-list-item>
    </transition>
  </md-list>
  </div>
</template>

<script>
import firebase from 'firebase'
import auth from '../services/firebaseService'

let usersRef = firebase.database().ref('users')

export default {
  name: 'searchUser',
  data () {
    return {
      search: '',
      owner: auth.getUser()
    }
  },
  firebase: {
    users: usersRef
  },
  computed: {
    filterUser: function () {
      var result = []
      for (var i = 0, l = this.users.length; i < l; i++) {
        if (this.users[i].displayName.includes(this.search) && this.users[i].uid !== this.owner.uid) {
          result.push(this.users[i])
        }
      }
      return result.sort(function (a, b) {
        return a.displayName - b.displayName
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0
    }
</style>
