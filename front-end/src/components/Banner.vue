<template>
  <div class="banner">
    <carousel-3d
      :autoplay="true"
      :navigation="true"
      autoplayTimeout="2000"
      height="180"
      startIndex="2"
      border="0"
    >
      　<slide v-for="(slide, i) in slides" :key="i" :index="i">
        　<template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
          <img
            :data-index="index"
            :class="{
              current: isCurrent,
              onLeft: leftIndex >= 0,
              onRight: rightIndex >= 0,
            }"
            :src="slide.img_url"
            @click="goDetail(slide.article_id)"
          />
        </template>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import { getBanner } from "@/request/api";

export default {
  name: "Banner",
  components: { Carousel3d, Slide },
  data() {
    return {
      slides: [],
    };
  },
  created() {
    this.getslides();
  },
  methods: {
    // 获取banner图
    getslides() {
      getBanner().then((res) => {
        if (res.code == "1") {
          this.slides = res.data;
          this.$nextTick(() => {
            document.querySelector(".carousel-3d-container").style.height =
              "100%";
            document.querySelector(".carousel-3d-container").style.margin =
              "10px auto";
          });
        }
      });
    },
    // 去详情页
    goDetail(id) {
      // this.$router.push({ path: `/detail/${id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: 100%;
  overflow: hidden;
  img {
    cursor: pointer;
  }
}
</style>