<template>
  <div class="home">
    <header :class="{ home_header: true, is_fixed: isFixed }">
      <div class="container">
        <headers />
      </div>
    </header>
    <div class="banner">
      <div class="container">Banner</div>
    </div>
    <main>
      <div class="container">
        <router-view />
      </div>
    </main>
    <footer>
      <div class="container">
        <footers />
      </div>
    </footer>
  </div>
</template>

<script>
import Headers from "../components/Headers";
import Footers from "../components/Footers";

export default {
  name: "Home",
  components: { Headers, Footers },
  data() {
    return {
      isFixed: false,
    };
  },
  methods: {
    //监听滚动的事件
    menu() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var headerHeight = document.querySelector(".home_header").offsetHeight;
      // console.log("scrollTop：", scrollTop, "headerHeight：", headerHeight);
      //滑动到指定位置菜单吸顶
      if (scrollTop > headerHeight) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.menu);
  },
  mounted() {
    this.$nextTick(function () {
      //滚动监听事件
      window.addEventListener("scroll", this.menu);
    });
  },
};
</script>

<style lang="scss" scoped>
.home {
  .home_header {
    width: 100%;
    background: #4183c4;
  }
  .banner {
    height: 150px;
    background: #4183c4;
    margin-bottom: 50px;
  }
  .container {
    width: 80%;
    margin: auto;
  }

  .is_fixed {
    position: fixed;
    z-index: 1;
    animation: reback 0.4s ease-in forwards;
  }
  @keyframes reback {
    50% {
      background: #000;
    }
    100% {
      background: #4183c4;
    }
  }
}
</style>
