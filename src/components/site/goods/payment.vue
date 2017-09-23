<template>
    <div class="goodsinfo">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a class="selected" href="javascript:;">支付中心</a>
                    </div>
                    <!--确认订单-->
                    <!--商品订单-->
                    <div class="form-box payment">
                    <el-row >
                        <!--支付二维码-->
                       <el-col :span="16">                      
                    <el-row >
                        <el-col :span="12">
                             <dl class="form-group">
                            <dt>订 单 号：</dt>
                            <dd>{{orderinfo.order_no}}</dd>
                        </dl>
                        </el-col>
                        <el-col :span="12">
                            <dl class="form-group">
                            <dt>收货人姓名：</dt>
                            <dd>{{orderinfo.accept_name}}</dd>
                        </dl>
                        </el-col>
                    </el-row>

                    <el-row >
                        <el-col :span="12">
                              <dl class="form-group">
                            <dt>送货地址：</dt>
                            <dd>{{orderinfo.area}} {{orderinfo.address}}                                
                            </dd>
                        </dl>
                        </el-col>
                        <el-col :span="12">
                             <dl class="form-group">
                            <dt>手机号码：</dt>
                            <dd>{{orderinfo.mobile}}</dd>
                        </dl>
                        </el-col>
                    </el-row>
                     <el-row >
                        <el-col :span="12">
                               <dl class="form-group">
                            <dt>支付金额：</dt>
                            <dd>{{orderinfo.order_amount}} 元</dd>
                        </dl>
                        </el-col>
                        <el-col :span="12">
                            <dl class="form-group">
                            <dt>支付方式：</dt>
                            <dd>在线支付</dd>
                        </dl>
                        </el-col>
                    </el-row>
                     <div class="message">    
                        <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>                    
                        <span>{{orderinfo.message}}</span>
                        </div>
                         </el-col>
                        <el-col :span="8">
                          <div id="container">
                            <canvas width="200" height="200"></canvas>
                        </div>
                        </el-col>   
                    </el-row>
                  </div>
                    <!--/商品订单-->
                    <!--/确认订单-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import VueQrt from 'vue-qart'
    import '../../../../statics/site/js/jqueryqr.js'; 

    export default {
        components:{
            // VueQrt
        },
        data() {
            return {
                orderid:0,  //订单id
                orderinfo: {},
                 config: {
                    value: '',
                    imagePath: '../../../../statics/imgs/logo.png',
                    filter: 'color'
                },
                downloadButton: false
            }
        },
        methods: {
            getorder() {
                this.$http.get('/site/validate/order/getorder/' + this.orderid)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }

                        this.orderinfo = res.data.message[0];

                        this.config.value = this.siteServer+'/#/pay/'+this.orderid+'/'+this.orderinfo.order_amount
                        
                        // 生成二维码
                          //文字logo
                            $("#container").erweima({
                                label: '黑马商城扫码支付',
                                size:300,
                                text:this.config.value
                            });


                    });
            },
            checkPayStatus(){
                 this.$http.get('/site/validate/order/getorder/' + this.orderid)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }

                        if(res.data.message[0].status == 2){                            
                            this.$router.push({name:'successpay'});
                            return;
                        }

                        setTimeout(this.checkPayStatus,5000);
                    });
            }
        },
        created() {
            this.orderid = this.$route.params.orderid;

            this.getorder();

            this.checkPayStatus();

        }
    }

</script>

<style scoped>

</style>