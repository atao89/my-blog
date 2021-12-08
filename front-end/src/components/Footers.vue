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
  justify-content: center;
  align-items: center;
  h3 {
    color: #000;
    font-size: 14px;
    margin-right: 50px;
    a {
      text-decoration: none;
      color: inherit;
    }
  }

  // 媒体查询，宽度小于800时的样式
  @media screen and (max-width: 400px) {
    h3 {
      margin-right: 10px;
    }
  }
}
</style>