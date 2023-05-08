<template>
    <div class="landing">
        <div class="l-body">
            <h1 class="heading">kode's blog...</h1>
            <div class="l-image">
                <img src="/images/landing.jpg" alt="logo">
            </div>
            <div class="l-buttons">
                <router-link :to="{name:'auth', params:{id:'register'}}"><button>Register</button></router-link>
                <router-link :to="{name:'auth', params:{id:'login'}}"><button>Login</button></router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
    *{
        font-family: 'Sono';
        box-sizing: border-box;
    }
    .landing{
        height: 100vh;
        background: linear-gradient(
            to bottom,
            rgb(225, 225, 225),
            #fff,
            #fff,
            rgb(225, 225, 225),
            #ffce6c
        );
        z-index: 1;
    }
    .l-body{
        display: flex;
        height: 70vh;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .l-body .heading{
        /* color: #ffce6c; */
        filter: drop-shadow(0 0 5px #d1bba1);
    }
    .l-image{
        width: 300px;
        height: 300px;
        border-radius: 50%;
        overflow: hidden;
        /* background: #ffce6c; */
        box-shadow:  5px 5px 9px #d1bba1,
        -5px -5px 9px #ffffe7;
    }
    .l-image img{
        width: auto;
        height: 100%;
        margin-left: -60%;
    }
    .l-buttons{
        display: flex;
        flex-direction: row;
        gap: 30px;
    }
    .l-buttons button{
        padding: 10px 20px;
        width: 150px;
        border: none;
        font-size: 20px;
        font-weight: 900;
        border-radius: 20px;
        cursor: pointer;
        background: #ffce6c;
        box-shadow:  5px 5px 9px #d1bba1,
        -5px -5px 9px #ffffe7;
    }
    .l-buttons a button{
        color: #fff;
        text-decoration: none;
    }
    .l-buttons button:hover{
        box-shadow: none;
        border: 2px solid #ffce6c;
    }



</style>