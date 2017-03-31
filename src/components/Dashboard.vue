<template>
  <div class="phone-viewport">
      <md-progress v-if="loading" md-indeterminate></md-progress>

      <md-snackbar md-position="top center" ref="snackbar" md-duration="4000">
       <span>L'évènement a bien été annulé.</span>
      </md-snackbar>
      
      <md-list class="custom-list md-triple-line">

        <md-subheader>Mes réservations</md-subheader>

        <md-list-item v-for="event in filterEvents" :key="event.activity">
          <md-avatar>
            <img v-bind:src="event.createdBy.photoURL" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{event.createdBy.displayName}}</span>
            <span v-if="event.concurrent">{{event.concurrent.displayName}}</span>
            <span v-if="! event.concurrent">En attente d'un partenaire</span>
            <p>
              Le {{event.date}} de {{event.begin}} à {{event.end}} 
            </p>
          </div>

          <md-button @click.native="deleteEvent(event['.key'])" class="md-icon-button md-list-action">
            <md-icon class="md-primary">delete</md-icon>
          </md-button>

          <md-divider class="md-inset"></md-divider>
        </md-list-item>
      </md-list>
  </div>
</template>

<script>
import firebase from 'firebase'
import auth from '../services/firebaseService'
import moment from 'moment'

let eventsRef = firebase.database().ref('events')

export default {
  name: 'dashboard',
  firebase: {
    events: eventsRef
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    filterEvents: function () {
      var result = []
      for (var i = 0, l = this.events.length; i < l; i++) {
        this.loading = false
        if (moment((this.events[i].date)).isSameOrAfter(moment(), 'day')) {
          if (this.events[i].concurrent === undefined) {
            if (this.events[i].createdBy.uid === auth.getUser().uid) {
              result.push(this.events[i])
            }
          } else {
            if (this.events[i].createdBy.uid === auth.getUser().uid || this.events[i].concurrent.uid === auth.getUser().uid) {
              result.push(this.events[i])
            }
          }
        }
      }
      return result
    }
  },
  methods: {
    deleteEvent: function (key) {
      eventsRef.child(key).remove()
      this.$refs.snackbar.open()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
