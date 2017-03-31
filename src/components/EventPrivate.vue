<template>
  <div class="phone-viewport">
    <md-snackbar md-position="top center" ref="snackbar" md-duration="4000">
      <span>L'évènement a bien été ajouté.</span>
      <md-button class="md-accent" href="#/" md-theme="light-blue" @click.native="$refs.snackbar.close()">Voir</md-button>
    </md-snackbar>
    
    <md-subheader>Ajouter un evenement</md-subheader>

    <div class="form">

        <md-input-container v-bind:class="[ !isValid && event.date === '' ? 'md-input-invalid' : '']">
            <label>Date</label>
            <md-input v-model="event.date" required type="date"></md-input>
            <span class="md-error" v-show="!isValid && event.date === ''">Invalide</span>
        </md-input-container>

        <md-input-container v-bind:class="[ !isValid && event.begin === '' ? 'md-input-invalid' : '']">
            <label>Heure début</label>
            <md-input type="time" v-model="event.begin" required></md-input>
            <span class="md-error" v-show="!isValid && event.begin === ''">Invalide</span>
        </md-input-container>

        <md-input-container v-bind:class="[ !isValid && event.end === '' ? 'md-input-invalid' : '']">
            <label>Heure fin</label>
            <md-input type="time" v-model="event.end" required></md-input>
            <span class="md-error" v-show="!isValid && event.end === ''">Invalide</span>
        </md-input-container>

        <md-button @click.native="addEvent"class="md-raised md-primary">Ajouter</md-button>
    </div>
  </div>
</template>

<script>
import auth from '../services/firebaseService'
import firebase from 'firebase'
import moment from 'moment'

let eventsRef = firebase.database().ref('events')

export default {
  name: 'eventPrivate',
  data () {
    return {
      event: {
        date: '',
        begin: '',
        end: '',
        created: '',
        createdBy: auth.getUser()
      },
      isValid: true
    }
  },
  methods: {
    addEvent: function () {
      this.isValid = true

      if (this.event.date === '' && this.isValid) {
        this.isValid = false
      }

      if (this.event.begin === '' && this.isValid) {
        this.isValid = false
      }

      if (this.event.end === '' && this.isValid) {
        this.isValid = false
      }

      if (this.isValid) {
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
</style>
