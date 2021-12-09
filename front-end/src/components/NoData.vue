<template>
  <div class="no-data">
    <div class="content">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "NoData",
};
</script>

<style lang="scss" scoped>
.no-data {
  padding: 50px;
  .content {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #efefef;
    font-size: 16px;
    color: #a9a9a9;
  }
}
</style>