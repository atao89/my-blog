<template>
  <div class="search">
    <input
      type="text"
      placeholder="请输入搜索关键字"
      v-model="keywords"
      class="search-input"
      @input="inputHandle"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keywords: "",
    };
  },
  methods: {
    inputHandle(e) {
      // console.log(e.target.value);
      let keyword = e.target.value;
      this.$router.push({ path: "/classify", query: { keyword: keyword } });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  left: 28%;
  .search-input {
    width: 100%;
    line-height: 32px;
    padding-left: 5px;
    border-radius: 5px;
  }
}

// 媒体查询，宽度小于800时的样式
@media screen and (max-width: 1400px) {
  .search {
    left: 25%;
  }
}

// 媒体查询，宽度小于800时的样式
@media screen and (max-width: 1100px) {
  .search {
    left: 20%;
  }
}

// 媒体查询，宽度小于800时的样式
@media screen and (max-width: 870px) {
  .search {
    left: 15%;
  }
}

// 媒体查询，宽度小于800时的样式
@media screen and (max-width: 720px) {
  .search {
    left: 10%;
  }
}

// 媒体查询，宽度小于800时的样式
@media screen and (max-width: 650px) {
  .search-input {
    display: none;
  }
}
</style>