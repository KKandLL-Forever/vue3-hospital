<script lang="ts" setup>
import MyContent from './pages/MyContent.vue';
</script>

<template>
  <header class="head">
    <img alt="Vue logo" class="logo" height="125" src="./assets/logo.svg" width="125"/>
  </header>
  <section class="section">
    <MyContent></MyContent>
  </section>
</template>

<style>
@import './assets/base.css';

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.section {
  height: 100%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
