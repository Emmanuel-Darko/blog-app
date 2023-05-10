<template>
    <div class="post-card" v-for="(post, index) in posts" :key="index">
        <h3>{{ post.title }}</h3>
        <span><i> {{ post.slug }} </i></span>
        <p>{{ post.content }}</p>
        <div class="post-bottom">
            <div class="like-buttons">
                <button>👍</button>
                <button>👎</button>
            </div>
            <div>
                <span>{{ getDate(post.date) }}</span> &emsp13; - &emsp13;
                <span>{{ getTime(post.date) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
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
    .post-card{
        width: 50%;
        margin: 30px 0;
        padding: 20px;
        border: 1px solid #ffce6c;
        border-left: 5px solid #ffce6c;
        border-radius: 10px;
        background: #ffffff;
        box-shadow:  20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff;
    }
    .post-card div{
        text-align: right;
    }
    .post-bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .like-buttons button{
        margin: 5px;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        border: 1px solid #ffce6c;
    }
</style>