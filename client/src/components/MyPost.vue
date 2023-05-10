<template>
    <div class="post-card" v-for="(post, index) in posts" :key="index">
        <h3>{{ post.title }}</h3>
        <span><i> {{ post.slug }} </i></span>
        <p>{{ post.content }}</p>
        <div class="post-bottom">
            <div class="like-buttons">
                <button disabled>👍 0</button>
                <button disabled>👎 0</button>
            </div>
            <div>
                <span>{{ getDate(post.date) }}</span> &emsp13; - &emsp13;
                <span>{{ getTime(post.date) }}</span>
            </div>
        </div>
    </div>
    <div class="no-post" v-if="posts.length == 0">
        <h3>No posts made...</h3>
        <router-link to="/home/profile"><h4>Pin your first post 🧷</h4></router-link>
        <img class="pinpost" src="/images/pin.svg" alt="pin">
    </div>
</template>

<script setup>
    import {onBeforeMount, ref} from 'vue'
    import axios from 'axios'

    let posts = ref([])
    onBeforeMount(() => {
        const usertoken = localStorage.getItem('usertoken')
        axios.get('http://localhost:4000/user/posts', {
            headers:{
                usertoken
            }
        }).then(res => {
            posts.value = res.data
        }).catch(err => {
            // alert(err.response.data)
            this.$swal(err.response.data)
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
    .no-post{
        margin-top: 50px;
    }
    .pinpost{
        width: 200px;
        position: absolute;
        bottom: 50px;
    }
</style>