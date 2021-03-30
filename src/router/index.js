import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: () => import("@/components/HelloWorld")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/components/Login")//路由懒加载形式
    }
  ]
});
