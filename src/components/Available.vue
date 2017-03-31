<template>
  <div class="phone-viewport">
      <md-progress v-if="loading" md-indeterminate></md-progress>

      <md-snackbar md-position="top center" ref="snackbar" md-duration="4000">
       <span>L'évènement a bien été rejoint.</span>
      </md-snackbar>

      <md-list class="custom-list md-triple-line">

        <md-subheader>Evenements disponibles</md-subheader>

        <md-list-item v-for="event in filterEvents" :key="event.activity">
          <md-avatar>
            <img v-bind:src="event.createdBy.photoURL" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{event.createdBy.displayName}}</span>
            <span>Le {{event.date}}</span>
            <p>De {{event.begin}} à {{event.end}}</p>
          </div>

          <md-button @click.native="addConcurrent(event['.key'])" class="md-icon-button md-list-action">
            <md-icon class="md-primary">check</md-icon>
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
  data () {
    return {
      loading: true
    }
  },
  firebase: {
    events: eventsRef
  },
  computed: {
    filterEvents: function () {
      var result = []
      this.loading = false
      for (var i = 0, l = this.events.length; i < l; i++) {
        if (this.events[i].createdBy.uid !== auth.getUser().uid && this.events[i].concurrent === undefined && moment((this.events[i].date)).isSameOrAfter(moment(), 'day')) {
          result.push(this.events[i])
        }
      }
      return result
    }
  },
  methods: {
    addConcurrent: function (key) {
      this.$refs.snackbar.open()
      eventsRef.child(key).child('concurrent').set(auth.getUser())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
