<template>
  <div class="phone-viewport">
    
    <md-subheader>Ajouter un evenement</md-subheader>

    <form novalidate @submit.stop.prevent="submit">

        <md-input-container>
            <label>Required</label>
            <md-input required></md-input>
        </md-input-container>

        <md-input-container class="md-input-invalid">
            <label>Error</label>
            <md-input required></md-input>
        </md-input-container>

        <md-input-container class="md-input-invalid">
            <label>Error with message</label>
            <md-input required></md-input>

            <span class="md-error">Validation message</span>
        </md-input-container>

        <md-input-container class="md-input-invalid">
            <label>Textarea with error</label>
            <md-textarea></md-textarea>

            <span class="md-error">Textarea validation message</span>
        </md-input-container>
    </form>
  </div>
</template>

<script>
export default {
  name: 'eventPrivate',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    form {
        padding: 15px;
    }
</style>
