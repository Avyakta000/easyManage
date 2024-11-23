<template>
  <aside class="fixed h-screen w-64 bg-blue-600 text-white flex flex-col shadow-lg">
    <!-- Logo/Header -->
    <blockquote class="text-white bg-blue-700 italic text-lg font-medium p-4">
      "Security is not a product,  
      but a process."  
      <span class="text-right font-semibold text-gray-300">— Bruce Schneier</span>
    </blockquote>

    <!-- Navigation Section -->
    <nav class="flex-1 px-4 py-6 space-y-4">
      <router-link
        v-if="isAdmin"
        to="/dashboard/admin"
        class="block px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        exact-active-class="bg-blue-800"
      >
        Admin Home
      </router-link>
      <router-link
        v-else
        to="/dashboard"
        class="block px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        exact-active-class="bg-blue-800"
      >
        Home
      </router-link>
      <router-link
        to="/dashboard/profile"
        class="block px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        exact-active-class="bg-blue-800"
      >
        Profile
      </router-link>
      <router-link
        to="/dashboard/reset-password"
        class="block px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        exact-active-class="bg-blue-800"
      >
        Change Password
      </router-link>
      <button
        v-if="auth.isAuthenticated"
        @click="handleLogout"
        class="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-500 transition"
      >
        Logout
      </button>
    </nav>

    <!-- Footer Section -->
    <footer class="px-4 py-4 bg-gray-900 text-center border-t border-blue-500">
      <p class="text-sm">
        © 2024 Easy Manage<br />
        Developed by <span class="font-semibold">Himanshu</span>
      </p>
    </footer>
  </aside>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "Sidebar",

  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    const currentUser = auth.user; // get the current user
    const isAdmin = currentUser?.role === "ADMIN"; // check if the user is an admin

    const handleLogout = () => {
      auth.logout().then(() => {
        router.push("/login");
      });
    };

    return {
      auth,
      handleLogout,
      isAdmin,
    };
  },
};
</script>

<style scoped>
/* Styling for smooth hover transitions */
nav a, nav button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Prevent scrollbar inside sidebar
aside {
  overflow: hidden;
} */
</style>
