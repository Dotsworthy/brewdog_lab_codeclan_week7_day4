<template lang="html">
  <div id="beerList">
    <ul>
      <list-item v-for="(beer, index) in beers" :beer="beer" :key="index"></list-item>
    </ul>
  </div>
</template>

<script>
// import {eventBus} from '../main.js'
import ListItem from './ListItem'


export default {
  name: 'beers-list',
  props: ['beers'],
  components: {
    "list-item": ListItem
  }
}



</script>

<style lang="scss" scoped>

ul {
  list-style-type: none;
  font-weight: bold;
  margin-top: 10px;

}

</style>
