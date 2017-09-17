<template>
    <div class="list">
         <!--学员问题汇总-->
        <contentslidtophot title="学员问题汇总" tablename="question"></contentslidtophot>
        <!--重难点专区-->
        <contentslidtophot title="重难点专区" tablename="point"></contentslidtophot>
        <!--前端常用功能-->
        <contentslidtophot title="前端常用功能" tablename="common"></contentslidtophot>
        <!--资源下载-->
        <contentslidtophot title="资源下载" tablename="down"></contentslidtophot>
    </div>
</template>

<script>
    // 轮播图，推荐，热门数据展示组件
    import contentslidtophot from '../subcom/contentsildtophot.vue';

    export default{ 
        components:{
            contentslidtophot            
        }        
    }
</script>

<style scoped>
    
</style>