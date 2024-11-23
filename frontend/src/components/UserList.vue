<template>
    <div>
      <!-- Users List -->
      <div v-if="!isLoading && users.length" class="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Users</h3>
        <ul class="space-y-4">
          <li v-for="user in users" :key="user.id" class="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">{{ user.fullName }}</h4>
              <p class="text-sm text-gray-600">{{ user.email }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="openEditModal(user)"
                class="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition duration-200"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
  
      <div v-else-if="isLoading" class="p-6 text-center">
        <p class="text-lg text-gray-500">Loading users...</p>
      </div>
  
      <div v-else class="p-6 text-center">
        <p class="text-lg text-gray-500">No users found.</p>
      </div>
  
      <!-- Edit Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Edit User</h3>
          <form @submit.prevent="saveEdit">
            <div class="mb-4">
              <label class="block text-gray-700">Full Name</label>
              <input 
                v-model="selectedUser.fullName" 
                type="text" 
                class="w-full p-2 border rounded-md focus:ring focus:ring-yellow-200"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Email</label>
              <input 
                v-model="selectedUser.email" 
                type="email" 
                class="w-full p-2 border rounded-md focus:ring focus:ring-yellow-200"
                disabled
              />
            </div>
            <div class="flex justify-end gap-2">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserList",
  
    props: {
      users: Array,
      isLoading: Boolean,
      deleteUser: Function,
      editUser: Function,
    },
  
    data() {
      return {
        isModalOpen: false,
        selectedUser: null, // Holds the user being edited
      };
    },
  
    methods: {
      openEditModal(user) {
        this.selectedUser = { ...user }; // Clone user data to avoid direct mutation
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
        this.selectedUser = null;
      },
      saveEdit() {
        if (this.selectedUser) {
          this.editUser(this.selectedUser);
        }
        this.closeModal();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optional custom modal styles */
  </style>
  