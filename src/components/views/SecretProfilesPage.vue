<template lang="html">
  <div class="secret-profiles-page">
    <ProfileSearchFilter
      @on-filter-updated="updateFilters"
    ></ProfileSearchFilter>
    <div class="meta-data">
      Currently displaying:
      {{ amountOfActiveProfiles }} of {{ currentlyLoadedProfiles.length }} profiles.
    </div>
    <div
      class="loading-container"
      v-if="loader.isLoading && currentlyLoadedProfiles.length === 0"
    >
      <font-awesome-icon icon="spinner" spin/>
      <span>Loading</span>
    </div>
    <div v-else>
      <div v-if="loader.status === 'success'">
        <ProfilesGrid>
            <ProfilePane
              v-for="(profile, index) in activeProfiles[currentPage]"
              :key="index"
              :profile="profile"
            ></ProfilePane>
          <Pagination
            :isLoading="loader.isLoading"
            :limit="profileLimit"
            :currentPage="currentPage"
            :totalPages="this.activeProfiles.length"
            :currentLength="currentlyLoadedProfiles.length"
            @load-more="fetchProfileData(page)"
            @on-update-page="updatePage">
          </Pagination>
        </ProfilesGrid>
      </div>
      <div class="error-container" v-else>
        <font-awesome-icon icon="frown-open" size="4x"/>
        <div class="text">
          <p>
            The profiles could not be loaded at this moment.<br>
            please try again later.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProfilesGrid from '@/components/ProfilesGrid.vue';
import ProfilePane from '@/components/ProfilePane.vue';
import ProfileSearchFilter from '@/components/ProfileSearchFilter.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'SecretProfilePage',
  components: {
    ProfileSearchFilter,
    ProfilesGrid,
    ProfilePane,
    Pagination,
  },
  data() {
    return {
      currentPage: 0,
      page: 1,
      profileLimit: 200,
      currentlyLoadedProfiles: [],
      activeProfiles: [],
      loader: {
        status: '',
        isLoading: true,
      },
      activeFilters: {},
    };
  },
  methods: {
    updatePage(newPage){
      this.currentPage = newPage;
    },
    updateFilters(newfilters){
      this.activeFilters = newfilters;
      this.currentPage = 0;
      this.filterProfiles();
    },
    fetchProfileData(page) {
      this.loader.isLoading = true;
      axios.get(`https://randomuser.me/api/?results=40&page=${page}`)
        .then((response) => {
          this.loader.isLoading = false;
          this.loader.status = 'success';
          response.data.results.forEach((item) => {
            // Check if we are below the limit.
            if(this.currentlyLoadedProfiles.length < this.profileLimit){
              this.currentlyLoadedProfiles.push(item);
            }
          })
          this.filterProfiles();
          this.page += 1;
        })
        .catch((error) => {
          console.log(error);
          this.loader.isLoading = false;
          this.loader.status = 'failed';
        });
    },
    paginateProfiles(){
      var tempArray = [];

      while(this.activeProfiles.length){
        tempArray.push(this.activeProfiles.splice(0, 40));
      }

      this.activeProfiles = tempArray;

    },
    filterProfiles(){
      this.activeProfiles = this.currentlyLoadedProfiles;

      // Filter for looking up profiles by substring.
      this.activeProfiles = this.activeProfiles.filter((profile) => {
        // If the filter doesnt contain any filter value, return all as passing.
        if (!this.activeFilters.nameFilter || this.activeFilters.nameFilter.length === 0){
          return profile
        }
        if(profile.name.first.includes(this.activeFilters.nameFilter) || profile.name.last.includes(this.activeFilters.nameFilter)){
          return profile;
        }
      })

      // Filter for limiting profiles by their gender.
      this.activeProfiles = this.activeProfiles.filter((profile) => {
        if (!this.activeFilters.sexFilter || this.activeFilters.sexFilter.length === 0){
          return profile
        }
        if(profile.gender === this.activeFilters.sexFilter){
          return profile;
        }
      })

      this.paginateProfiles();

    }
  },
  computed:{
    amountOfActiveProfiles(){
      var sum = 0;
      for (var i = 0; i < this.activeProfiles.length; i++){
        sum += this.activeProfiles[i].length;
      }
      return sum;
    }
  },
  beforeMount() {
    this.fetchProfileData(this.page);
  },
};
</script>

<style lang="scss" scoped>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .secret-profiles-page{
    min-height: calc(100vh - 50px);
    background-color: #f7f7f7;

    .loading-container{
      width: 100vw;
      height: calc(100vh - 280px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;

      span{
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
      }
    }

    .error-container{
      width: 100vw;
      height: calc(100vh - 50px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

        .text{
          font-size: 20px;
          margin: 20px 0px;
          max-width: 450px;
        }
    }

    .meta-data{
      display: inline-block;
      margin: 20px 0px;
    }

  }



</style>
