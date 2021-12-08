<template>
  <div class="about">
    <p>我是阿涛</p>
    <p>智者一切求自己，愚者一切求他人！</p>
    <p>不要给自己颓废的机会</p>
    <p>仰慕「优雅编码的艺术」。</p>
    <p>坚信熟能生巧，努力改变人生。</p>

    <h3 class="title">联系</h3>
    <ul class="contact">
      <li>GitHub：@atao</li>
      <li>掘金：@atao</li>
      <li>LinkedIn：@atao</li>
      <li>博客：@阿涛</li>
      <li>微博：@atao</li>
      <li>知乎：@atao</li>
      <li>豆瓣：@阿涛</li>
      <li>微信公众号：</li>
    </ul>
    <img
      class="ar_code"
      src="http://r3d25wvet.hn-bkt.clouddn.com/avator.jpeg"
    />

    <h3 class="title">技能</h3>
    <ul class="skill">
      <li>Javascript</li>
      <li>Html</li>
      <li>Css</li>
      <li>NodeJs</li>
      <li>MongoDB</li>
      <li>Php</li>
      <li>Mysql</li>
      <li>微信公众号</li>
      <li>微信小程序</li>
      <li>Vue</li>
      <li>React</li>
      <li>Typescript</li>
      <li>Elementui</li>
      <li>Iview</li>
      <li>Antd</li>
      <li>Express</li>
      <li>Koa</li>
      <li>Flutter</li>
      <li>Electron</li>
      <li>Jquery</li>
      <li>Zepto.js</li>
      <li>Bootstrap</li>
      <li>Mui</li>
      <li>Layui</li>
      <li>Lodash</li>
      <li>H5</li>
      <li>Flex</li>
      <li>Css3</li>
      <li>Animation.css</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="scss" scoped>
.about {
  font-size: 16px;
  background: #fff;
  padding: 20px;
  line-height: 30px;

  .title {
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
    margin-top: 30px;
  }
  .contact {
    padding-left: 15px;
    list-style: disc;
  }
  .ar_code {
    width: 240px;
    height: 240px;
    border: 1px solid #999;
    margin-top: 20px;
  }
  .skill {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 1px 5px;
      border-radius: 5px;
      background: #ddd;
      margin: 0 10px 10px 0;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: #4183c4;
      }
    }
  }
}
</style>