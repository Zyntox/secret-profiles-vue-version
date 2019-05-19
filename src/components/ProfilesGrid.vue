<template lang="html">
  <div class="profile-grid-pane">
    <slot></slot>
  </div>
</template>

<script>



export default {
  name: 'ProfilesGrid',
  components: {
  },
};
</script>

<style lang="scss" scoped>

  .profile-grid-pane{
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

</style>
