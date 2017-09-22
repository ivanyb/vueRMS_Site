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
                    <div class="form-box">
                    <el-row >
                        <!--支付二维码-->
                        <el-col :offset="9" :span="12">
                            <vue-qrt :config="config" 
                            :downloadButton="downloadButton"></vue-qrt>
                        </el-col>
                    </el-row>
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
                            <dd>{{orderinfo.area}} {{orderinfo.address}}</dd>
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
                  </div>
                    <!--/商品订单-->
                    <!--/确认订单-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueQrt from 'vue-qart'

    var setItv;

    export default {
        components:{
            VueQrt
        },
        data() {
            return {
                orderid: this.$route.params.orderid,  //订单id
                orderinfo: {},
                 config: {
                    value: this.siteServer+'/pay/'+this.$route.params.orderid,
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
            this.getorder();

            this.checkPayStatus();

        }
    }

</script>

<style scoped>

</style>