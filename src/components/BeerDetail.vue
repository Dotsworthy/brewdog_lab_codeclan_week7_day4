<template lang="html">
<div v-if="beer" id="BeerDetail">
<h2>{{beer.name}}</h2>
<p>{{beer.tagline}}</p>
<p>{{beer.abv}}% AVB</p>
<button v-on:click="addToFavourites">Add Beer</button>
<button v-on:click="removeFromFavourites" > Remove from Favourites </button>
</div>
</template>

<script>
import { eventBus } from '../main.js'

export default {
  name:'beer-detail',
  props:['beer', 'favouriteBeers'],
  methods: {
    addToFavourites(){
      eventBus.$emit("beer-favourited", this.beer)
    },
    removeFromFavourites(){
      eventBus.$emit("beer-to-remove", this.beer)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
