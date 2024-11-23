<template>
  <div class="flex h-full flex-col justify-center items-center bg-gray-700 rounded-lg">

    <h2 class="text-2xl font-bold text-gray-50 mb-4">Change Password</h2>
    <form @submit.prevent="changePassword" class="w-full">
      <div class="max-w-lg mx-auto space-y-4">
        <!-- Current Password -->
        <div class="space-y-2">
          <label class="block text-gray-50 font-medium">Current Password</label>
          <input
            v-model="password.currentPassword"
            type="password"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current password"
          />
        </div>
        
        <!-- New Password -->
        <div class="space-y-2">
          <label class="block text-gray-50 font-medium">New Password</label>
          <input
            v-model="password.newPassword"
            type="password"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
        </div>
        
        <!-- Confirm New Password -->
        <div class="space-y-2">
          <label class="block text-gray-50 font-medium">Confirm New Password</label>
          <input
            v-model="password.confirmPassword"
            type="password"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
          />
        </div>
        <!-- Error Message -->
        <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
        <!-- Submit Button -->
        <button
          type="submit"
          class="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
          :disabled="isLoading"
        >
          {{isLoading ? "updating..." : "Change Password"}}
        </button>
      </div>


    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios"; 
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router'; 

export default {
  name: "ChangePassword",
  setup() {
    const toast = useToast();
    const router = useRouter(); 
    
    const password = ref({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    const error = ref("");
    const isLoading = ref(false);

    const changePassword = async () => {
      // Clear any previous errors
      error.value = "";

      // Validate the form
      if (password.value.newPassword !== password.value.confirmPassword) {
        error.value = "New passwords do not match!";
        return;
      }
      isLoading.value = true;

      try {
        // Make API call to backend to change the password
        const response = await axios.put("/api/auth/change-password", {
          currentPassword: password.value.currentPassword,
          newPassword: password.value.newPassword,
        });
        if(response.status===200){
          password.value.currentPassword = '';
          password.value.newPassword = '';
          password.value.confirmPassword = '';
          toast.success("Password changed successfully!");
        }
        router.push('/dashboard')
      } catch (err) {
          toast.error("Error changing password!");
      } finally{
        isLoading.value = false;
      }
    };

    return { password, changePassword, error, isLoading };
  },
};
</script>
