<template>
  <div class="phone-viewport">
<md-list>

    <md-snackbar md-position="top center" ref="snackbar" md-duration="4000">
      <span>{{msg}}</span>
    </md-snackbar>

    <md-subheader v-if="invitation">Demande en attente</md-subheader>
    <transition name="fade">

      <md-list-item v-for="user in filterUserWaiting">
        <md-avatar>
          <img :src="user.photoURL" :alt="user.displayName">
        </md-avatar>

        <span>{{user.displayName}}</span>

        <md-button class="md-icon-button md-list-action">
          <md-icon @click.native="confirmRelation(user.relation['.key'], user.displayName)" class="md-primary">check</md-icon>
        </md-button>
                <md-button class="md-icon-button md-list-action">
          <md-icon @click.native="unconfirmRelation(user.relation['.key'], user.displayName)" class="md-primary">clear</md-icon>
        </md-button>
      </md-list-item>
    </transition>

    <md-subheader>Mes amis</md-subheader>
    <transition name="fade">
      <md-list-item v-for="user in filterUser">
        <md-avatar>
          <img :src="user.photoURL" :alt="user.displayName">
        </md-avatar>

        <span>{{user.displayName}}</span>

        <md-button class="md-icon-button md-list-action">
          <md-icon @click.native="deleteRelation(user.relation['.key'], user.displayName)" class="md-primary">block</md-icon>
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
let relationsRef = firebase.database().ref('relations')

export default {
  name: 'relation',
  data () {
    return {
      search: '',
      owner: auth.getUser(),
      msg: '',
      invitation: false
    }
  },
  firebase: {
    users: usersRef,
    relations: relationsRef
  },
  computed: {
    filterUser: function () {
      let result = []

      for (let i = 0, l = this.users.length; i < l; i++) {
        if (this.users[i].displayName.includes(this.search) && this.users[i].uid !== this.owner.uid) {
          for (let k = 0, m = this.relations.length; k < m; k++) {
            if (this.relations[k].relation.includes(this.owner.uid) && this.relations[k].relation.includes(this.users[i].uid) && this.relations[k].status === 1) {
              this.users[i].relation = this.relations[k]
              result.push(this.users[i])
            }
          }
        }
      }
      return result.sort(function (a, b) {
        return a.displayName - b.displayName
      })
    },
    filterUserWaiting: function () {
      let result = []

      for (let i = 0, l = this.users.length; i < l; i++) {
        if (this.users[i].displayName.includes(this.search) && this.users[i].uid !== this.owner.uid) {
          for (let k = 0, m = this.relations.length; k < m; k++) {
            if (this.relations[k].relation.includes(this.owner.uid) && this.relations[k].relation.includes(this.users[i].uid) && this.relations[k].status === 0) {
              this.users[i].relation = this.relations[k]
              result.push(this.users[i])
            }
          }
        }
      }

      if (result.length > 0) {
        this.invitation = true
      } else {
        this.invitation = false
      }

      return result.sort(function (a, b) {
        return a.displayName - b.displayName
      })
    }
  },
  methods: {
    confirmRelation: function (key, name) {
      relationsRef.child(key).child('status').set(1)
      this.msg = 'Vous êtes maintenant ami avec ' + name
      this.$refs.snackbar.open()
    },
    unconfirmRelation: function (key, name) {
      relationsRef.child(key).remove()
      this.msg = 'Vous avez refusé l\'invitation de ' + name
      this.$refs.snackbar.open()
    },
    deleteRelation: function (key, name) {
      relationsRef.child(key).remove()
      this.msg = 'Vous ne suivez plus les évènements de ' + name
      this.$refs.snackbar.open()
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
