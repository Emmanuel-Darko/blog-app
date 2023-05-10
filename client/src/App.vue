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
  <RouterView :showToast="showToast" :toast="toast"/>
  <ToastComponent :toast="toast"/>
</template>

<style scoped>
</style>
