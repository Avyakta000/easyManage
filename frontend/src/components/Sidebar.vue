<template>
  <aside class="w-64 bg-blue-600 text-white flex flex-col">
    <nav class="flex-1 px-4 py-6 space-y-2 text-center">
      <router-link
      v-if="isAdmin"
      to="/dashboard/admin"
      class="block px-4 py-2 rounded-lg hover:bg-blue-700"
      exact-active-class="bg-blue-800"
      >
      Home
    </router-link>
    <router-link
      v-else
      to="/dashboard"
      class="block px-4 py-2 rounded-lg hover:bg-blue-700"
      exact-active-class="bg-blue-800"
    >
      Home
    </router-link>
      <router-link
        to="/dashboard/profile"
        class="block px-4 py-2 rounded-lg hover:bg-blue-700"
        active-class="bg-blue-800"
      >
        Profile
      </router-link>
      <router-link
        to="/dashboard/reset-password"
        class="block px-4 py-2 rounded-lg hover:bg-blue-700"
        active-class="bg-blue-800"
      >
        Change Password
      </router-link>
      <button
        v-if="auth.isAuthenticated"
        @click="handleLogout"
        class="text-white hover:text-gray-300 focus:outline-none"
      >
        Logout
      </button>
    </nav>
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
    const authStore = useAuthStore();
    const currentUser = authStore?.user; // get the current user
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
