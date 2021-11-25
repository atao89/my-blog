<template>
  <div id="app">
    <Snowf
      :amount="50"
      :size="5"
      :speed="1.5"
      :wind="0"
      :opacity="0.8"
      :swing="1"
      :image="null"
      :zIndex="null"
      :resize="true"
      color="#fff"
    />
    <router-view />
  </div>
</template>

<script>
import Snowf from "vue-snowf";

export default {
  name: "App",
  components: { Snowf },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#app {
  background: #ebebeb;
}
</style>
