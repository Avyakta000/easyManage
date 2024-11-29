import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import ResetPassword from "../views/ResetPassword.vue";
import PasswordResetRequest from "../views/PasswordResetRequest.vue";
import { useRouter } from "vue-router";

import axios from "axios";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { requiresGuest: true, skipVerifyAuth: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/SignUp.vue"),
    meta: { requiresGuest: true, skipVerifyAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/Profile.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "reset-password",
        name: "ChangePassword",
        component: () => import("@/views/ChangePassword.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "admin",
        name: "Admin",
        component: () => import("@/views/Admin.vue"),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
    ],
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    props: (route) => ({ token: route.query.token }),
  },
  {
    path: "/reset-request",
    name: "PasswordResetRequest",
    component: PasswordResetRequest,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(); 
  const router = useRouter();

  // **Check if the route requires authentication** (authenticated user needed)
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log("User is not authenticated, redirecting to login");
    try {
      // verify authentication by calling the backend API (this step ensures the user is still logged in after a page refresh)
      console.log("Verifying authentication on page refresh for requiresAuth paths...");
      const response = await axios.get("/api/auth/me");
      authStore.user = response.data;
      console.log("User authenticated, proceeding to the requested route.");
    } catch (err) {
      console.error("Failed to verify authentication:", err.response?.data?.message || err);
      // redirect to login if authentication check fails
      return next({ name: "Login", query: { redirect: to.fullPath } });
    }
  }

  // **Admin access control** for routes like /dashboard/admin
  if (to.meta.requiresAdmin){
    const currentUser = authStore.user;
    if (currentUser && currentUser.role !== "ADMIN") {
      console.log("Unauthorized access to admin route, redirecting to regular dashboard");
      return next({ name: "Dashboard" }); // redirect non-admin users to regular dashboard
    }
  }

  if (to.meta.requiresGuest  && !router.currentRoute.value.query.redirect ) {

    try {
      // verify authentication by calling the backend API (this step ensures the user is still logged in after a page refresh)
      console.log("Verifying authentication on page refresh for requiresAuth paths...");
      const response = await axios.get("/api/auth/me");
      authStore.user = response.data;
      console.log("User authenticated, proceeding to the requested route.");
      return next({ name: "Dashboard" }); // Redirect authenticated users to the dashboard
    } catch (err) {
      console.error("Failed to verify authentication:", err.response?.data?.message || err);
      // redirect to login if authentication check fails
      // return next({ name: "Login", query: { redirect: to.fullPath } });
    }
  }
  // proceed to the requested route
  console.log("Navigating to:", to.name, to.meta);
  next();
});


export default router;
