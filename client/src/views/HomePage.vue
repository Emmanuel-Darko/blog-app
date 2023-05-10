<template>
    <div class="post-main">

        <div class="l-image">
            <img src="/images/landing.jpg" alt="logo">
        </div>

        <ul class="nav">
            <li><router-link :to="{name:'home', params:{id:'allposts'}}"> All Posts </router-link></li>
            <li><router-link  :to="{name:'home', params:{id:'myposts'}}"> My Posts </router-link></li>
            <li><router-link  :to="{name:'home', params:{id:'profile'}}"> Profile </router-link></li>
            <button v-if="postRoute=='profile'" @click="logoutUser()">Log out</button>
        </ul>
        
        <AllPost v-if="postRoute=='allposts'"/>
        <MyPost v-if="postRoute=='myposts'"/>
        <MyProfile v-if="postRoute=='profile'"/>
        
    </div>
</template>

<script>
    import AllPost from '@/components/AllPost.vue'
    import MyPost from '@/components/MyPost.vue'
    import MyProfile from '@/components/MyProfile.vue'
    export default {
        components:{
            AllPost,
            MyPost,
            MyProfile
        },
        data() {
            return {
                postRoute: 'allposts'
            }
        },
        beforeMount() {
            this.$route.params.id == 'allposts' ? this.showAllPosts() : this.$route.params.id == 'myposts' ? this.showMyPosts() : this.showMyProfile()
        },
        watch:{
            $route(to){
                to.params.id == 'allposts' ? this.showAllPosts() : to.params.id == 'myposts' ? this.showMyPosts() : this.showMyProfile()
            }
        },
        methods: {
            showAllPosts(){
                this.postRoute = 'allposts'
            },
            showMyPosts(){
                this.postRoute = 'myposts'
            },
            showMyProfile(){
                this.postRoute = 'profile'
            },
            logoutUser(){
                localStorage.clear('usertoken')
                this.$router.push('/auth/login')
            }
        },
    }
</script>

<style lang="css" scoped>
    .post-main{
        font-family: 'Sono';
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
    }
    .l-image{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 10px;
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