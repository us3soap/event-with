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
            <span class="label label-warning">En attente</span>
            <p>
              <md-icon>access_time</md-icon> {{moment(event.date).format('DD/MM/YYYY')}}  {{event.begin}} - {{event.end}} 
            </p>
          </div>

          <md-button @click.native="addConcurrent(event['.key'])" class="md-icon-button md-list-action">
            <md-icon class="md-primary">add_circle</md-icon>
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
let relationsRef = firebase.database().ref('relations')

export default {
  name: 'dashboard',
  data () {
    return {
      loading: true,
      moment: moment
    }
  },
  firebase: {
    events: eventsRef,
    relations: relationsRef
  },
  computed: {
    filterEvents: function () {
      var result = []
      this.loading = false
      for (var i = 0, l = this.events.length; i < l; i++) {
        if (this.events[i].createdBy.uid !== auth.getUser().uid && this.events[i].concurrent === undefined && moment((this.events[i].date)).isSameOrAfter(moment(), 'day')) {
          if (this.events[i].public) {
            result.push(this.events[i])
          } else {
            for (let k = 0, m = this.relations.length; k < m; k++) {
              if (this.relations[k].relation.includes(auth.getUser().uid) && this.relations[k].relation.includes(this.events[i].createdBy.uid) && this.relations[k].status === 1) {
                result.push(this.events[i])
              }
            }
          }
        }
      }
      return result.sort(function (a, b) {
        return moment(a.date) - moment(b.date)
      })
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
