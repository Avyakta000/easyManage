import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth"; // Import your auth store

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global beforeEach guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // If the route requires authentication, ensure the user is logged in
  if (to.meta.requiresAuth) {
    // Check if authentication is already verified
    if (!authStore.isAuthenticated) {
      try {
        // Call /me to verify authentication
        console.log("to check on page refreshes on requiresAuth path it checks current user");
        await authStore.verifyAuth(); // Assume this method sends a request to /me
      } catch (error) {
        console.error("Failed to verify authentication:", error);
        return next({ name: "Login", query: { redirect: to.fullPath } });
      }
    }
  }

  // Redirect to login if the user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log("if token goes missing, refresh the page, redirect to login");
    return next({ name: "Login", query: { redirect: to.fullPath } });
  }

  // If the route requires a guest user (not authenticated), redirect to Dashboard if already logged in
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: "Dashboard" });
  }

  // Admin access control for the /dashboard/admin route
  if (to.meta.requiresAdmin) {
    const currentUser = authStore.user;

    // If the current user is not an admin, redirect to regular dashboard
    if (currentUser && currentUser.role !== "ADMIN") {
      console.log("unauthorized !!!");
      return next({ name: "Dashboard" }); // Redirect non-admins to the Dashboard
    }
  }

  // Allow navigation to the intended route
  next();
});

export default router;


// works fine
// import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStore } from "@/stores/auth"; // Import your auth store

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: () => import("@/views/Home.vue"),
//   },
//   {
//     path: "/login",
//     name: "Login",
//     component: () => import("@/views/Login.vue"),
//     meta: { requiresGuest: true, skipVerifyAuth: true },
//   },
//   {
//     path: "/signup",
//     name: "Signup",
//     component: () => import("@/views/SignUp.vue"),
//     meta: { requiresGuest: true, skipVerifyAuth: true },
//   },
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     component: () => import("@/views/Dashboard.vue"),
//     meta: { requiresAuth: true },
//     children: [
//       {
//         path: "profile",
//         name: "Profile",
//         component: () => import("@/views/Profile.vue"),
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "reset-password",
//         name: "ChangePassword",
//         component: () => import("@/views/ChangePassword.vue"),
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "admin",
//         name: "Admin",
//         component: () => import("@/views/Admin.vue"),
//         meta: { requiresAuth: true, requiresAdmin: true },
//       },
//     ],
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// // Global beforeEach guard
// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore();

//   if (to.meta.requiresAuth) {
//     // Check if authentication is already verified
//     if (!authStore.isAuthenticated) {
//       try {
//         // Call /me to verify authentication
//         await authStore.verifyAuth(); // Assume this method sends a request to /me
//       } catch (error) {
//         console.error("Failed to verify authentication:", error);
//         return next({ name: "Login", query: { redirect: to.fullPath } });
//       }
//     }
//   }

//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     console.log("here...");
//     return next({ name: "Login", query: { redirect: to.fullPath } });
//   }

//   if (to.meta.requiresGuest && authStore.isAuthenticated) {
//     return next({ name: "Dashboard" });
//   }

//   next();
// });

// export default router;
