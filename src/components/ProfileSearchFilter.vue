<template lang="html">
  <div class="profile-search-filter">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Please input a name to filter by ..."
        v-model="filters.nameFilter"
        @input="updateFilter()"
      >
    </div>
    <div class="sex-filter">
      <label for="">Show profiles of:</label>
      <div class="radio-option">
        <span>Males:</span>
        <input type="radio" value="male" @change="updateFilter()" v-model="filters.sexFilter">
      </div>
      <div class="radio-option">
        <span>Females:</span>
        <input type="radio" value="female" @change="updateFilter()"  v-model="filters.sexFilter">
      </div>
      <div class="radio-option">
        <span>All sexes:</span>
        <input type="radio" value="" @change="updateFilter()" v-model="filters.sexFilter">
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileSearchFilter',
  data(){
    return {
      filters:{
        nameFilter: '',
        sexFilter: '',
      }
    }
  },
  methods:{
    updateFilter(){
      this.$emit('on-filter-updated', {
        nameFilter: this.filters.nameFilter.toLowerCase(),
        sexFilter: this.filters.sexFilter
      });
    }
  }
}
</script>

<style lang="scss" scoped>

  .profile-search-filter{
    width: 100vw;
    min-height: 200px;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    justify-content: center;


    .sex-filter{
      width: 100%;
      margin: 25px 0px;
      .radio-option {
        display: inline-block;
        margin: 0px 10px;
      }
    }

  }

  .search-bar{
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;

    input{
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      font-size: 20px;
    }

    button{
      width: 10%;
      border: none;
      padding: 20px;
      color: #fff;
      font-weight: 700;
      box-sizing: border-box;
      background-color: #69cb8d;
    }

  }

</style>
