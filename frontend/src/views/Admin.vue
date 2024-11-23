<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Admin Area</h1>
    <p>Manage users and resources here.</p>

    <!-- Search Box with Submit Button -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search users..."
        class="border border-gray-300 rounded p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        @click="searchUsers"
        class="bg-indigo-600 text-white p-2 mt-2 mx-2 w-full md:w-auto rounded"
      >
        Search
      </button>
    </div>

    <!-- Two Sections -->
    <div class="flex flex-wrap md:flex-nowrap gap-6">
      <!-- Left Section: Search Results -->
      <div class="flex-1 border border-gray-200 rounded p-4">
        <h2 class="text-xl font-semibold mb-4">Search Results</h2>
        <div v-if="searchResults.length">
          <UserInfo
            v-for="user in searchResults"
            :key="user.id"
            :user="user"
            :update-user="updateUser"
            :delete-user="deleteUser"
          />
        </div>
        <div v-else class="text-center text-gray-500">
          <p v-if="isLoading && searchQuery">No results found.</p>
          <p v-else-if="isLoading">Searching...</p>
          <p v-else>Type in the search box and click 'Search' to find users.</p>
        </div>
      </div>

      <!-- Right Section: All Users -->
      <div class="flex-1 border border-gray-200 rounded space-y-2 p-4">
        <h2 class="text-xl text-center font-semibold mb-4">All Users</h2>
        <UserInfo
          v-for="user in users"
          :key="user.id"
          :user="user"
          :update-user="updateUser"
          :delete-user="deleteUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "Admin",
  components: {
    UserInfo,
  },
  setup() {
    const userStore = useUserStore();
    const searchQuery = ref(""); 
    const searchResults = ref([]); 
    const isLoading = ref(false);

    // fetch all users when the component is mounted
    onMounted(async () => {
      await userStore.fetchUsers();
    });

    // search users based on the query
    const searchUsers = async () => {
      if (!searchQuery.value.trim()) {
        searchResults.value = []; // clear search results if query is empty
        return;
      }

      isLoading.value = true;
      try {
        searchResults.value = await userStore.searchUsers(searchQuery.value);
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        isLoading.value = false;
      }
    };

    // delete a user
    const deleteUser = async (userId) => {
      await userStore.deleteUser(userId);
      await userStore.fetchUsers(); // refresh the list of all users
    };

    // update a user
    const updateUser = async (userId, updatedData) => {
      await userStore.updateUser(userId, updatedData);
      await userStore.fetchUsers(); // refresh the list of all users
    };

    return {
      searchQuery,
      users: userStore.users,
      searchResults,
      searchUsers,
      isLoading,
      deleteUser,
      updateUser,
    };
  },
};
</script>

<style>
</style>


<!-- works fine -->
<!-- <template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Admin Area</h1>
    <p>Manage users and resources here.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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

</style> -->
