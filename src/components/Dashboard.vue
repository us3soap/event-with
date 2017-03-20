<template>
  <div class="phone-viewport">
      <md-list class="custom-list md-triple-line">

        <md-subheader>Mes réservations</md-subheader>

        <md-list-item v-for="event in filterEvents" :key="event.activity">
          <md-avatar>
            <img v-bind:src="event.createdBy.photoURL" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{event.createdBy.displayName}}</span>
            <span>{{event.activity}}</span>
            <p>
              {{event.date}} {{event.hour}}
            </p>
          </div>

          <md-button class="md-icon-button md-list-action">
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

let eventsRef = firebase.database().ref('events')

export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  firebase: {
    events: eventsRef
  },
  computed: {
    filterEvents: function () {
      var result = []
      for (var i = 0, l = this.events.length; i < l; i++) {
        if (this.events[i].createdBy.uid === auth.getUser().uid) {
          result.push(this.events[i])
        }
      }
      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
