<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white shadow lg:flex-row flex-col">
    <!-- Logo -->
    <router-link to="/" class="flex items-center mb-4 space-x-1 lg:mb-0">
      <span class="text-2xl font-semibold text-indigo-600">Easy</span>
      <span class="text-xl font-medium text-gray-800">Manage</span>
    </router-link>

    <!-- Dashboard Link (visible for Admin) -->
    <router-link
      v-if="currentUser?.role === 'ADMIN'"
      to="/dashboard"
      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 mb-4 lg:mb-0"
    >
      Go to Dashboard
    </router-link>

    

    <!-- User Info & Invite Button -->
    <div class="flex items-center justify-around space-x-2">
      <!-- Display User's Name and Greeting -->
      <span class="mr-4 text-lg">
        <span class="text-indigo-500 font-semibold">Hi, </span>{{ currentUser ? currentUser?.fullName : "Guest" }}
      </span>

      <a
      href='https://timly.quicklit.in/dashboard'      class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300 mb-4 lg:mb-0"
    >
      Go back to <span class="font-bold">timly</span>
    </a>
      <!-- Invite User Button -->
      <button
        @click="openInviteModal"
        class="px-4 py-2 font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mr-4"
      >
        Invite a User
      </button>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Header",

  props: {
    openInviteModal: Function,
  },

  setup() {
    const authStore = useAuthStore();
    const currentUser = authStore?.user;

    const handleLogout = () => {
      authStore.logout(); // Call logout function (assuming it's defined in the auth store)
    };

    return {
      currentUser,
      handleLogout,
    };
  },
};
</script>
