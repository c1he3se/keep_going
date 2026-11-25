<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'


</script>

<template>
    <div class="app-layout">
   <div class="back">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
   </div>
</template>

<style>
  .back {
     background-color: #EDEAE3;
     width: 100%;
     max-width: 1360px;
     margin: 0 auto;
     flex: 1;
     border: solid 3px black;
     border-radius: 20px;
  }
  .app-layout {
    padding: 32px;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    .back {
      border: none;
      background-color: #E4E1D9;
    }
  }
</style>