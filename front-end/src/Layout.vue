<template>
  <div id="layout">
    <header :class="{ home_header: true, is_fixed: isFixed }">
      <div class="container">
        <headers />
      </div>
    </header>
    <div class="banner">
      <div class="container">Banner</div>
    </div>
    <main class="main">
      <div class="container">
        <router-view class="router_view" />
        <div class="side_bar">
          <side-bar />
        </div>
      </div>
    </main>
    <footer class="home_footer">
      <div class="container">
        <footers />
      </div>
    </footer>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Headers from "@components/Headers";
import Footers from "@components/Footers";
import SideBar from "@components/side-bar/SideBar";

export default {
  name: "Layout",
  components: { Headers, Footers, SideBar },
  data() {
    return {
      isFixed: false,
    };
  },
  created() {
    // this.getNavList();
    this.$store.dispatch("home/getNavList");
  },
  methods: {
    ...mapMutations("home", ["getNavList"]),

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
#layout {
  position: relative;
  z-index: 1;
  .home_header {
    width: 100%;
    background: #4183c4;
  }
  .banner {
    height: 150px;
    background: #4183c4;
    margin-bottom: 20px;
  }
  .container {
    width: 80%;
    margin: auto;
  }

  .is_fixed {
    position: fixed;
    z-index: 2;
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
