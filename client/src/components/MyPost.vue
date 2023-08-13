<template>
    <div class="container">
        <PostCard v-for="(post, index) in posts" :post="post" type="private" :handleEdit="handleEdit" :key="post+index" :handleCloseEdit="handleCloseEdit"/>

        <div class="no-post" v-if="posts.length == 0">
            <h3>No posts made...</h3>
            <router-link to="/home/profile"><h4>Pin your first post 🧷</h4></router-link>
            <img class="pinpost" src="/images/pin.svg" alt="pin">
        </div>

        <div v-if="isEditing" class="overlay">
        
        </div>
    </div>
</template>

<script setup>
    import PostCard from './PostCard.vue';

    import {onBeforeMount, ref, inject} from 'vue'
    import {useRouter} from 'vue-router'
    import axios from 'axios'
    const swal = inject('$swal')
    const route = useRouter()
    let posts = ref([])
    let isEditing = ref(false)

    onBeforeMount(async() => {
        const usertoken = localStorage.getItem('usertoken')
        await axios.get('http://localhost:4000/user/posts', {
            headers:{
                usertoken
            }
        }).then(async (res) => {
            const apiPosts = res.data
            let newPost = []
            Object.keys(apiPosts).forEach((key) => { //Create a new posts object
                // Append active field to the object
                newPost.push({...apiPosts[key], active:false})
            })
            posts.value = newPost
            console.log("posts", newPost);
        }).catch(err => {
            swal.fire({
                icon: 'error',
                text: (err.response? err.response.data : err.message) ,
                confirmButtonText: 'Login',
                confirmButtonColor: '#ffce6c',
                allowOutsideClick: false
            }).then((result) =>{
                if(result.isConfirmed)
                    route.push('/auth/login')
            })
        })
        
    })

    const handleEdit = (postId) => {
        //Posts is an array of objects set during mount
        posts.value.forEach((post,index) => {
            if(post._id == postId){
                posts.value[index].active = true; 
                isEditing.value = true
            }
            else
                posts.value[index].active = false
        })
    }
    const handleCloseEdit = () => {
        isEditing.value = false
        posts.value.forEach((post) => {
            post.active = false
        })
    }
</script>
    
<style lang="css" scoped>
    .container{
        width: 100%;
        height: 100%;
        /* background: red; */
    }
    .no-post{
        margin-top: 50px;
    }
    .pinpost{
        width: 200px;
        position: absolute;
        bottom: 50px;
    }
    .overlay{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0%;
        background-color: #1f1e1d84;
        /* background: rgba(255, 255, 255, 0.2); */
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
</style>