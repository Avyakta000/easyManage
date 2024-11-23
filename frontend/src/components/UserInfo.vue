<template>
    <div v-if="user" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
      <h3 class="text-lg font-medium text-gray-700">Your Information</h3>
      <div class="mt-4">
        <label class="block">Name</label>
        <input v-model="user.fullName" class="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
  
        <label class="block mt-4">Email</label>
        <input v-model="user.email" class="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
  
      <div class="mt-6 flex space-x-4">
        <button @click="handleUpdate" class="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
        <button @click="handleDelete" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
    <div v-else class="p-4 text-gray-700">Loading your information...</div>
  </template>
  
  <script>
  export default {
    props: {
      user: Object,
      updateUser: Function,
      deleteUser: Function,
    },
    methods: {

    handleDelete() {
      console.log(this.user, 'user to delete')
      // Emit the delete-user event with the user's id
      this.deleteUser(this.user.id);
    },

    handleUpdate() {
      // Emit the delete-user event with the user's id
      this.updateUser(this.user.id, this.user);
    },
  },
  };
  </script>
  