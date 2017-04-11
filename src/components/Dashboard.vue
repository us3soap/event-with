<template>
  <div class="phone-viewport">
      <md-progress v-if="loading" md-indeterminate></md-progress>

      <md-snackbar md-position="top center" ref="snackbar" md-duration="4000">
       <span>L'évènement a bien été annulé.</span>
      </md-snackbar>

      <transition name="fade">
        <div v-if="filterRelations > 0" class="alert alert-info" role="alert">
          Vous avez <router-link to="/user/list" class="alert-link">{{filterRelations}} demandes d'ami</router-link> en attente
        </div>
      </transition>
      
      <md-list class="custom-list md-triple-line">

        <md-subheader>Mes réservations</md-subheader>

        <md-list-item v-for="event in filterEvents" :key="event.activity">
          <md-avatar>
            <img v-if="event.createdBy.photoURL" v-bind:src="event.createdBy.photoURL" alt="People">
            <img v-if="! event.createdBy.photoURL" src="/static/img/profil.jpg" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span v-if="! event.concurrent">{{event.createdBy.displayName}}</span>
            <span v-if="event.concurrent">{{event.createdBy.displayName}} / {{event.concurrent.displayName}}</span>
            <span class="label label-success" v-if="event.concurrent">Confirmé</span>
            <span class="label label-warning" v-if="! event.concurrent">En attente</span>
            <p>
              <md-icon>access_time</md-icon> {{moment(event.date).format('DD/MM/YYYY')}}  {{event.begin}} - {{event.end}} 
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
let relationsRef = firebase.database().ref('relations')

export default {
  name: 'dashboard',
  firebase: {
    events: eventsRef,
    relations: relationsRef
  },
  data () {
    return {
      loading: true,
      moment: moment
    }
  },
  computed: {
    filterEvents: function () {
      let result = []
      result = result.concat(this.events.filter((el) => (moment((el.date)).isSameOrAfter(moment(), 'day') && el.concurrent === undefined && el.createdBy.uid === auth.getUser().uid)))
      result = result.concat(this.events.filter((el) => (moment((el.date)).isSameOrAfter(moment(), 'day') && el.concurrent !== undefined && (el.createdBy.uid === auth.getUser().uid || el.concurrent.uid === auth.getUser().uid))))

      this.loading = false
      return result.sort(function (a, b) {
        return moment(a.date) - moment(b.date)
      })
    },
    filterRelations: function () {
      let result = []
      result = result.concat(this.relations.filter((el) => (el.status === 0 && el.createdBy.uid !== auth.getUser().uid && el.relation.includes(auth.getUser().uid))))
      return result.length
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
.alert {
  padding: 15px;
  margin: 5px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.alert h4 {
  margin-top: 0;
  color: inherit;
}
.alert .alert-link {
  font-weight: bold;
}
.alert > p,
.alert > ul {
  margin-bottom: 0;
}
.alert > p + p {
  margin-top: 5px;
}
.alert-dismissable,
.alert-dismissible {
  padding-right: 35px;
}
.alert-dismissable .close,
.alert-dismissible .close {
  position: relative;
  top: -2px;
  right: -21px;
  color: inherit;
}
.alert-success {
  background-color: #dff0d8;
  border-color: #d6e9c6;
  color: #3c763d;
}
.alert-success hr {
  border-top-color: #c9e2b3;
}
.alert-success .alert-link {
  color: #2b542c;
}
.alert-info {
  background-color: #d9edf7;
  border-color: #bce8f1;
  color: #31708f;
}
.alert-info hr {
  border-top-color: #a6e1ec;
}
.alert-info .alert-link {
  color: #245269;
}
.alert-warning {
  background-color: #fcf8e3;
  border-color: #faebcc;
  color: #8a6d3b;
}
.alert-warning hr {
  border-top-color: #f7e1b5;
}
.alert-warning .alert-link {
  color: #66512c;
}
.alert-danger {
  background-color: #f2dede;
  border-color: #ebccd1;
  color: #a94442;
}
.alert-danger hr {
  border-top-color: #e4b9c0;
}
.alert-danger .alert-link {
  color: #843534;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
