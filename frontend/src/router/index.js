import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth"; 
import ResetPassword from "../views/ResetPassword.vue";
import PasswordResetRequest from "../views/PasswordResetRequest.vue";

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
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    props: (route) => ({ token: route.query.token }),
  },
  {
    path: '/reset-request',
    name: 'PasswordResetRequest',
    component: PasswordResetRequest,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global beforeEach guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // if the route requires authentication, ensure the user is logged in
  if (to.meta.requiresAuth) {
    // check if authentication is already verified
    if (!authStore.isAuthenticated) {
      try {
        // call /me to verify authentication
        console.log("to check on page refreshes on requiresAuth path it checks current user");
        await authStore.verifyAuth(); 
      } catch (error) {
        console.error("Failed to verify authentication:", error);
        return next({ name: "Login", query: { redirect: to.fullPath } });
      }
    }
  }

  // redirect to login if the user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log("if token goes missing, refresh the page, redirect to login");
    return next({ name: "Login", query: { redirect: to.fullPath } });
  }

  // if the route requires a guest user (not authenticated), redirect to Dashboard if already logged in
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: "Dashboard" });
  }

  // admin access control for the /dashboard/admin route
  if (to.meta.requiresAdmin) {
    const currentUser = authStore.user;

    // if the current user is not an admin, redirect to regular dashboard
    if (currentUser && currentUser.role !== "ADMIN") {
      console.log("unauthorized !!!");
      return next({ name: "Dashboard" }); // redirect non-admins to the Dashboard
    }
  }

  // allow navigation to the intended route
  next();
});

export default router;
