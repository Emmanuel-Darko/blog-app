<template>
    <div class="container">
        <div class="welcome">
            <h4>Welcome... <router-link to=""> {{ userProfile.email }} </router-link></h4>
            <img class="pinpost" src="/images/pin.svg" alt="pin">
        </div>

        <div class="post-card">
            <input type="text" v-model="postTitle" placeholder="Enter post title">
            <textarea v-model="postContent" id="content" cols="25" rows="10"> Start post...</textarea>
        </div>
        <div class="post-button">
            <button @click="cancelPost()"> Cancel 🚫 </button>
            <button @click="submitPost()"> Pin 🧷 </button>
        </div>
        
        <img class="pinpost" src="/images/pin.svg" alt="pin">
    </div>
</template>

<script setup>
    import {onBeforeMount, ref, inject} from 'vue'
    import axios from 'axios'
    import {useRouter} from 'vue-router'
    const swal = inject('$swal')

    const route = useRouter()
    let userProfile = ref({})
    let postTitle = ref('')
    let postContent = ref('')

    onBeforeMount(() => {
        const usertoken = localStorage.getItem('usertoken')
        axios.get('http://localhost:4000/user/profile', { headers:{ usertoken }})
        .then(res => {
            userProfile.value = res.data
        }).catch(err => {
            // alert(err.response.data)
            swal.fire({
                icon: 'error',
                text: err.response.data,
                confirmButtonText: 'Login',
                confirmButtonColor: '#ffce6c',
                allowOutsideClick: false
            }).then((result) =>{
                if(result.isConfirmed)
                    route.push('/auth/login')
            })
        })
        
    })
    const submitPost = () => {
        const usertoken = localStorage.getItem('usertoken')
        axios.post('http://localhost:4000/user/post', {title:postTitle.value, content:postContent.value}, { headers:{ usertoken }})
        .then(res => {
            console.log(res)
            route.push('/home/myposts')
            // showToast(res.data, 'true')
        }).catch(err => {
            console.log(err.response.message)
            // showToast(err.response.data, 'false')
        })
    }
    const cancelPost = () => {
        postTitle.value = ''
        postContent.value = ''
    }
</script>
    
<style lang="css" scoped>
    .container{
        width: 100%;
    }
    .welcome{
        margin-top: 50px;
    }
    .post-card{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 40px;
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
    .post-card input{
        padding: 10px;
        font-size: 20px;
        border-radius: 10px;
    }
    .post-card textarea{
        resize:vertical;
        width: 90%;
        padding: 15px;
        font-size: 18px;
        border-radius: 15px;
    }
    .post-button{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 40px;
    }
    .post-button button{
        padding: 10px;
        width: 120px;
        font-size: 16px;
        border: none;
        border-radius: 7px;
        box-shadow: 20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff;
    }
    .post-button button:hover{
        box-shadow: none;
    }

    .post-button button:first-child{
        color: #fff;
        cursor: not-allowed;
        background-color: rgba(255, 0, 0, 0.652);
    }
    .post-button button:last-child{
        color: #000;
        cursor: pointer;
        background-color: #ffce6c;
    }
    .pinpost{
        width: 150px;
        position: absolute;
        bottom: 20px;
        left: 20px;
    }
</style>