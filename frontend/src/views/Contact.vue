<template>
    <div class="flex flex-col items-center p-6">
      <h1 class="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
      <p class="text-lg text-gray-700 mb-4">If you have any questions, feel free to contact us!</p>
      <form @submit.prevent="handleSubmit" class="w-full max-w-sm">
        <div class="mb-4">
          <label for="name" class="block text-gray-600">Your Name:</label>
          <input type="text" id="name" v-model="name" class="w-full p-2 border rounded-lg mt-2" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-600">Your Email:</label>
          <input type="email" id="email" v-model="email" class="w-full p-2 border rounded-lg mt-2" required />
        </div>
        <button type="submit" class="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Contact',
    data() {
      return {
        name: '',
        email: ''
      };
    },
    methods: {
      handleSubmit() {
        alert(`Thank you for contacting us, ${this.name}!`);
      }
    }
  }
  </script>
  