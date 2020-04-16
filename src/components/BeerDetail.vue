<template lang="html">
  <div v-if="beer" id="BeerDetail">
    <div class="title-wrapper">
      <img class="beer-image" v-bind:src="beer.image_url" v-bind:alt="beer.name">
      <div class="">
        <h1>{{beer.name}}</h1>
        <p>{{beer.tagline}}</p>
        <p>{{beer.abv}}% AVB</p>
        <p>{{beer.description}}</p>
        <p>Ingredients: {{getIngredients()}}</p>
      </div>

    </div>
    

    <button v-if="includesBeer() == false" v-on:click="addToFavourites">Add Beer</button>
    <button v-if="includesBeer()" v-on:click="removeFromFavourites" > Remove from Favourites </button>
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
    },
    includesBeer() {
      return this.favouriteBeers.includes(this.beer)
      }
    }
  }

</script>

<style lang="css" scoped>

.beer-image {
  height: 40vh;
  width: auto;
}

.title-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: center;
}

h2 {


}
</style>
