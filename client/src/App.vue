<script setup>
  import {ref} from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import ToastComponent from './components/ToastComponent.vue';
  let toast = ref({
    msg: '',
    toastState: ''
  })
  const showToast = (msg, toastState) =>{
    toast.value = {msg, toastState}
    setTimeout(()=>{toast.value = ''},5000)
  }
</script>

<template>
  <Transition name="slide-fade">
    <RouterView :showToast="showToast" :toast="toast"/>
  </Transition>
  <ToastComponent :toast="toast"/>
</template>

<style scoped>
  .slide-fade-enter-active{ transition: all 0.8s ease-out; }
  .slide-fade-leave-active{ transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1); }
  .slide-fade-enter-from{
    opacity: 0;
    transform: translateX(200px);
  }
  .slide-fade-leave-to{
    opacity: 0.5;
    transform: translateX(-200px);
  }
</style>
