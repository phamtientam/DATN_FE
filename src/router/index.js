import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('is_login') === 'true'; 
  console.log(to) // Kiểm tra trạng thái đăng nhập trong localStorage
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogin) {
      console.log('chua lgin')
      next({ name: 'login' });  // Nếu chưa đăng nhập, chuyển hướng về trang login
    } else {
      next();  
      console.log('da lgin 1')// Nếu đã đăng nhập, cho phép truy cập
    }
  } else {
    console.log('da lgin 2')
    next();  // Cho phép truy cập nếu trang không yêu cầu đăng nhập
  }
});

export default router;
