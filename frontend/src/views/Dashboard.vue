<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header :openInviteModal="openInviteModal" />

      <!-- Content -->
      <main class="flex-1 p-6">
        <p v-if="isDashboardRoute">Welcome to your dashboard!</p>
        <router-view />
        <!-- Child components (Profile, Reset Password) will render here -->
      </main>
    </div>

    <!-- Invite User Modal -->
    <UserInviteModal
      :isInviteModalOpen="isInviteModalOpen"
      :closeInviteModal="closeInviteModal"
      :inviteUser="inviteUser"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import UserList from "@/components/UserList.vue";
import UserInviteModal from "@/components/UserInviteModal.vue";
import UserInfo from "@/components/UserInfo.vue"; // Import the UserInfo component

export default {
  name: "Dashboard",

  components: {
    Sidebar,
    Header,
    UserList,
    UserInviteModal,
    UserInfo, // Register the UserInfo component
  },

  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const route = useRoute();
    const users = userStore.users;
    const isLoading = userStore.isLoading;
    const isInviteModalOpen = ref(false);
    const inviteEmail = ref("");
    const currentUser = authStore?.user; // Get the current user
    const isAdmin = currentUser?.role === "ADMIN"; // Check if the user is an admin

    const isDashboardRoute = computed(() => {
      return route.path === "/dashboard"; // Only show the welcome message if on /dashboard
    });

    onMounted(async () => {
      await userStore.fetchUsers();
      console.log(users, "dash");
    });

    // Open Invite User Modal
    const openInviteModal = () => {
      isInviteModalOpen.value = true;
    };

    // Close Invite User Modal
    const closeInviteModal = () => {
      isInviteModalOpen.value = false;
    };

    // Invite user by email
    const inviteUser = async (email) => {
      console.log(inviteEmail.value, email, "invite email");
      await userStore.inviteUser(email);
      inviteEmail.value = "";
      closeInviteModal();
    };

    // Delete user
    const deleteUser = async (userId) => {
      await userStore.deleteUser(userId);
    };

    // Update user (for regular users)
    const updateUser = async (user) => {
      await userStore.updateUser(user.id, user); // Call Pinia store action
      console.log("Updated user", user);
    };

    return {
      users: userStore.users,
      isLoading,
      isInviteModalOpen,
      inviteEmail,
      openInviteModal,
      closeInviteModal,
      inviteUser,
      deleteUser,
      updateUser,
      currentUser,
      isAdmin, // Make sure isAdmin is accessible for conditional rendering
      isDashboardRoute
    };
  },
};
</script>
