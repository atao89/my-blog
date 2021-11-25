<template>
  <div class="footers">
    <h3>
      <a href="/"> © 2021 atao</a>
    </h3>
    <navs :styleObject="styleObject" :showBorder="false" />
  </div>
</template>

<script>
import Navs from "@components/Navs";

export default {
  name: "Footers",
  components: { Navs },
  data() {
    return {
      styleObject: {
        padding: "10px 0",
        fontSize: "14px",
        color: "rgba(0, 0, 0, 0.8)",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.footers {
  height: 60px;
  display: flex;
  align-items: center;
  h3 {
    color: #000;
    font-size: 14px;
    margin-right: 30px;
    a {
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>