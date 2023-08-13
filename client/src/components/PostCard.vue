<template>
    <div class="post-card" :class="{edit_post_card: post.active == true}">

        <h3 :contenteditable="isEditing" :class="{edit_title: isEditing}">
            {{ post.title }}
        </h3>

        <span v-show="!isEditing"><i> {{ post.slug }} --- {{ post.active }}</i></span>

        <p :contenteditable="isEditing" :class="{edit_content: isEditing}">{{ post.content }}</p>

        <div v-if="type == 'private'">
            <span v-if="isEditing" class="action-btns">
                <button @click="deletePost(post)" class="edit-btn">🗑️</button>
                <button @click="closeEdit()" class="delete-btn">❌</button>
            </span>

            <span v-else class="action-btns">
                <button @click="editPost(post._id)" class="edit-btn">🖍</button>
                <button @click="deletePost(post)" class="delete-btn">🗑️</button>
            </span>
        </div>
        
        <div class="post-bottom">
            <div class="like-buttons">
                <button :disabled="type=='private'">👍 0</button>
                <button :disabled="type=='private'">👎 0</button>
            </div>
            <button v-show="isEditing" class="update-btn">Update</button>
            <div>
                <span>{{ getDate(post.date) }}</span> &emsp13; - &emsp13;
                <span>{{ getTime(post.date) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    const props = defineProps({
        post: {type: Object, required: true},
        type: {type: String, required: true},
        handleEdit: {type: Function},
        handleCloseEdit: {type: Function}
    })

    const isEditing = ref(false)
    // custom functions
    const getDate = (date) => {
        const dd = new Date(String(date))
        return dd.toLocaleDateString('en-UK')
    }
    const getTime = (time) => {
        const tt = new Date(String(time))
        return tt.toLocaleTimeString()
    }
    const editPost = (id) => {
        isEditing.value = true
        props.handleEdit(id) 
    }
    const deletePost = (post) => {
        alert(`Delete ${post.slug}`)
    }
    const closeEdit = () => {
        isEditing.value = false
        props.handleCloseEdit()
    }
</script>

<style lang="css" scoped>
    .post-card{
        position: relative;
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
    .action-btns{
        position: absolute;
        right: 15px;
        top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .edit-btn, .delete-btn{
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #ffce6c;
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
    .post-card.edit_post_card{
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        width: 65%;
        margin: 0;
        padding: 20px;
        padding-top: 45px;
        border: 1px solid #ffce6c;
        border-left: 10px solid #ffce6c;
        border-radius: 10px;
        background: #ffffff;
        box-shadow:  none;
        z-index: 200;
        transition: all 0.3s ease-in-out;
    }
    .update-btn{
        padding: 10px;
        width: 120px;
        font-size: 16px;
        border: none;
        border-radius: 7px;
        box-shadow: 20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff;
        color: #000;
        cursor: pointer;
        background-color: #ffce6c;
    }
    .edit_title{
        padding: 20px; 
        outline: 2px solid #ffce6c
    }
    .edit_content{
        padding: 40px; 
        outline: 1px solid #ffce6c
    }
</style>