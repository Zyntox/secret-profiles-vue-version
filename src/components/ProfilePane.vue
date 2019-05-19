<template lang="html">
  <div>
    <div class="grid-pane">
      <div class="profile-picture-container">
        <div
          class="profile-picture"
          :style="{ backgroundImage:`url( ${profile.picture.large} )`}"
        ></div>
      </div>
      <div class="name-tag">
        <div class="main-info">
          <span>{{ profile.name.first | capitalize }} {{ profile.name.last | capitalize }}</span>
          <span class="sex-icon">
            <font-awesome-icon
              class="male"
              v-if="profile.gender === 'male'"
              icon="mars"
            />
            <font-awesome-icon
              class="female"
              v-else-if="profile.gender === 'female'"
              icon="venus"
            />
          </span>
        </div>
        <div class="sub-info">
          <span class="label">Born</span>
          {{ profile.dob.date | moment("YYYY-MM-DD") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePane',
  props: {
    profile: {
      type: Object,
      default() { return null; },
    },
  },
  filters: {
    capitalize: (value) => {
      if (!value) return '';
      const stringValue = value.toString();
      return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
    },
  },
};
</script>

<style lang="scss" scoped>

  .grid-pane{
    overflow: hidden;
    margin: 15px;
    width: 300px;
    height:370px;
    background-color: #fff;
    border: 1px solid #ececec;

    -webkit-box-shadow: -1px 5px 7px -3px rgba(0,0,0,0.3);
    box-shadow: -1px 5px 7px -3px rgba(0,0,0,0.3);

    .profile-picture-container{
      width: 100%;
      height: 70%;
      box-sizing: border-box;
      .profile-picture{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }

    .name-tag{
      height: 30%;
      padding: 0px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      text-align: left;
      width: 100%;

      .main-info{
        font-weight: 700;
        padding-bottom: 10px;
        border-bottom: 2px solid #9ac76c;

        .sex-icon{
          font-size: 20px;
          margin-left: 10px;
        }

        .female{
          color: #f0a8e2;
        }

        .male{
          color: #6980c1;
        }

      }

      .sub-info{
        padding: 10px 0px;
        font-size: 14px;

        .label{
          font-weight: 600;
        }

      }
    }
  }

</style>
