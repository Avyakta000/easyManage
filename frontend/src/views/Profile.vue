<template>
  <div class="flex h-full flex-col justify-center items-center bg-gray-700 rounded-lg">
    <!-- Heading -->
    <h2 class="text-2xl md:text-3xl font-bold text-gray-50 text-center mb-6">
      Edit Your Profile
    </h2>

    <!-- Form Container -->
    <div class="w-full max-w-sm md:max-w-lg rounded-lg p-6">
      <form @submit.prevent="updateProfile" class="space-y-4">
        <!-- Full Name Input -->
        <div>
          <label for="fullName" class="block text-gray-50 font-medium mb-2">Full Name</label>
          <input
            id="fullName"
            v-model="profile.fullName"
            type="text"
            class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your full name"
          />
        </div>

        <!-- Email Input -->
        <div>
          <label for="email" class="block text-gray-50 font-medium mb-2">Email</label>
          <input
            id="email"
            v-model="profile.email"
            type="email"
            class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <!-- Save Button -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
            :disabled="userStore.isLoading"
          >
          {{ userStore.isLoading ? "saving changes..." : "Save Changes" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import { useUserStore } from "@/stores/userStore";
  
  export default {
    name: "Profile",
    setup() {
      const auth = useAuthStore();
      const userStore = useUserStore();
      const profile = ref({
        fullName: "",
        email: "",
      });
  
      // Fetch user details from auth store
      onMounted(() => {
        if (auth.user) {
          profile.value.fullName = auth.user.fullName || "";
          profile.value.email = auth.user.email || "";
        }
      });
  
      // Update profile handler
      const updateProfile = async () => {
       
          const updatedData = { ...profile.value };
          await userStore.updateUser(auth.user.id, updatedData);
      };
  
      return {
        profile,
        updateProfile,
        userStore,
      };
    },
  };
  </script>
  