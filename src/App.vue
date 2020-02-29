<template>
  <div id="app">
    <title>Brewdog Lab</title>
    <div class='title-wrapper'>
      <img src="" alt="">
    <h1>Brewdog Lab</h1>
  </div>
    <div class="content-wrapper">
    <beers-list :beers="beers"></beers-list>
    <beer-detail :beer="selectedBeer" :favouriteBeers="favouriteBeers"></beer-detail>
    <beer-favourites :beers="favouriteBeers"></beer-favourites>
  </div>
    <div class="button-wrapper">
    <button v-on:click="previous_page()">Previous Page</button>
    <button v-on:click="next_page()">Next Page</button>
  </div>
  </div>
</template>

<script>
import { eventBus } from './main.js'
import BeerDetail from './components/BeerDetail'
import BeerList from './components/BeerList'

export default {
  data(){
    return {
      beers: [],
      selectedBeer: null,
      favouriteBeers: [],
      pageNumber: 1
    }
  },
  components: {
    "beers-list": BeerList,
    "beer-detail": BeerDetail,
    "beer-favourites": BeerList
  },
  mounted(){
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=20')
    .then(res => res.json())
    .then(beers => this.beers = beers)

    eventBus.$on('beer-selected',(beer)=>{
    this.selectedBeer=beer;
    })

    eventBus.$on('beer-favourited', (beer) => {
    this.favouriteBeers.push(beer)
    })

    eventBus.$on('beer-to-remove', (beer) => {
      let beer_index = this.favouriteBeers.indexOf(beer)
      if (beer_index > -1) {this.favouriteBeers.splice(beer_index,1)
      this.selectedBeer = null}
    })
  },
  methods: {
    previous_page() {
      if (this.pageNumber > 1) {this.pageNumber -= 1}
      let url = `https://api.punkapi.com/v2/beers?page=${this.pageNumber}&per_page=20`
      fetch(`${url}`)
      .then(res => res.json())
      .then(beers => this.beers = beers)
    },
    next_page() {
      if (this.pageNumber <17) {this.pageNumber += 1}
      let url = `https://api.punkapi.com/v2/beers?page=${this.pageNumber}&per_page=20`
      fetch(`${url}`)
      .then(res => res.json())
      .then(beers => this.beers = beers)
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content-wrapper{
  display: flex;
  padding: 15px;
}

.title-wrapper{
  background-color:
}
</style>
