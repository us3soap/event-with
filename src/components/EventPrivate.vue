<template>
  <div class="phone-viewport">
    <md-snackbar md-position="top center" ref="snackbar" md-duration="4000">
      <span>L'évènement a bien été ajouté.</span>
      <md-button class="md-accent" href="#/" md-theme="light-blue" @click.native="$refs.snackbar.close()">Voir</md-button>
    </md-snackbar>

    <md-subheader>Ajouter un evenement</md-subheader>

    <div class="form">

        <md-input-container v-bind:class="[ ! error.activity.valid ? 'md-input-invalid' : '']">
          <label for="activity">Activité</label>
          <md-select name="activity" id="activity" required v-model="event.activity">
            <md-option v-for="activity in activities" :key="activity['.key']" :value="activity['.key']">{{activity.name}}</md-option>
          </md-select>
          <span class="md-error" v-show="! error.activity.valid ">{{ error.activity.label }}</span>
        </md-input-container>

        <md-input-container v-bind:class="[ ! error.date.valid ? 'md-input-invalid' : '']">
            <label>Date</label>
            <md-input v-model="event.date" required type="date"></md-input>
            <span class="md-error" v-show="! error.date.valid">{{ error.date.label }}</span>
        </md-input-container>

        <md-input-container v-bind:class="[ ! error.begin.valid ? 'md-input-invalid' : '']">
            <label>Heure début</label>
            <md-input type="time" v-model="event.begin" required></md-input>
            <span class="md-error" v-show="! error.begin.valid ">{{error.begin.label}}</span>
        </md-input-container>

        <md-input-container v-bind:class="[ ! error.end.valid ? 'md-input-invalid' : '']">
            <label>Heure fin</label>
            <md-input type="time" v-model="event.end" required></md-input>
            <span class="md-error" v-show="! error.end.valid">{{error.end.label}}</span>
        </md-input-container>

        <md-switch v-model="event.public" id="public" name="public" class="md-primary">Evenement public</md-switch>
        <br />
        <transition name="fade">
          <div class="info" v-if="event.public"><md-icon class="md-primary">info</md-icon> L'évènement sera visible par tous.</div>
          <div class="info" v-if="! event.public"><md-icon class="md-primary">info</md-icon> L'évènement sera visible uniquement par vos amis.</div>
        </transition>
        <br />

        <md-button @click.native="addEvent" class="md-raised md-primary">Ajouter</md-button>
    </div>
  </div>
</template>

<script>
import auth from '../services/firebaseService'
import firebase from 'firebase'
import moment from 'moment'

let eventsRef = firebase.database().ref('events')
let activitiesRef = firebase.database().ref('activities')

export default {
  name: 'eventPrivate',
  data () {
    return {
      event: {
        activity: '',
        date: '',
        begin: '',
        end: '',
        created: '',
        public: true,
        createdBy: auth.getUser()
      },
      error: {
        activity: {
          label: 'Invalide',
          valid: true
        },
        date: {
          label: 'Invalide',
          valid: true
        },
        begin: {
          label: 'Invalide',
          valid: true
        },
        end: {
          label: 'Invalide',
          valid: true
        },
        created: {
          label: 'Invalide',
          valid: true
        }
      }
    }
  },
  firebase: {
    activities: activitiesRef
  },
  methods: {
    addEvent: function () {
      this.error.activity.valid = true
      this.error.date.valid = true
      this.error.begin.valid = true
      this.error.end.valid = true

      if (this.event.activity === '') {
        this.error.activity.valid = false
        this.error.activity.label = 'Veuillez sélectionner une activité'
      }

      if (this.event.date === '') {
        this.error.date.label = 'Veuillez saisir la date souhaitée'
        this.error.date.valid = false
      }

      if (moment(this.event.date).isSameOrBefore(moment())) {
        this.error.date.label = 'La date est déjà passée'
        this.error.date.valid = false
      }

      if (this.event.begin === '') {
        this.error.begin.label = 'Veuillez saisir une heure de début'
        this.error.begin.valid = false
      }

      if (this.event.end === '') {
        this.error.end.label = 'Veuillez saisir une heure de fin'
        this.error.end.valid = false
      }

      if (this.error.activity.valid &&
          this.error.date.valid &&
          this.error.begin.valid &&
          this.error.end.valid) {
        this.event.date = moment(this.event.date).format('YYYY-MM-DD')
        this.event.created = moment().format()
        eventsRef.push(this.event)
        this.event.date = ''
        this.event.begin = ''
        this.event.end = ''
        this.$refs.snackbar.open()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .form {
        padding: 15px;
    }

    .fix {
        margin-bottom: 50px;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0
    }

    .info {
      color: rgba(0,0,0,.54);
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 5px;
    }

</style>
