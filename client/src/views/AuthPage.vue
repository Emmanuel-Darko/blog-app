<template>
    <div class="auth">
        <router-link to="/"><img class="home-icon" src="/images/home_icon.png" alt="home"></router-link>
        <form action="">
            <h2>{{title}}</h2>
            <div class="inputs">
                <input type="email" placeholder="email"><br>
                <input type="password" placeholder="password">
                <input type="password" placeholder="confirm pass">
            </div>
            <input type="button" :value="title">
            
            <h5 v-if="title == 'Register'"><router-link :to="{name:'auth', params:{id:'login'}}">Already have an account, Log in?</router-link></h5>
            <h5 v-else><router-link :to="{name:'auth', params:{id:'register'}}">Don't have an account, Register?</router-link></h5>
        </form>
        <img v-if="title=='Login'" class="auth-img" src="/images/auth_img.svg" alt="img">
        <img v-else class="auth-img2" src="/images/auth_img2.svg" alt="img">
    </div>
</template>

<script>
    export default {
        data(){
            return{
                title:""
            }
        },
        beforeMount(){
            this.$route.params.id == 'login' ? this.showLogin() : this.showRegister()
        },
        watch:{
            $route (to){
                to.params.id == 'login' ? this.showLogin() : this.showRegister()
            }
        },
        methods:{
            showLogin(){
                this.title = "Login"
            },
            showRegister(){
                this.title = "Register"
            }
        }
    }
</script>

<style lang="css" scoped>
    *{
        box-sizing: border-box;
        font-family: Sono;
    }
    .auth{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .home-icon{
        position: absolute;
        width: 50px;
        top: 30px;
        left: 30px;
        /* background-color: #ffce6c; */
        /* filter: drop-shadow(0 0 5px #d1bba1); */
        filter: drop-shadow(10px 10px 90px #d1bba1);
    }
    .home-icon:hover{
        box-shadow: none;
    }
    .auth form{
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        align-items:center;
        width: 30%;
        height: 50vh;
        padding: 20px;
        border-radius: 20px;
        background-color: #ffce6c;
        box-shadow:  5px 5px 9px #d1bba1,
        -5px -5px 9px #ffffe7;
    }
    .auth form .inputs{
        /* margin-top: -50px; */
        display: flex;
        flex-direction: column;
        place-items: 'center';
        gap: 6px;
    }
    .auth form .inputs input{
        width: '100%';
        padding: 10px;
        border-radius: 10px;
    }
    .auth form h5{
        /* color: #0000EE ;
        text-decoration: underline; */
    }
    .auth-img{
        width: 30%;
        right: 0;
        position: absolute;
    }
    .auth-img2{
        width: 30%;
        bottom: 1%;
        left:0;
        position: absolute;
    }
</style>