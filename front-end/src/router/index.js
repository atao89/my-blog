import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: '/home',
    name: "Layout",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../Layout.vue"),
    // component: resolve => require(['../Layout.vue'], resolve)
    children: [
      {
        path: "/home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
        // component: resolve => require(['@v/Home.vue'], resolve)
      },
      {
        path: "/classify",
        name: "Classify",
        component: () =>
          import(/* webpackChunkName: "classify" */ "../views/Classify.vue"),
        // component: resolve => require(['@v/Classify.vue'], resolve)
      },
      {
        path: "/archive",
        name: "Archive",
        component: () =>
          import(/* webpackChunkName: "archive" */ "../views/Archive.vue"),
        // component: resolve => require(['@v/Archive.vue'], resolve)
      },
      {
        path: "/link",
        name: "Link",
        component: () =>
          import(/* webpackChunkName: "link" */ "../views/Link.vue"),
        // component: resolve => require(['@v/Link.vue'], resolve)
      },
      {
        path: "/about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        // component: resolve => require(['@v/About.vue'], resolve)
      }
    ]
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
    // component: resolve => require(['@v/Detail.vue'], resolve)
  },
];

// 以下代码解决路由地址重复点击的报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
