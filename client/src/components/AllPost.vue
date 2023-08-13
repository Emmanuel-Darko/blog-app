<template>
    <div class="container">
        <PostCard v-for="post in posts" :post="post" type="public"/>

        <div class="no-post" v-if="posts.length == 0">
            <h3>No posts made...</h3>
            <router-link to="/home/profile"><h4>Pin your first post 🧷</h4></router-link>
            <img class="pinpost" src="/images/pin.svg" alt="pin">
        </div>
    </div>
</template>

<script setup>
    import PostCard from './PostCard.vue';

    import {onBeforeMount, ref, inject} from 'vue'
    import axios from 'axios'
    import {useRouter} from 'vue-router'
    const route = useRouter()
    const swal = inject('$swal')

    let posts = ref([])
    onBeforeMount(() => {
        const usertoken = localStorage.getItem('usertoken')
        axios.get('http://localhost:4000/user/allPosts', {
            headers:{
                usertoken
            }
        }).then(res => {
            posts.value = res.data
        }).catch(err => {
            // alert(err.response.data)
            swal.fire({
                icon: 'error',
                text: err.response.data,
                confirmButtonText: 'Login',
                confirmButtonColor: '#ffce6c',
                allowOutsideClick: false,
                customClass:{
                    text: 'popup-title'
                }
            }).then((result) =>{
                if(result.isConfirmed)
                    route.push('/auth/login')
            })
        })
        
    })

    // custom functions
    const getDate = (date) => {
        const dd = new Date(String(date))
        return dd.toLocaleDateString('en-UK')
    }
    const getTime = (time) => {
        const tt = new Date(String(time))
        return tt.toLocaleTimeString()
    }
</script>
    
<style lang="css" scoped>
    .container{
        width: 100%;
    }
    .no-post{
        margin-top: 50px;
        transition: 0.5s ease-in
    }
    .pinpost{
        width: 200px;
        position: absolute;
        bottom: 50px;
    }
    .popup-title{
        font-family: 'Sono';
        font-size: 30px;
    }
</style>