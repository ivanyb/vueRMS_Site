<template>
    <div class="goodslist">
        <!--1 当前位置-->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
            </div>
        </div>
        <!--/当前位置-->
        <!--2 导航推荐-->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <li v-for="(item,index) in topdata.catelist" :key="index">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span v-text="item.title"></span>
                                        <p>
                                            <span v-for="sitem in item.subcates.slice(0,3)">{{sitem.title}}&nbsp;</span>
                                        </p>
                                    </h3>
                                    <div class="item-box" v-bind="{style:'top:-'+ (topdata.catelist.length<=6? (53 * index):(index>(topdata.catelist.length -6))?(53*(index-(topdata.catelist.length-6))):0) +'px'}">

                                        <!--如有三级分类，此处可循环-->
                                        <dl v-for="lv2item in item.subcates">
                                            <!--二级分类-->
                                            <dt><a href="/goods/40.html">{{lv2item.title}}</a></dt>
                                            <dd>
                                                <!--三级分类-->
                                                <a v-for="lv3item in lv2item.subcates" href="/goods/43.html">{{lv3item.title}}</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel :interval="5000" trigger="click" height="341px">
                              <el-carousel-item v-for="item in topdata.sliderlist" :key="item.id">
                                <router-link v-bind="{to:'/site/goods/info/'+item.id}">
                                 <img width="705px" height="341px" :src="item.img_url" :alt="item.title">
                                <h3 v-text="item.title"></h3>
                                </router-link>

                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <div class="left-220">
                        <ul class="side-img-list">

                            <li v-for="(item,index) in topdata.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index + 1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                     <router-link v-bind="{to:'/site/goods/info/'+item.id}">
                                     {{item.title}}</router-link>
                                    <span>{{item.add_time | datefmt('YYYY-MM-DD')}}</span>
                                </div>
                            </li>



                        </ul>
                    </div>
                    <!--/推荐商品-->
                </div>
            </div>
        </div>
        <!--/导航推荐-->

        <!--3 商品分类展示-->
        <div class="section">

            <!--子类-->
            <div v-for="(item,index) in goodslist" :key="index" >
                <div class="main-tit">
                    <h2 v-text="item.catetitle"></h2>
                    <p>
                        <router-link v-for="(subitem,index) in item.level2catelist" :key="index"
                         v-bind="{to:'/site/goods/more/'+subitem.subcateid}">{{subitem.subcatetitle}}</router-link>
                        <router-link v-bind="{to:'/site/goods/more/'+item.level1cateid}">更多<i>+</i></router-link>
                    </p>
                </div>
                <!--/子类-->
                <div class="wrapper clearfix">
                    <div class="wrap-box">
                        <ul class="img-list">
                            <li v-for="(goods,index) in item.datas" :key="index">
                                <div class="warpdiv">
                                 <router-link v-bind="{to:'/site/goods/info/'+goods.artID}">
                                    <div class="img-box"><img :src="goods.img_url"></div>
                                    <div class="info">
                                        <h3 v-text="goods.artTitle"></h3>
                                        <p class="price"><b>¥{{goods.sell_price}}</b>元</p>
                                        <p>
                                            <strong>库存 {{goods.stock_quantity}}</strong>
                                            <span>市场价：<s v-text="goods.market_price"></s></span>
                                        </p>
                                    </div>
                                </router-link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                topdata: {},
                goodslist:[]
            }
        },
        methods: {
            gettopdata() {
                this.$http.get('/site/goods/gettopdata/goods')
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }
                        this.topdata = res.data.message;
                    });
            },
            getgoodslist(){
                  this.$http.get('/site/goods/getgoodsgroup/')
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }
                        this.goodslist = res.data.message;
                    });
            }
        },
        created() {
            this.gettopdata();
            this.getgoodslist();
        }
    }

</script>

<style>
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .goodsgroup {
        height: 1000px;
    }
</style>