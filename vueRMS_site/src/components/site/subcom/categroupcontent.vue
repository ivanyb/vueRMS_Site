<template>
    <div class="section">
        <!--子菜单导航栏-->
        <div class="main-tit">
        <h2 v-text="datas.catetitle"></h2>
        <p>            
            <a v-for="item in datas.level2catelist" href="/news/98.html">{{item.subcatetitle}}</a>
           
            <a href="/news/94.html">更多<i>+</i></a>
        </p>
        </div>
        <!--一级菜单下的商品-->
        <div class="wrapper clearfix">
        <div class="wrap-box">
            <!--左边-->
            <div class="left-925">
                <div class="pad-15 bg-wrap">
                    <ul class="rel-list">
                    
                        <li v-for="item in datas.datas">
                            <div class="img-box">
                                <a :title="item.artTitle" href="/news/show-50.html">
                                    <img :src="item.img_url">
                                </a>
                            </div>
                            <div class="info">
                                <h3><a :title="item.artTitle" href="/news/show-50.html">{{item.artTitle}}</a></h3>
                                <p v-html="item.zhaiyao"></p>
                                <span>{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                            </div>
                        </li>                    
                    </ul>
                </div>
            </div>
            <!--/左边-->
            
            <!--右边-->
            <div class="left-220">
                <div class="pad-15 bg-wrap">
                    <ul class="focus-list">                    
                        <li v-for="(item,index) in datas.datas">                            
                            <label class="hot">{{index + 1}}</label>                            
                            <a href="/news/show-53.html">{{item.artTitle}}</a>
                        </li>                    
                    </ul>
                </div>
            </div>
            <!--/右边-->
        </div>
    </div>
    
    </div>
</template>

<script>
    export default{
        props:['datas']   ,
        created(){
            console.log();
        }     
    }
</script>  
<style scoped>
    
</style>