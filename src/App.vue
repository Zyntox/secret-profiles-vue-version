<template>
  <div id="app">
    <MainHeader></MainHeader>
    <SecretProfilesPage></SecretProfilesPage>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import SecretProfilesPage from './components/views/SecretProfilesPage.vue';

export default {
  name: 'app',
  components: {
    MainHeader,
    SecretProfilesPage,
  },
};
</script>

<style lang="scss">

body{
  margin: 0 auto;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul{
  margin: 0;
  padding: 0;
  list-style: none;
}


</style>
