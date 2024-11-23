<template>
  <div class="h-screen">
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Adjust path to your store
import { useUserStore } from "@/stores/userStore";

export default {
  components: {
    Header,
  },
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();

    onMounted(async () => {
      // await authStore.verifyAuth();
      userStore.fetchUsers();

    });
  },
};
</script>

<style>
/* Global styles */
</style>
