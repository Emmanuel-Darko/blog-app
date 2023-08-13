<template>
    <div class="container">
        <div class="l-image">
            <img src="/images/landing.jpg" alt="logo">
        </div>

        <ul class="nav">
            <li v-for="(nav, index) in navList" @click="$emit('componentId', nav.link)" :key="nav+index">
                <router-link :to="{name: nav.name, params:{id:nav.link}}"> {{ nav.title }} </router-link>
            </li>
            <button @click="props.logoutUser">Log out</button>
        </ul>
    </div>
</template>

<script setup>
    const props = defineProps({
        navList: {
            type: Array,
            required: true
        },
        logoutUser: Function
    })
</script>

<style lang="css" scoped>
    .container{
        font-family: 'Sono';
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 20px 0;
    }
    .l-image{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 10px;
        overflow: hidden;
        box-shadow:  5px 5px 9px #d1bba1,
        -5px -5px 9px #ffffe7;
        z-index: 1;
    }
    .l-image img{
        width: auto;
        height: 100%;
        margin-left: -60%;
    }
    ul.nav{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        list-style: none;
        margin: 0;
        padding: 10px;
        /* border: 1px solid; */
        /* box-shadow:  20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff; */
    }
    ul.nav li a{
        font-size: large; 
        font-weight: 600;
        text-decoration: none;
        color: black;
        padding: 10px;
        transition: 0.2s;
        border: 2px solid #ffce6c;
        box-shadow:  20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff;
    }
    ul.nav li a:hover{
        box-shadow: none;
        border-width: 3px;
    }
    .router-link-exact-active{
        background-color: #fdc659;
        box-shadow: none;
        text-decoration: none;
    }
    .nav button{
        font-family: 'Sono';
        position: absolute;
        right: 50px;
        margin-top: -3px;
        width: 100px;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background: #ffce6c;
        box-shadow: 20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff;
    }
    .nav button:hover{
        box-shadow: none;
    }
</style>