<script setup lang="ts"></script>

<template>
  <router-view />
</template>

<script setup>

onMounted(() => {
  window.addEventListener('resize', handleResize)
})


const handleResize = () => {
  const screenWidth = window.innerWidth;

  if (480 < screenWidth < 980) {
    document.body.style.zoom = 0.3
  }
  if (screenWidth <= 480) {
    document.body.style.zoom = 0.2
  }
  if(screenWidth>1280){
    document.body.style.zoom = 1
  }
}



</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: var(--color-bg-1);
  width:100vw;
  height: 100vh;
}
</style>
