<template lang="html">
  <div class="pagination-container">

    <div class="page-number-container">
      <a
        href=""
        class="page-number"
        v-bind:class="{active: currentPage === index }"
        v-for="(page, index) in totalPages"
        :key="index"
        @click.prevent="$emit('on-update-page', index)"
      >{{ index + 1 }}</a>
    </div>

    <div v-if="currentLength !== limit">
      <a href="" @click.prevent="loadMore()">
        <span v-if="!isLoading">Load more profiles</span>
        <font-awesome-icon v-else icon="spinner" spin/>
      </a>
    </div>

    <div class="disclaimer-text" v-else>
      <span>
        You have reached the limit of {{ limit }} profiles.
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props:{
    isLoading: {
      type: Boolean,
      default() { return false },
    },
    limit:{
      type: Number,
      default() { return null },
    },
    currentPage: {
      type: Number,
      default() { return null },
    },
    totalPages: {
      type: Number,
      default() { return null },
    },
    currentLength: {
      type: Number,
      default() { return null },
    }
  },
  methods: {
    loadMore(){
      this.$emit('load-more');
    }
  }
}
</script>

<style lang="scss" scoped>

  .pagination-container{
    width: 100vw;

    a{
      margin: 20px 0px;
      color: #fff;
      text-decoration: none;
      font-weight: 700;
      display: inline-block;
      padding: 20px;
      background-color: #48ab74;
    }
  }

  .page-number-container{
    .page-number{
      background-color: #e8e6e6;
      color: #000;
      margin: 5px;
      transition: 1s background-color;
    }

    .active {
      border: none;
      background-color: lighten(#3b7d55, 25%);
    }

  }

  .disclaimer-text{
    margin: 30px 0px;
  }

</style>
