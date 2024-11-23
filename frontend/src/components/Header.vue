<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white shadow">
    <router-link to="/">
      <span class="text-2xl font-semibold text-indigo-600">Esay</span>
      <span class="text-xl font-medium text-gray-600">Manage</span>
    </router-link>
    <router-link
      v-if="currentUser?.role === 'ADMIN'"
      to="/dashboard"
      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
    >
      Go to Dashboard
    </router-link>
    <!-- <h1 class="text-xl font-semibold text-gray-800">DASHBOARD</h1> -->
    <div class="flex items-center">
      <span class="mr-4 text-lg"
        ><span class="text-indigo-500 font-semibold">Hi, </span>{{ currentUser ? currentUser?.fullName : "Guest" }}</span
      >
      <button
        @click="openInviteModal"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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

    return {
      currentUser,
    };
  },
};
</script>
