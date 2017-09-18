<template>
    <div class="goodslist">
        <!--面包屑-->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &nbsp;&gt;&nbsp;
                <a href="/goods/42/1.html">更多商品</a> {{cateid}}
            </div>
            <!--/面包屑-->

            <div class="section">
                <div class="wrapper clearfix">
                    <div class="screen-box">
                        <!--分类-->
                        <dl v-for="lv1cate in topdata.catelist" :key="lv1cate.id">
                            <dt>{{lv1cate.title}}：</dt>
                            <dd>
                                <router-link v-bind="{to:'/site/goods/more/'+lv1cate.id}">全部</router-link>

                                <router-link v-for="lv2cate in lv1cate.subcates" v-bind="{to:'/site/goods/more/'+lv2cate.id}">{{lv2cate.title}}</router-link>

                            </dd>
                        </dl>
                        <!--/分类-->

                    </div>

                </div>
            </div>

            <!--商品列表-->
            <div class="section">
                <div class="wrapper clearfix">
                    <ul class="img-list">
                        <li v-for="item in goodslist">
                            <a href="/goods/show-101.html">
                                <div class="img-box">
                                    <img :src="item.img_url">
                                </div>
                                <div class="info">
                                    <h3 v-text="item.title"></h3>
                                    <p class="price"><b>¥{{item.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{item.stock_quantity}}</strong>
                                        <span>市场价：<s>{{item.market_price}}</s></span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>

                    <!--页码列表-->
                    <div class="page-box" style="margin:15px 0 0;">
                        <div class="digg">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[2,20,30,50,100]"
                                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                            </el-pagination>
                        </div>
                    </div>
                    <!--/页码列表-->
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageIndex: 1,
                pageSize: 20,
                totalCount: 0,
                cateid: 0, //分类id
                topdata: {},
                goodslist: []
            }
        },
        watch: {
            '$route': function (newval, oldval) {
                this.cateid = newval.params.id;  //获取切换以后的分类id     
                this.getgoodslist();             
            }
        },
        methods: {
            // pageSize改变时触发
            handleSizeChange(val) {
               this.pageSize =val;
               this.getgoodslist();
            },
             // pageIndex改变时触发
            handleCurrentChange(val) {
                 this.pageIndex =val;
                this.getgoodslist();
            },
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
            getgoodslist() {
                this.$http.get('/site/goods/getgoodsbycateid/' + this.cateid + '?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }
                        this.totalCount = res.data.totalcount;
                        this.goodslist = res.data.message;
                    });
            }
        },
        created() {
            this.cateid = this.$route.params.id;  //获取传入的分类id
            this.gettopdata(); // 获取分类数据   
            this.getgoodslist();
        }
    }

</script>

<style scoped>
    a.router-link-exact-active {
        border-color:#fff;
         color:#fff;
          background:#34ad2a; 
    }
</style>