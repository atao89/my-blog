<template>
  <ul class="navs">
    <li
      :class="{ actived: item.value == currentSelectKey && showBorder }"
      :style="styleObject"
      v-for="item in navList"
      :key="item.value"
      @click="selectHandle(item)"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navs",
  props: {
    styleObject: {
      type: Object,
      default: () => {
        return {
          padding: "10px 0",
          fontSize: "16px",
          color: "rgba(255, 255, 255, 1)",
        };
      },
    },
    showBorder: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentSelectKey: sessionStorage.getItem("openKeys")
        ? JSON.parse(sessionStorage.getItem("openKeys"))
        : "/home",
    };
  },
  watch: {
    // 方式一：
    // 监听,当路由发生变化的时候执行
    $route: {
      handler: function (val) {
        this.currentSelectKey = val.path;
      },
      // 深度观察监听
      deep: true,
    },

    // 或者方式二：
    // watch: {
    //   $route(to, from) {
    //     this.currentSelectKey = to.path;
    //   },
    // },

    // 或者方式三：
    // watch: {
    //   $route: "getPath",
    // },
    // methods: {
    //   getPath() {
    //     console.log(this.$route.path);
    //   },
    // },
  },
  computed: {
    ...mapState("home", ["navList"]),
  },
  methods: {
    // 切换菜单
    selectHandle(item) {
      this.currentSelectKey = item.value;
      this.$router.push(item.value);
      window.sessionStorage.setItem("openKeys", JSON.stringify(item.value));
    },
  },
};
</script>

<style lang="scss" scoped>
.navs {
  display: flex;
  li {
    text-align: center;
    &:not(:first-child) {
      margin-left: 20px;
    }
    &:hover {
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
    &.actived {
      font-weight: bold;
      border-bottom: 2px solid #fff;
    }
  }
}
</style>