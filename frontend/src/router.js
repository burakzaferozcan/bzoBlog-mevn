import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import CreateBlog from "./components/CreateBlog.vue";
import EditBlog from "./components/EditBlog.vue";
import { useAuthStore } from "./stores/authStore";
import BlogDetail from "./components/BlogDetail.vue";
const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/create", component: CreateBlog, meta: { requiresAuth: true } },
  { path: "/edit/:id", component: EditBlog, meta: { requiresAuth: true } },
  { path: "/blog/:id", component: BlogDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { requiresAuth } = to.meta;
  const authStore = useAuthStore();
  if (requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
