<template>
  <div id="layout">
    <!-- <header :class="{ home_header: true, is_fixed: isFixed }"> -->
    <header class="home_header">
      <div class="container">
        <headers />
      </div>
    </header>
    <div class="home_banner" v-if="$route.path === '/home'">
      <div class="container">
        <banner />
      </div>
    </div>
    <main class="main">
      <div class="container">
        <router-view class="router_view" />
        <div class="side_bar">
          <component :is="CurrentComponent"></component>
        </div>
      </div>
    </main>
    <footer class="home_footer">
      <div class="container">
        <footers />
      </div>
    </footer>
    <div class="to_top" v-show="showTopBtn" @click="goTop">Top</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Headers from "@components/Headers";
import Footers from "@components/Footers";
import Banner from "@components/Banner";
import SideBar from "@components/side-bar/SideBar";
import Directory from "@components/Directory";

export default {
  name: "Layout",
  components: { Headers, Footers, Banner, SideBar, Directory },
  data() {
    return {
      // isFixed: false,
      showTopBtn: false,
    };
  },
  created() {
    this.getNavList();
    // this.$store.dispatch("home/getNavList");
  },
  computed: {
    CurrentComponent() {
      return this.$route.path.includes("/detail") ? "Directory" : "SideBar";
    },
  },
  methods: {
    ...mapActions("home", ["getNavList"]),

    //监听滚动的事件
    scroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var headerHeight = document.querySelector(".home_header").offsetHeight;
      // console.log("scrollTop：", scrollTop, "headerHeight：", headerHeight);
      //滑动到指定位置菜单吸顶
      if (scrollTop > headerHeight) {
        // this.isFixed = true;
        this.showTopBtn = true;
      } else {
        // this.isFixed = false;
        this.showTopBtn = false;
      }
    },
    // 返回顶部
    goTop() {
      let timer = setInterval(() => {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;

        let ispeed = Math.floor(-scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          scrollTop + ispeed;
        if (scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.scroll);
  },
  mounted() {
    this.$nextTick(function () {
      //滚动监听事件
      window.addEventListener("scroll", this.scroll);
    });
  },
};
</script>

<style lang="scss" scoped>
#layout {
  position: relative;
  z-index: 1;

  .container {
    width: 80%;
    margin: auto;
  }

  .home_header {
    width: 100%;
    background: #4183c4;
  }

  // .is_fixed {
  // position: fixed;
  // z-index: 2;
  // animation: reback 0.4s ease-in forwards;
  // }
  // @keyframes reback {
  //   50% {
  //     background: #000;
  //   }
  //   100% {
  //     background: #4183c4;
  //   }
  // }

  .home_banner {
    height: 200px;
    background: #4183c4;
  }

  .main {
    margin-top: 20px;
  }
  .main .container {
    display: flex;
    justify-content: space-between;
    .router_view {
      flex: 1;
    }
    .side_bar {
      width: 280px;
      margin-left: 20px;
    }
  }

  .home_footer {
    background: #4183c4;
  }

  .to_top {
    position: fixed;
    right: 20px;
    bottom: 20px;
    padding: 10px 5px;
    color: #fff;
    font-weight: 700;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  // 媒体查询，宽度小于1250时的样式
  @media screen and (max-width: 1250px) {
    .container {
      width: 90%;
    }
  }

  // 媒体查询，宽度小于1000时的样式
  @media screen and (max-width: 1000px) {
    .container {
      width: 95%;
    }
  }

  // 媒体查询，宽度小于800时的样式
  @media screen and (max-width: 800px) {
    .container {
      width: 98%;
    }

    .main .container .side_bar {
      display: none;
    }
  }
}
</style>
