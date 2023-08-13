<template>
    <div class="post-main">
        <HomeLayout :navList="navList" @componentId="(id) => listenNav(id)" :logoutUser="logoutUser">
            <component :is="componentId"></component>
        </HomeLayout>
    </div>
</template>

<script>
    import AllPost from '@/components/AllPost.vue'
    import MyPost from '@/components/MyPost.vue'
    import MyProfile from '@/components/MyProfile.vue'
    import HomeLayout from '@/components/HomeLayout.vue'
    export default {
        components:{
            AllPost,
            MyPost,
            MyProfile,
            HomeLayout,
        },
        data() {
            return {
                componentId: 'allPost',
                navList:[
                    {name: 'home', link:'allPost', title:'All Posts', active:true},
                    {name: 'home', link:'myPost', title:'My Posts', active:false},
                    {name: 'home', link:'myProfile', title:'Profile', active:false},
                ]
            }
        },
        beforeMount(){
            this.componentId = this.$route.params.id
        },
        methods: {
            listenNav(id){
                this.componentId = id
            },
            logoutUser(){
                localStorage.clear('usertoken')
                this.$router.push('/auth/login')
            }
        },
    }
</script>

<style lang="css" scoped>
    
</style>