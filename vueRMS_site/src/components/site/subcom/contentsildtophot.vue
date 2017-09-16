<template>
    <div class="contentwarp">
        <!--学员问题-->
        <div class="section">
            <!--导航栏begin-->
            <div class="main-tit">
                <h2>{{title}}</h2>
                <p>
                    <a v-for="item in datas.catelist" href="/news/93.html">{{item.title}}</a>
                    <a href="/news.html">更多<i>+</i></a>
                </p>
            </div>
             <!--导航栏end-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--轮播图开始-->
                    <div class="left-455" style="margin:0;height:341px;">
                        <div id="focus-box" class="focus-box">         
                            <el-carousel trigger="click" height="344px">
                            <el-carousel-item v-for="(slide,index) in datas.slidelist" :key="index">
                                <a  href="/site">
                                 <img width="455px" height="300px" :src="slide.img_url" alt="">
                                <h3>{{ slide.title }}</h3>
                                </a>
                            </el-carousel-item>
                        </el-carousel>
                        </div>
                    </div>
                       <!--轮播图结束-->
                       <!--置顶文章begin-->
                    <div class="left-455">
                        <ul class="side-txt-list">

                            <li v-for="(item,index) in datas.toplist" v-bind="{class:(index % 5)==0?'tit':''}">
                                <span v-if="(index % 5)>0">{{item.add_time | datefmt('YYYY-MM-DD')}}</span>
                                <a href="/news/show-43.html">{{item.title}}</a>
                                </li>

                        </ul>
                    </div>
                     <!--置顶文章end-->
                     <!--热门文章begin-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in datas.hotlist" :key="index">
                                <div class="img-box">
                                    <label>{{index + 1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/news/show-43.html">{{item.title}}</a>
                                    <span>{{item.add_time | datefmt('YYYY-MM-DD')}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--热门文章end-->
                </div>
            </div>
        </div>

        <!--学员问题结束-->
    </div>
</template>

<script>
    export default{
        props:['tablename','title'],
        data(){
            return {
                datas:[]
            }
        },
        methods:{
            getdatas(){
                this.$http.get('/site/article/getsildtophot/'+this.tablename)
                .then(res=>{
                    if(res.data.status == 1){
                       this.$message.error(res.data.message);
                        return;
                    }

                    this.datas = res.data.message;

                    console.log(this.datas);
                });
            }
        },
        created(){
            this.getdatas();
        }
    }
</script>

<style scoped>
.el-carousel__item h3 {
    color: red;
    font-size: 18px;
    opacity: 0.75;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>