<template>
    <div v-if="toast.toastState=='true'" class="toast1">
        {{ toast.msg }}
    </div>
    
    <div v-if="toast.toastState=='false'" class="toast2">
        {{ toast.msg }}
    </div>
</template>

<script>
    export default {
        props:[
            "toast"
        ]
    }

</script>

<style lang="css" scoped>
    div .toast1{
        font-family: 'Sono';
        position: absolute;
        width: 20%;
        margin: 0 auto;
        padding: 20px;
        bottom: 10%;
        right: 39%;
        border-radius: 10px;
        border-left: 10px solid green;
        background-color: #ffce6c;
        box-shadow:  5px 5px 9px #d1bba1,
        -5px -5px 9px #ffffe7;
    }
    div .toast2{
        font-family: 'Sono';
        position: absolute;
        width: 20%;
        margin: 0 auto;
        padding: 20px;
        bottom: 10%;
        right: 39%;
        border-radius: 10px;
        border-left: 10px solid red;
        background-color: #ffce6c;
        box-shadow:  5px 5px 9px #d1bba1,
        -5px -5px 9px #ffffe7;
    }
</style>