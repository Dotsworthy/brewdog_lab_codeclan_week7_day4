<template lang="html">
<div v-if="beer" id="BeerDetail">
<h2>{{beer.name}}</h2>
<p>{{beer.tagline}}</p>
<p>{{beer.abv}}% AVB</p>
<p>Ingredients: {{getIngredients()}}</p>
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
    addToFavourites() {
      eventBus.$emit("beer-favourited", this.beer)
    },
    removeFromFavourites(){
      eventBus.$emit("beer-to-remove", this.beer)
    },
    getIngredients() {
      let ingredientArray = []
      let allHops = this.beer.ingredients.hops.map((hop) => {
        return hop.name;
      });
      let filteredHops = allHops.filter((hop,index) => {
        return allHops.indexOf(hop) >= index
      });
      let allMalt = this.beer.ingredients.malt.map((malt) => {
        return malt.name;
      });
      let filteredMalt = allMalt.filter((malt,index) => {
        return allMalt.indexOf(malt) >= index
      });
      ingredientArray = filteredHops.concat(filteredMalt);
      ingredientArray.push(this.beer.ingredients.yeast)
      let result = ingredientArray.join(', ');
      return result;
    }
  }
}

</script>

<style lang="css" scoped>
</style>
