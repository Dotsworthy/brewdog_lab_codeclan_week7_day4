<template>
  <div id="app">
    <title>Brewdog Lab</title>

    <div id='sidebar-wrapper'>
      <div id='sidebar-content'>
      <div class="title-bar">
        <img class="logo" src="../public/logo.png" alt="Brewdog Lab">
      </div>

      <div class="tab">
        <button class="navigation button" v-on:click="openTab('beers-list')" id="defaultOpen">Beers</button>
        <button class="navigation button" v-on:click="openTab('favourites')">Favourites</button>
      </div>

      <div id="beers-list" class="tabcontent">
        <h1 class="title">Beer Catalogue</h1>
        <button class='navigation-button' v-on:click="previous_page()">Previous Page</button>
        <button class='navigation-button' v-on:click="next_page()">Next Page</button>
        <beers-list :beers="beers"></beers-list>
      </div>



    <div id="favourites" class="tabcontent">
      <h1>Favourites</h1>
      <beers-list :beers="favouriteBeers"></beers-list>
    </div>
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
import './styles/_variables.scss'

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

<style lang="scss">



* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  overflow: visible;
  background-color: #49516F;
 

  font-size: $base-font-size;
  line-height: $base-line-height;

  @media #{$mq-small} {
    font-size: $base-font-size*0.7;
    line-height: $base-line-height*1.1;
    grid-template-columns: 17.1em 1fr;
  }

  @media #{$mq-medium} {
    font-size: $base-font-size*0.7;
    line-height: $base-line-height*1.1;
    grid-template-columns: 22.8em 1fr;
  }

  @media #{$mq-large} {
    font-size: $base-font-size*0.8;
    line-height: $base-line-height*1.1;
    grid-template-columns: 27.2em 1fr;
  }

  @media #{$mq-xlarge} {
    font-size: $base-font-size*1.08;
    grid-template-columns: 20.2em 1fr;
  }

  @media #{$mq-xxlarge} {
    font-size: $base-font-size*1.2;
    grid-template-columns: 19em 1fr;
  }
}

#sidebar-wrapper {
  background-color: #F2F3F4;
  width: 25vw;
  max-width: 350px;
}

#sidebar-content {

  @media #{$mq-small} {
    padding: 25px;
  }
  @media #{$mq-medium} {
    padding: 18px;
  }
  @media #{$mq-large} {
    padding: 40px;
    width: 350px;
  }
  @media #{$mq-xlarge} {
    padding: 40px;
    width: 350px;
  }
  @media #{$mq-xxlarge} {
    padding: 40px;
    width: 350px;
  }
}

#beer-detail {
  padding: $base-content-padding;
  color: white;
  background-color: #49516F;

  @media #{$mq-small} {
    padding: 25px;
  }
  @media #{$mq-medium} {
    padding: 50px;
  }
  @media #{$mq-large} {
    padding: $base-content-padding;
  }
  @media #{$mq-xlarge} {
    padding: 125px;
  }
  @media #{$mq-xxlarge} {
    padding: 150px;
  }
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
text-align: center;
text-decoration: none;

@media #{$mq-small} {
  padding: 9.66px 4px;
  width: 45%;
  font-size: $base-font-size*1;
}
@media #{$mq-medium} {
  padding: 9px 14px;
  width: 45%;
  font-size: $base-font-size*0.9;
}
@media #{$mq-large} {
  padding: 9px 14px;
  width: 45%;
  font-size: 11px;
}
@media #{$mq-xlarge} {
  padding: 9px 14px;
  width: 45%;
  font-size: 11px;
}
@media #{$mq-xxlarge} {
  padding: 9px 14px;
  width: 45%;
  font-size: 11px;
}

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
