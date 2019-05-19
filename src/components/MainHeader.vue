<template lang="html">
  <div class="main-header">
    <div class="title">Secret Profiles</div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
};
</script>

<style lang="scss" scoped>

  .main-header{
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #769953;

    .title{
      color: #fff;
      font-weight: 600;
    }

  }

</style>
