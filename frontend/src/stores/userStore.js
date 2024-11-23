// stores/userStore.js
import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from 'vue-toastification';
import { useAuthStore } from "./auth";

const toast = useToast()
export const useUserStore = defineStore("user", {
  state: () => ({
    users: [], // List of users
    error: null, // Error message
    isLoading: false, // Loading state
  }),
  actions: {
    // Fetch all users
    async fetchUsers() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get("/api/users"); // Adjust API endpoint
        this.users.splice(0, this.users.length, ...response.data); // Replaces the array while keeping reactivity intact
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to fetch users";
      } finally {
        this.isLoading = false;
      }
    },
    
    // Invite a new user
    async inviteUser(email) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.post("/api/auth/invite", { email });
        if(response.status===201){
          toast.success(`Invite sent to ${email}`);
        }
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to send invite";
        toast.error(this.error);

      } finally {
        this.isLoading = false;
      }
    },
    
    // Update an existing user
    async updateUser(userId, updatedData) {
      const authStore = useAuthStore(); // Access the auth store
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.put(`/api/users/${userId}`, updatedData); // Adjust API endpoint

        // Check if the user being updated is the logged-in user
        if (authStore.user && authStore.user.id === userId) {
          authStore.setUser({ ...authStore.user, ...response.data }); // Update current user in auth store
          toast.success("Your profile has been updated!");
        } else {
          // Update another user's record
          const index = this.users.findIndex((user) => user.id === userId);
          if (index !== -1) {
            this.users.splice(index, 1, response.data);
          }
          toast.success("User record updated successfully!");
        }
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to update user";
        toast.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
    
    // Delete a user
    async deleteUser(userId) {
      this.isLoading = true;
      this.error = null;
      
      try {
        await axios.delete(`/api/users/${userId}`); // Adjust API endpoint
        // this.users = this.users.filter(user => user.id !== userId);
        
        const index = this.users.findIndex((user) => user.id === userId);
        if (index !== -1) {
          // Remove the user from the array using splice
          this.users.splice(index, 1);
          toast.success("Record Deleted !!!")   
        }
        
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to delete user";
        toast.error(this.error)

      } finally {
        this.isLoading = false;
      }
    },
  },
});
