<template>
  <div class="h-screen">
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },
 
};
</script>

<style>
/* Global styles */
</style>
