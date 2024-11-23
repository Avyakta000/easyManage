<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
    <!-- Header Section -->
    <h1 class="text-5xl font-bold text-green-600 mb-6">
      Welcome to Our Application!
    </h1>
    <p class="text-lg text-gray-800 text-center max-w-3xl mb-8">
      This application helps you manage your tasks efficiently, track progress, and access a personalized dashboard. 
      Start exploring to unlock the full potential of your productivity!
    </p>

    <!-- Features Section -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Feature 1</h2>
        <p class="text-gray-600">Description of Feature 1 that helps you stay organized.</p>
      </div>
      <div class="p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Feature 2</h2>
        <p class="text-gray-600">Description of Feature 2 for enhanced productivity.</p>
      </div>
      <div class="p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Feature 3</h2>
        <p class="text-gray-600">Description of Feature 3 to keep your data secure.</p>
      </div>
    </div> -->

    <!-- Call to Action Button -->
    <button
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300"
      @click="navigateToDashboard"
    >
      Go to Dashboard
    </button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Home",
  setup() {
    const router = useRouter();

    const navigateToDashboard = () => {
      router.push("/dashboard");
    };

    return {
      navigateToDashboard,
    };
  },
};
</script>

<style scoped>

</style>
