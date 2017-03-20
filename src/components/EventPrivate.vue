<template>
  <div class="phone-viewport">
    
    <md-subheader>Ajouter un evenement</md-subheader>

    <div class="form">

        <md-input-container v-bind:class="[ !isValid && event.activity === '' ? 'md-input-invalid' : '']">
            <label for="activity">Activité</label>
            <md-select required name="activity" id="activity" v-model="event.activity">
                <md-option v-for="partenaire in partenaires" :key="partenaire.name" v-bind:value="partenaire.name">{{partenaire.name}}</md-option>
            </md-select>
            <span class="md-error" v-show="!isValid && event.activity === ''">Veuillez choisir un type d'évènement</span>
        </md-input-container>

        <md-input-container v-bind:class="[ !isValid && event.date === '' ? 'md-input-invalid' : '']">
            <label>Date</label>
            <md-input v-model="event.date" required type="date"></md-input>
            <span class="md-error" v-show="!isValid && event.date === ''">Veuillez saisir la date de l'évènement</span>
        </md-input-container>

        <md-input-container v-bind:class="[ !isValid && event.hour === '' ? 'md-input-invalid' : '']">
            <label>Heure</label>
            <md-input v-model="event.hour" required></md-input>
            <span class="md-error" v-show="!isValid && event.hour === ''">Indiquez ici le début ou le créneau de l'évènement</span>
        </md-input-container>

        <md-input-container v-bind:class="[ !isValid && (event.nb === '' || event.nb < 2) ? 'md-input-invalid' : '']">
            <label>Nombre de participants</label>
            <md-input v-model="event.nb" required type="number"></md-input>
            <span class="md-error" v-show=" !isValid && event.nb === ''">Le nombre de participants est obligatoire</span>
        </md-input-container>

        <button v-on:click="addEvent" class="md-fab md-fab-bottom-right fix">
         <md-icon>add</md-icon>
        </button>
    </div>
  </div>
</template>

<script>
import auth from '../services/firebaseService'
import firebase from 'firebase'
import toastr from 'toastr'
import moment from 'moment'

let partenairesRef = firebase.database().ref('partenaires')
let eventsRef = firebase.database().ref('events')

export default {
  name: 'eventPrivate',
  data () {
    return {
      event: {
        activity: '',
        date: '',
        hour: '',
        nb: 2,
        created: '',
        createdBy: auth.getUser(),
        users: [auth.getUser()]
      },
      isValid: true
    }
  },
  firebase: {
    partenaires: partenairesRef
  },
  methods: {
    addEvent: function () {
      this.isValid = true

      if (this.event.activity === '' && this.isValid) {
        this.isValid = false
      }

      if (this.event.date === '' && this.isValid) {
        this.isValid = false
      }

      if (this.event.hour === '' && this.isValid) {
        this.isValid = false
      }

      if (this.event.nb === '' && this.isValid) {
        this.isValid = false
      }

      if (this.isValid) {
        this.event.created = moment().format()
        eventsRef.push(this.event)
        this.event.activity = ''
        this.event.date = ''
        this.event.hour = ''
        this.event.nb = ''
        toastr.success('L\'évènement est disponible')
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
