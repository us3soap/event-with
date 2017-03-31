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
            <span v-if="! event.concurrent">{{event.createdBy.displayName}}</span>
            <span v-if="event.concurrent">{{event.createdBy.displayName}} / {{event.concurrent.displayName}}</span>
            <span class="label label-success" v-if="event.concurrent">Confirmé</span>
            <span class="label label-warning" v-if="! event.concurrent">En attente</span>
            <p>
              Le {{moment(event.date).format('DD/MM/YYYY')}} de {{event.begin}} à {{event.end}} 
            </p>
          </div>

          <md-button @click.native="deleteEvent(event['.key'], event.createdBy.uid)" class="md-icon-button md-list-action">
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
      loading: true,
      moment: moment
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
    deleteEvent: function (key, uid) {
      if (uid === auth.getUser().uid) {
        eventsRef.child(key).remove()
      } else {
        eventsRef.child(key).child('concurrent').remove()
      }
      this.$refs.snackbar.open()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 75%;
  font-weight: bold;
  line-height: 1;
  color: #ffffff !important;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
  width: 125px;
  margin: 5px 0;
}
a.label:hover,
a.label:focus {
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}
.label:empty {
  display: none;
}
.btn .label {
  position: relative;
  top: -1px;
}
.label-default {
  background-color: #777777;
}
.label-default[href]:hover,
.label-default[href]:focus {
  background-color: #5e5e5e;
}
.label-primary {
  background-color: #337ab7;
}
.label-primary[href]:hover,
.label-primary[href]:focus {
  background-color: #286090;
}
.label-success {
  background-color: #5cb85c;
}
.label-success[href]:hover,
.label-success[href]:focus {
  background-color: #449d44;
}
.label-info {
  background-color: #5bc0de;
}
.label-info[href]:hover,
.label-info[href]:focus {
  background-color: #31b0d5;
}
.label-warning {
  background-color: #f0ad4e;
}
.label-warning[href]:hover,
.label-warning[href]:focus {
  background-color: #ec971f;
}
.label-danger {
  background-color: #d9534f;
}
.label-danger[href]:hover,
.label-danger[href]:focus {
  background-color: #c9302c;
}
</style>
