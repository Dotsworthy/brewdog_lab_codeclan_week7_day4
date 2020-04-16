<template>
  <div id="app">
    <title>Brewdog Lab</title>
    <div id='sidebar-wrapper'>
      <div class="title-bar">
        <img class="logo" src="../public/logo.png" alt="Brewdog Lab">
      </div>

        <div class="tab">
      <button class="tablinks" v-on:click="openTab('beers-list')" id="defaultOpen">Beers</button>
      <button class="tablinks" v-on:click="openTab('favourites')">Favourites</button>
      </div>

      <div id="beers-list" class="tabcontent">
          <h1 class="title">Beer Catalogue</h1>
          <button v-on:click="previous_page()">Previous Page</button>
          <button v-on:click="next_page()">Next Page</button>
          <beers-list :beers="beers"></beers-list>
      </div>

      <div id="favourites" class="tabcontent">
          <h1>Favourites</h1>
          <beers-list :beers="favouriteBeers"></beers-list>
      </div>
    </div>
    <div class="content-wrapper">
    <beer-detail id="beer-detail" :beer="selectedBeer" :favouriteBeers="favouriteBeers"></beer-detail>
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
      if (beer_index > -1) {this.favouriteBeers.splice(beer_index,1)}
    })
    this.openDefaultTab('defaultOpen');

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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-columns: 350px 1fr;
  background-color: #49516F;
  overflow: scroll;
}

#sidebar-wrapper {
  background-color: #F2F3F4;
  height: 100vh;
  width: 350px;
  padding: 50px;
}

#beer-detail {
  padding: 12.5%;
  color: white;
  height: 100vh;
}

#beers-list {
  transform: skewY(-11deg);
  margin-top: 5px;
}

#favourites {
  transform: skewY(-11deg);
}

button {
background-color: inherit;
margin: 2px;
padding: 10px 16px;
text-align: center;
text-decoration: none;
}

.tab {
  transform: skewY(-11deg);
}

.title-bar {
  display: flex;
  padding: 2px;
  margin: 2px;
  justify-content: center;
}

.content-wrapper {
  display: grid;
}

.logo {
  height: 100px;
  width: auto;
  margin-bottom: 5px;
}

.tab {
  overflow: hidden;
  text-align: center;
}

</style>
