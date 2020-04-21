<template lang="html">
  <div v-if="beer" id="BeerDetail">
    <div class="title-wrapper">
      <div class="image-wrapper">
      <img class="beer-image" v-bind:src="beer.image_url" v-bind:alt="beer.name">
    </div>
      <div class="beer-content">
        <h1 class="title">{{beer.name}}</h1>
        <p>{{beer.tagline}}</p>
        <p>{{beer.abv}}% AVB</p>
        <button class="favourites" v-if="includesBeer() == false" v-on:click="addToFavourites">Add to Favourites</button>
        <button class="favourites" v-if="includesBeer()" v-on:click="removeFromFavourites" > Remove from Favourites </button>
        <br>
        <p>{{beer.description}}</p>
        <br>
        <p>Ingredients: {{getIngredients()}}</p>
      </div>
    </div>
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

<style lang="scss" scoped>

.image-wrapper {
  @media #{$mq-small} {
    padding: 10px;
  }

  @media #{$mq-medium} {
    padding: 65px 41px;
  }

  @media #{$mq-large} {
    padding: 20px;
  }
}

.beer-image {

  @media #{$mq-small} {
    height: 250px;
    width: auto;
  }

  @media #{$mq-medium} {
    height: 500px;
    width: auto;
  }

  @media #{$mq-large} {
    height: 500px;
    width: auto;
  }

  @media #{$mq-xlarge} {
    height: 670px;
    width: auto;
  }

  @media #{$mq-xxwide} {
    height: 670px;
    width: auto;
  }

  @media #{$mq-xxlarge} {
    height: 900px;
    width: auto;
  }

}

.title-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: center;
  width: 100%;
  height: 100%;

  @media #{$mq-small} {
    grid-template-rows: 30% 70%;
    grid-template-columns: 1fr;
  }

  @media #{$mq-medium} {
    grid-template-columns: 50% 50%;
    grid-template-rows: 1fr;
  }
}

.favourites {
  border: none;
  font-family: Avenir;
  color: white;
  background-color: inherit;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 0px;
  margin: 0px;
}

.beer-content {
  letter-spacing: 1px;
  padding: 45px;

  @media #{$mq-small} {

  }

  @media #{$mq-medium} {

  }

  @media #{$mq-large} {
  
  }

  @media #{$mq-xlarge} {
    font-size: $base-font-size*1.2;
  }

  @media #{$mq-xxwide} {
    font-size: $base-font-size*1.2;
  }

  @media #{$mq-xxlarge} {
    font-size: $base-font-size*1.6;
  }


}


</style>
