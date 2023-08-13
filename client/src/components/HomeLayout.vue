<template>
    <div class="container">
        <NavComponent :navList="props.navList" :logoutUser="logoutUser" @componentId="(id) => $emit('componentId', id)"/>
        <Transition name="slide-fade">
            <slot></slot>
        </Transition>
    </div>
</template>

<script setup>
    import NavComponent from './NavComponent.vue';
    const props = defineProps({
        navList: {
            type: Array,
            required: true
        },
        logoutUser: Function
    })
</script>

<style scoped>
    .container{
        font-family: 'Sono';
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
    }
    .slide-fade-enter-active{
        transition: all 0.4s ease-out
    }
    .slide-fade-leave-active{
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-enter-from,
    .slide-fade-leave-to{
        opacity: 0;
        transform: translateY(40px);
    }
</style>