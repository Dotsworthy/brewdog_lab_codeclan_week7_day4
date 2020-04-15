<template>
  <div id="app">
    <title>Brewdog Lab</title>
    <div id='sidebar-wrapper'>
      <div class="title-bar">
        <img class="logo" src="../public/logo.jpg" alt="Brewdog Lab">
        <h1>Brewdog Lab</h1>
      </div>

        <div class="tab">
      <button class="tablinks" v-on:click="openTab('beers-list')" id="defaultOpen">Beers</button>
      <button class="tablinks" v-on:click="openTab('favourites')">Favourites</button>
      </div>

      <div id="beers-list" class="tabcontent">
          <h1>Beers</h1>
          <beers-list :beers="beers"></beers-list>
          <button v-on:click="previous_page()">Previous Page</button>
          <button v-on:click="next_page()">Next Page</button>
          <p>{{pageNumber}}/17</p>
      </div>

      <div id="favourites" class="tabcontent">
            <p>Favourites</p>
            <beers-list :beers="favouriteBeers"></beers-list>
      </div>


    </div>

    <div class="content-wrapper">
      <div>
    <beer-detail id="beer-detail" :beer="selectedBeer" :favouriteBeers="favouriteBeers"></beer-detail>
  </div>

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
    },
    openTab(pageName) {
  let index, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (index = 0; index < tabcontent.length; index++) {
    tabcontent[index].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (index = 0; index < tablinks.length; index++) {
    tablinks[index].className = tablinks[index].className.replace(" active", "");
  }

  document.getElementById(pageName).style.display = "block";
  event.currentTarget.className += " active";
},
openDefaultTab(tabId) {
  document.getElementById(tabId).click();
}
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-columns: 25% 75%;
  background-color: dodgerblue;
}

#sidebar-wrapper {
  background-color: #F2F3F4;
  height: 100vh;
}

#beer-detail {
  border: 2px solid black;
  border-radius: 50px;
}

.title-bar {
  display: flex;
}


.content-wrapper {
  display: grid;
}

.logo {
  height: 100px;
  width: auto;
}

.tab {
  overflow: hidden;
  text-align: center;
}

</style>
