<template>
  <div class="notice">
    <div class="type">
      <h2>Notice</h2>
    </div>
    <div class="content">
      <img class="avator-photo" :src="avator" />

      <h3 class="title">{{ title }}</h3>

      <div class="section">
        <p v-for="(item, index) in sectionList" :key="index">{{ item.text }}</p>
      </div>

      <div class="tags">
        <span
          v-for="item in tagsList"
          :key="item.label"
          :style="{ fontSize: item.size + 'px', backgroundColor: item.color }"
          >{{ item.label }}</span
        >
      </div>

      <ul class="contact">
        <li v-for="item in contactList" :key="item.label">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getAuthorInfo } from "@/request/api";

export default {
  name: "Notice",
  data() {
    return {
      avator: "",
      title: "",
      sectionList: [],
      tagsList: [],
      contactList: [],
    };
  },
  created() {
    this.getAuthorInfo();
  },
  methods: {
    getAuthorInfo() {
      getAuthorInfo().then((res) => {
        let objs = res.data[0];
        if (res.code == "1") {
          this.avator = objs.avator;
          this.title = objs.title;
          this.sectionList = objs.section;
          this.tagsList = objs.tags;
          this.contactList = objs.contact;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  .avator-photo {
    display: inline-block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    transition: all 1s;
    border: 1px solid #eee;
    &:hover {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }

  .title {
    margin: 15px 0;
    font-size: 16px;
    transition: all 1s;
    font-weight: 600;
    // &:hover {
    //   transform: scale(1.05);
    //   -webkit-transform: scale(1.05);
    // }
  }

  .section {
    font-size: 14px;
    color: #888;
    p {
      &:not(last-child) {
        margin-bottom: 10px;
      }
    }
  }

  .tags {
    span {
      display: inline-block;
      margin: 2px;
      padding: 5px;
      border-radius: 5px;
      &:hover {
        color: #fff;
      }
    }
  }

  .contact {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    li {
      width: 50%;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
        background: #f5f7f9;
      }
    }
  }
}
</style>