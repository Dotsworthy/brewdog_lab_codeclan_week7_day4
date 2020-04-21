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
    <beer-detail v-if="selectedBeer" id="beer-detail" :beer="selectedBeer" :favouriteBeers="favouriteBeers"></beer-detail>
    <div id="beer-detail" v-if="selectedBeer == null">
      <h1>Brewdog Beer Catalogue</h1>
      <p> By Andrew Watson <p>
      <p> API by PunkApi </p>
      <br>
      <p>Welcome to the Brewdog Beer Catalogue. To begin, select a beer from the left hand side. You can also add up to 20 beers to your favourites list. As this is an app showcase, these settings aren't saved and will reset when you leave the page. </p>
      <br>
      <p>This app was created for CodeClan under the following brief:</p>
      <br>
      <p>Your task is to build an app that uses an API to display information on a variety of beers.</p>
      <br>
      <h2>MVP</h2> 
      <p>Your app should be able to:</p>
      <ul>
        <li>Allow the user to view all the beers</li>
        <li>Allow the user to view more detailed information on a selected beer</li>
        <li>Allow the user to mark beers as 'favourites'</li>
        <li>Display the user's favourite beers</li>
        </ul>
        <br>
        <h2>Extensions</h2>
        <ul>
        <li>Prevent the user from marking the same beer as a favourite more than once</li>
        <li>Allow the user to deselect favourite beers</li>
        <li>Display the selected beer's ingredients (without duplicates)</li>
        <li>The endpoint provided will only return 20 beers at a time. Modify your initial request to fetch all 300+ beers the API provides.</li>
        </ul>
    </div>
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
    if (this.favouriteBeers.length < 20) {
    this.favouriteBeers.push(beer)
      }
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

// TODO:
// add limit for favourites and text

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
    grid-template-columns: 200px 1fr;
  }

  @media #{$mq-medium} {
    font-size: $base-font-size*0.7;
    line-height: $base-line-height*1.1;
    grid-template-columns: 250px 1fr;
  }

  @media #{$mq-large} {
    font-size: 11px;
    line-height: $base-line-height*1.1;
    grid-template-columns: 350px 1fr;
  }

  @media #{$mq-xlarge} {
    font-size: 14px;
    grid-template-columns: 350px 1fr;
  }

  @media #{$mq-xxlarge} {
    font-size: $base-font-size*1.2;
    grid-template-columns: 350px 1fr;
  }
}

#sidebar-wrapper {
  background-color: #F2F3F4;
}

#sidebar-content {

  @media #{$mq-small} {
    padding: 25px;
    width: 200px;
  }
  @media #{$mq-medium} {
    padding: 25px;
    width: 250px;
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
  color: white;
  background-color: #49516F;

  @media #{$mq-small} {
    padding: 25px;
  }
  @media #{$mq-medium} {
    padding: 50px;
  }
  @media #{$mq-large} {
    padding: 100px;
  }
  @media #{$mq-xlarge} {
    padding: 100px;
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
  padding: 10px 6px;
  width: 45%;
  font-size: $base-font-size*1;
}
@media #{$mq-medium} {
  padding: 10px 6px;
  width: 45%;
  font-size: $base-font-size*0.9;
}
@media #{$mq-large} {
  padding: 10px 6px;
  width: 45%;
  font-size: 11px;
}
@media #{$mq-xlarge} {
  padding: 10px 6px;
  width: 45%;
  font-size: 11px;
}
@media #{$mq-xxlarge} {
  padding: 10px 6px;
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

.title {
  @media #{$mq-small} {
    font-size: 20px;
  }

  @media #{$mq-medium} {
    font-size: 25px;
  }
  
  @media #{$mq-large} {
    font-size: 35px;
  }

  

}

</style>
