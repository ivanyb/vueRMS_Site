<template>
    <div class="goodsinfo">
        <!--面包屑-->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &nbsp;&gt;&nbsp;
                <a href="/goods/42/1.html">商品详情</a> {{this.goodsid}}
            </div>
        </div>
        <!--/面包屑-->

        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <!--左边上部商品信息-->
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                            <div class="magnifier" id="magnifier1" ref="zoom1" >
                                <div class="magnifier-container">
                                    <div class="images-cover"></div>
                                    <!--当前图片显示容器-->
                                    <div class="move-view"></div>
                                    <!--跟随鼠标移动的盒子-->
                                </div>
                                <div class="magnifier-assembly">
                                    <div class="magnifier-btn">
                                        <span class="magnifier-btn-left">&lt;</span>
                                        <span class="magnifier-btn-right">&gt;</span>
                                    </div>
                                    <!--按钮组-->
                                    <div class="magnifier-line">
                                        <ul class="clearfix animation03">
                                            <li v-for="img in goodsdata.imglist" :key="img.id">
                                                <div class="small-img">
                                                    <img :src="img.thumb_path" />
                                                </div>
                                            </li>                                            
                                        </ul>
                                    </div>
                                    <!--缩略图-->
                                </div>
                                <div class="magnifier-view"></div>
                                <!--经过放大的图片显示容器-->
                            </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{goodsdata.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsdata.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo" v-text="goodsdata.goodsinfo.goods_no"></dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsdata.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd><em class="price" id="commoditySellPrice">¥{{goodsdata.goodsinfo.sell_price}}</em></dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <el-row>
                                                <el-col :span="7">
                                                    <div class="stock-box">
                                                    <el-input-number v-model="shopnumber" @change="changeShopNumber" 
                                                    :min="1"  size="small"></el-input-number>
                                                    </div>
                                                </el-col>
                                                 <el-col :span="6">
                                                     <span class="stock-txt">
                                                    库存<em id="commodityStockNum">{{goodsdata.goodsinfo.stock_quantity}}</em>件
                                                </span>
                                                </el-col>
                                            </el-row>
                                           
                                           
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <!--<button class="buy">立即购买</button>-->
                                                <!--<button class="add">加入购物车</button>-->
                                                <el-button :plain="true" size="large" type="warning">立即购买</el-button>
                                                 <el-button type="danger" size="large">加入购物车</el-button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dd>
                                            <!--分享-->
                                            <!--/分享-->
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <!--/商品信息-->
                        </div>

                        <!--左边下部商品图文，和评论-->
                       
                        
                        <goodsinfobottom :content="goodsdata.goodsinfo.content" :id="goodsdata.goodsinfo.id"></goodsinfobottom>
                    
                        
                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="hotgoods in goodsdata.hotgoodslist" :key="hotgoods.id">
                                        <div class="img-box">
                                            <router-link v-bind="{to:'/site/goods/info/'+hotgoods.id}">
                                                <img :src="hotgoods.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link v-bind="{to:'/site/goods/info/'+hotgoods.id}">
                                                {{hotgoods.title}}
                                            </router-link>
                                            <span>{{hotgoods.add_time | datefmt('YYYY-MM-DD') }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import goodsinfobottom from './goodsinfobottom.vue';
    
    // 导入图片放大镜jquery插件
    import '../../../../statics/site/js/magnifier.js'; 

    export default {
        // directives:{
        //     imgzoom
        // },
        components:{
            goodsinfobottom
        },
        data() {
            return {
                shopnumber:1, // 购买商品数量
                goodsid: 0,//商品id
                goodsdata: {goodsinfo:{},imglist:[],hotgoodslist:[]} //包括 goodsinfo:商品详细信息，imglist：商品相册图片，hotgoodslist:推荐商品
            }
        },
        watch:{
            '$route':function(newval, oldval){               
                // console.log(newval);
               
                 this.goodsid = newval.params.id;
                 this.getgoodsInfo();              
            }
        },
        methods: {
            // 商品数量增1和减一
            changeShopNumber(num){
                this.shopnumber = num;
                console.log(num);
            },
            // 获取商品详情
            getgoodsInfo() {
                this.$http.get('/site/goods/getgoodsinfo/' + this.goodsid)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }
                        this.goodsdata = res.data.message;   

                        // 由于vue刷新页面元素需要一定时间，所以这里要等dom元素渲染完成后再调用图片放大镜插件
                        // 为了方便理解可以使用 setTimeout()替代
                        // this.$nextTick(()=>{                        
                        //     $(this.$refs.zoom1).imgzoon({magnifier:'#magnifier1'});     
                        // },10);  
                         setTimeout(()=>{
                            $(this.$refs.zoom1).imgzoon({magnifier:'#magnifier1'});
                        },100);     
                    });
            }
        },
        destroyed(){
            // console.log('info 销毁');
        },
        created() {
            
            this.goodsid = this.$route.params.id;
           
            this.getgoodsInfo();
        },
        mounted(){
         
        }
    }

