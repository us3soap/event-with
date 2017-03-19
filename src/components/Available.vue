<template>
  <div class="phone-viewport">
      <md-list class="custom-list md-triple-line">

        <md-subheader>Evenements disponibles</md-subheader>

        <md-list-item>
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/1" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>Kevin Valette</span>
            <span>Squash du marais</span>
            <p>10/03/2017 12:00 - 13:20</p>
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
export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
