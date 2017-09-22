<template>
    <div class="payinfo">
    <div class="pay" v-if="!ispayed">
        <p>
            订单支付总金额为：{{totalAmount}} 元
        </p>
        <input type="text" v-model="totalAmount" > <br />
        
        <el-button type="success" size="large" @click="pay">支付</el-button>
    </div>

    <div class="wrapper" v-if="ispayed">
        <div class="bg-wrap">
            <div class="nav-tit">
                <a class="selected" href="javascript:;">支付中心</a>
            </div>
            
            
            <!--支付成功-->
            <div class="msg-tips">
                <div class="icon">
                    <i class="iconfont icon-check"></i>
                </div>
                <div class="info">
                    <strong>订单已支付成功！</strong>                  
                    <p>如有其它问题，请联系客服。</p>
                </div>
            </div>
            <!--/支付成功-->
            
            
        </div>
    </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {                
                ispayed:false,
                orderid:this.$route.params.orderid,
                totalAmount:this.$route.params.totalamount
            }
        },methods:{
            pay(){
                this.$http.get('/site/validate/order/pay/'+this.orderid)
                .then(res=>{
                    if(res.data.status ==1){
                        this.$message.error(res.data.message);
                        return;
                    }                    
                    this.ispayed = true;
                });
            }
        }
    }
</script>

<style scoped>
    .payinfo{
        margin: 50px auto;
        width: 320px;
    }
    .pay p{
        font-size: 18px;
        color: blue;
    }
    .pay input{
        height: 30px;
        padding-left: 15px;
        width: 200px;
        border: 1px solid rgba(0,0,0,0.2);
        margin: 20px 0;
    }
</style>