<template lang="html">
<div v-if="beer" id="BeerDetail">
<h2>{{beer.name}}</h2>
<p>{{beer.tagline}}</p>
<button v-on:click="addToFavourites">Add Beer</button>
</div>
</template>

<script>
import { eventBus } from '../main.js'

export default {
  name:'beer-detail',
  props:['beer'],
  methods: {
    addToFavourites(){
      eventBus.$emit("beer-favourited", this.beer)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
