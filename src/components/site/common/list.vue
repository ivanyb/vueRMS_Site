<template>
    <div class="list">
          <contentslidtophot title="资源下载" tablename="common"></contentslidtophot>

          <categroupcontent v-for="(item,index) in datas" :datas="item" :key="index"></categroupcontent>
    </div>
</template>

<script>
    // 轮播图，推荐，热门数据展示组件
    import contentslidtophot from '../subcom/contentsildtophot.vue';

    // 一级分类下的所有二级分类文章数据展示组件
    import categroupcontent from '../subcom/categroupcontent.vue';

    export default{ 
        components:{
            contentslidtophot,
            categroupcontent
        }, 
         data(){
            return {
                datas:[]
            }
        },
        methods:{
            getdatas(){
                // 获取学员问题汇总数据
                this.$http.get('/site/article/getarticles/common')
                .then(res=>{
                    if(res.data.status == 1){
                        this.$message.error(res.data.message);
                        return;
                    }

                    // 赋值
                    this.datas = res.data.message;                       
                });
            }
        },
        created(){
            this.getdatas();
        }
    }
</script>

<style scoped>
    
</style>