</script>

<style >
    /*商品图片放大镜样式*/

/* 垂直居中 */
.small-img{
	display: flex;
	align-items:center;
	justify-content: center;
}
.clearfix:before,
.clearfix:after{
  display: table;
  line-height: 0;
  content: "";
}
.magnifier{
	width: 368px;
	position: relative;
}
.magnifier-container{
	width: 368px;
	height: 368px;
	overflow: hidden;
	position: relative;
	border: 1px solid #ddd;
}
.move-view{
	width: 100px;
	height: 100px;
	position: absolute;
	background-image: url('../../../../statics/site/images/move-box.png');
}
.images-cover{
	height: 100%;
	width: 100%;
	position: relative;
}
.images-cover img{
	position: absolute;
}
.magnifier-assembly{
	height: 92px;
	overflow: hidden;
	position: relative;
	padding-left: 30px;
	padding-right: 30px;
}
.magnifier-btn{
	position: absolute;
	font-family: "宋体";
	width: 100%;
	top: 50%;
	left: 0;
	margin-top: -40px;
}
.magnifier-btn span{
	line-height: 80px;
	height: 80px;
	width: 20px;
	background-color: #6e6e6e;
	color: #fff;
	display: block;
	z-index: 9998;
	text-align: center;
	font-size: 20px;
	cursor: pointer;
	border-radius: 3px;
}
.magnifier-btn .magnifier-btn-left{
	float: left;
}
.magnifier-btn .magnifier-btn-right{
	float: right;
}
.magnifier-line{
	position: relative;
	overflow: hidden;
	height: 92px;
}
.magnifier-line ul{
	display: block;
	font-size: 0;
	width: 10000%;
	position: absolute;
	left: 0;
	z-index: 9997;
}
.magnifier-line li{
	float: left;
	width: 100px;
	cursor: pointer;
}
.magnifier-line ul > .active .small-img{
	border-color: #bbb;
}
.small-img{
	height: 78px;
	padding: 1px;
	margin: 5px;
	overflow: hidden;
	border: 1px solid #ddd;
	text-align: center;
}
.small-img img{
	max-width: 100%;
	max-height: 100%;
}
.magnifier-view{
	width: 100%;
	height: 100%;
	position: absolute;
	right: -105%;
	top: 0;
	z-index: 9999;
	background-color: #fff;
	display: none;
	overflow: hidden;
}
.magnifier-view img{
	display: block;
}
.animation03{
	transition: all 0.3s ease-in 0.1s;
	-ms-transition: all 0.3s ease-in 0.1s;
	-moz-transition: all 0.3s ease-in 0.1s;
	-webkit-transition: all 0.3s ease-in 0.1s;
	-o-transition: all 0.3s ease-in 0.1s;
}
    /*/商品图片放大镜样式*/
</style>