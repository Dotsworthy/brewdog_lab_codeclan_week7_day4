module.exports = {
  publicPath: '/brewdog_lab_codeclan_week7_day4/'

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  }
};
