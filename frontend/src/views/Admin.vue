<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Admin Area</h1>
    <p>Manage users and resources here.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <!-- Pass required props to user component -->
      <UserInfo
        v-for="user in users"
        :key="user.id"
        :user="user"
        :update-user="updateUser"
        :delete-user="deleteUser"
      />
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Admin",
  components: {
    UserInfo,
  },
  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const users = userStore.users;
    const isLoading = userStore.isLoading;
    const currentUser = authStore?.user; 
    const isAdmin = currentUser?.role === "ADMIN"; 

    onMounted(async () => {
      await userStore.fetchUsers();
      console.log(users, "dash");
    });

    // Delete user
    const deleteUser = async (userId) => {
      console.log('Deleting user with ID:', userId);
      await userStore.deleteUser(userId);
    };

    // Update user (for regular users)
    const updateUser = async (userId, user) => {
      await userStore.updateUser(userId, user); 
      console.log("Updated user", user);
    };

    return {
      users: userStore.users,
      isLoading,
      deleteUser,
      updateUser,
      currentUser,
      isAdmin,
    };
  },
};
</script>

<style>
.grid {
  margin-top: 16px;
}
</style>
