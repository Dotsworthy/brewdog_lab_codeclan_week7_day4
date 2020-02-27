<template>
  <div id="app">
    <title>Brewdog Lab</title>
    <h1>Brewdog Lab</h1>
    <beers-list :beers="beers"></beers-list>
    <beer-detail :beer="selectedBeer"></beer-detail>
  </div>
</template>

<script>
import { eventBus } from './main.js'
import BeerDetail from './components/BeerDetail'
import BeerFavourites from './components/BeerFavourites'
import BeerList from './components/BeerList'
import ListItem from './components/ListItem'

export default {
  data(){
    return {
      beers: [],
      selectedBeer: null
    }
  },
  components: {
    "beers-list": BeerList,
    "beer-detail": BeerDetail,
    "beer-favourites": BeerFavourites,
    "list-item": ListItem
  },
  mounted(){
    fetch('https://api.punkapi.com/v2/beers')
    .then(res => res.json())
    .then(beers => this.beers = beers)

    eventBus.$on('beer-selected',(beer)=>{
      this.selectedBeer=beer;
    })
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
