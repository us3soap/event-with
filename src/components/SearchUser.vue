<template>
  <div class="phone-viewport">
<md-list>

    <md-snackbar md-position="top center" ref="snackbar" md-duration="4000">
      <span>{{msg}}</span>
    </md-snackbar>

    <md-list-item>
      <md-input-container>
        <label>Saisissez le nom ou prénom de la personne recherchée</label>
        <md-input v-model="search" placeholder="Rechercher"></md-input>
      </md-input-container>

      <md-divider class="md-inset"></md-divider>
    </md-list-item>
      <md-list-item v-for="user in filterUser">
        <md-avatar>
          <img :src="user.photoURL" :alt="user.displayName">
        </md-avatar>

        <span>{{user.displayName}}</span>

        <md-button class="md-icon-button md-list-action">
          <md-icon @click.native="addRelation(user.uid, user.displayName)" class="md-primary">add</md-icon>
        </md-button>
      </md-list-item>
  </md-list>
  </div>
</template>

<script>
import firebase from 'firebase'
import auth from '../services/firebaseService'
import moment from 'moment'

let usersRef = firebase.database().ref('users')
let relationsRef = firebase.database().ref('relations')

export default {
  name: 'searchUser',
  data () {
    return {
      search: '',
      owner: auth.getUser(),
      msg: ''
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
          if (this.relations.length > 0) {
            let isContains = false
            for (let k = 0, m = this.relations.length; k < m; k++) {
              if (this.relations[k].relation.includes(this.owner.uid) && this.relations[k].relation.includes(this.users[i].uid)) {
                isContains = true
              }
            }
            if (!isContains) {
              result.push(this.users[i])
            }
          } else {
            result.push(this.users[i])
          }
        }
      }
      return result.sort(function (a, b) {
        return a.displayName - b.displayName
      })
    }
  },
  methods: {
    addRelation: function (key, name) {
      let relation = {
        createdBy: this.owner,
        created: moment().format(),
        relation: [this.owner.uid, key],
        status: 0
      }
      relationsRef.push(relation)
      this.msg = 'Une demande vient d\'être envoyée à ' + name
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
