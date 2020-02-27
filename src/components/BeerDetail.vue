<template lang="html">
<div v-if="beer" id="BeerDetail">
<h2>{{beer.name}}</h2>
</div>
</template>

<script>
export default {
  name:'beer-detail',
  props:['beer']
}
</script>

<style lang="css" scoped>
</style>
