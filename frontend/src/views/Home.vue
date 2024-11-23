<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-indigo-50 p-6">
    <!-- Logo Section -->
    <div class="flex items-center space-x-1 mb-8">
      <span class="text-4xl font-bold text-indigo-600">Easy</span> <span class="font-semibold text-gray-600 text-4xl">Manage</span>
    </div>

    <!-- Welcome Section -->
    <div class="text-center">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        Welcome to Easy Manage
      </h2>
      <p class="text-lg text-gray-600 mb-6">
        This is an <b>assessment project</b> built using <b>PostgreSQL, Node.js, Express, Prisma, and Vue.js</b>.
      </p>
      <p class="text-sm text-gray-500 italic mb-10">
        For an improved UI experience, use a desktop view.
      </p>
    </div>

    <!-- Technologies Section -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
      <div class="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
        <img src="/postgres.png" alt="PostgreSQL" class="h-10 mb-2" />
        <p class="text-sm text-gray-700">PostgreSQL</p>
      </div>
      <div class="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
        <img src="/nodejs.png" alt="Node.js" class="h-10 mb-2" />
        <p class="text-sm text-gray-700">Node.js</p>
      </div>
      <div class="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
        <img src="/express.png" alt="Express" class="h-10 mb-2" />
        <p class="text-sm text-gray-700">Express</p>
      </div>
      <div class="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
        <img src="/prisma.png" alt="Prisma" class="h-10 mb-2" />
        <p class="text-sm text-gray-700">Prisma</p>
      </div>
      <div class="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
        <img src="/vuejs.png" alt="Vue.js" class="h-10 mb-2" />
        <p class="text-sm text-gray-700">Vue.js</p>
      </div>
    </div>

    <!-- navigate to Dashboard -->
    <button
      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300"
      @click="navigateToDashboard"
    >
      Go to Dashboard
    </button>

    <!-- Footer Section -->
    <footer class="mt-12 text-center text-gray-500 text-sm">
      <p>Source Code on <a href="https://github.com/Avyakta000/easyManage.git" target="_blank" class="text-indigo-600 hover:underline">GitHub</a></p>
    </footer>
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
