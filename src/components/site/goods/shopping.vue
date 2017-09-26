<template>
    <div class="goodsinfo">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">填写订单信息</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--头部-->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <el-steps :space="380" :active="2" finish-status="success">
                                <el-step title="放进购物车"></el-step>
                                <el-step title="填写订单信息"></el-step>
                                <el-step title="支付/确认订单"></el-step>
                            </el-steps>
                        </div>
                    </div>
                    <!--头部-->
                    <!--信息填写-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>

                        <div class="form-box address-info">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="收货人姓名:" prop="accept_name">
                                    <el-input style="width:420px;" v-model="ruleForm.accept_name"></el-input>
                                    <span class="tip">*收货人姓名</span>
                                </el-form-item>
                                <el-form-item label="所属地区:" prop="area" class="mysel">
                                    <el-row>
                                        <el-col :span="11">
                                            <v-distpicker @selected="areaselect" :placeholders="placeholders"></v-distpicker>
                                        </el-col>
                                        <el-col :span="4">
                                            <span class="tip1"> *请选择您所在的地区</span>
                                        </el-col>
                                    </el-row>
                                </el-form-item>

                                <el-form-item label="详细地址：" prop="address">
                                    <el-input style="width:420px;" v-model="ruleForm.address"></el-input>
                                    <span class="tip">  *除上面所属地区外的详细地址</span>
                                </el-form-item>
                                <el-form-item label="手机号码：" prop="mobile">
                                    <el-input style="width:420px;" v-model="ruleForm.mobile"></el-input>
                                    <span class="tip">  *收货人的手机号码</span>
                                </el-form-item>
                                <el-form-item label="电子邮箱：">
                                    <el-input style="width:420px;" v-model="ruleForm.email"></el-input>
                                    <span class="tip"> 方便通知订单状态，非必填</span>
                                </el-form-item>
                                <el-form-item label="邮政编码：">
                                    <el-input style="width:169px;" v-model="ruleForm.post_code"></el-input>
                                    <span class="tip"> 所在地区的邮政编码，非必填</span>
                                </el-form-item>

                                <!--{{this.ruleForm.area}}-->
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <br/>
                                <el-form-item label="" prop="payment_id">
                                    <el-radio-group v-model="ruleForm.payment_id">
                                        <!--<el-radio label="1">货到付款</el-radio>-->
                                        <el-radio label="6">在线支付</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <br/>
                                <el-form-item label="" prop="express_id">
                                    <el-radio-group v-model="ruleForm.express_id">
                                        <el-radio label="1">顺丰快递</el-radio>
                                        <el-radio label="2">圆通快递</el-radio>
                                        <el-radio label="3">韵达快递</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <br/>
                                <el-table :data="goodslist" style="width: 100%" >
                                    <el-table-column  label="商品图片" width="180">
                                        <template scope="scope">
                                           <img height="60" width="60" :src="scope.row.img_url" :alt="scope.row.title">
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="title" label="商品标题">
                                    </el-table-column>
                                    <el-table-column prop="sell_price" label="单价" width="100">
                                    </el-table-column>
                                    <el-table-column prop="buycount" label="购买数量" width="100">
                                    </el-table-column>
                                    <el-table-column prop="totalamount" label="小计" width="100">
                                    </el-table-column>
                                </el-table>

                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <br/>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="备注">
                                            <el-input type="textarea" v-model="ruleForm.message"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="17">
                                        <div class="buy-foot">
                                            <div class="right-box">
                                                <p>
                                                    商品 <label class="price">{{ruleForm.goodsCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                                    <label id="goodsAmount" class="price">{{ruleForm.goodsAmount}}</label> 元
                                                    
                                                </p>
                                                <p>
                                                    运费：￥<label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                                </p>
                                                <p class="txt-box">
                                                    应付总金额：￥<label id="totalAmount" class="price">{{goodsTotalAmount}}</label>
                                                </p>

                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <br />
                                <el-row>
                                    <el-col :span="17">&nbsp;</el-col>
                                    <el-col :span="7">
                                        <el-form-item>
                                            <el-button type="info" @click="submitForm('ruleForm')">返回购物车</el-button>
                                            <el-button type="danger" @click="submitForm('ruleForm')">确认提交</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </el-form>
                        </div>
                    </div>
                    <!--/信息填写-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 省市区联动下拉框
    import VDistpicker from 'v-distpicker';
    var checkArea;
    export default {
        components: {
            VDistpicker
        },
        data() {
            var checkMobile = (rule, value, callback) => {
                var reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
                if (!value.match(reg)) {
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };

            checkArea = (rule, value, callback) => {
                if (this.ruleForm.area.area.code == '') {
                    callback(new Error('请选择区域'));
                } else {
                    callback();
                }
            };
            return {
                goodslist: [], //商品清单
                moneybyExpress:{ //每种快递的手续费/*格式：{快递id:手续费}*/
                    "1" :20,
                    "2":10,
                    "3":8
                },                
                ruleForm: {
                    goodsCount:0, //购买商品的件数
                    goodsAmount:0 , //购买商品的总金额
                    expressMoment:0, //运费
                    accept_name: '', //收货人姓名
                    area: {  // 收货人所在地区
                        "province": {
                            "code": "",
                            "value": ""
                        },
                        "city": {
                            "code": "",
                            "value": ""
                        },
                        "area": {
                            "code": "",
                            "value": ""
                        }
                    },
                    address: '',
                    mobile: '',
                    email: '',
                    post_code: '',
                    payment_id: '6',  //支付方式
                    express_id: '1', //配送方式
                    message:'', //备注信息
                    goodsids:this.$route.params.ids, //购买商品的id字符串，用逗号隔开
                    cargoodsobj:{}
                },
                rules: {
                    accept_name: [
                        { required: true, message: '请输入收获人姓名', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, validator: checkArea, trigger: 'change' }
                    ],
                    mobile: [
                        { required: true, validator: checkMobile, trigger: 'blur' }
                    ],
                    payment_id: [
                        { required: true, message: '请选择支付方式', trigger: 'change' }
                    ],
                    express_id: [
                        { required: true, message: '请选择配送方式', trigger: 'change' }
                    ]
                },
                placeholders: {
                    province: '----- 省 -----',
                    city: '--- 市 ---',
                    area: '--- 区 ---',
                }
            }
        },
        methods: {
            // 获取购买的商品清单数据
            getgoodslist(){
                // 获取vuex中的购物车商品购买数量
              this.ruleForm.cargoodsobj =  this.$store.getters.getCarGoods;

                this.$http.get('/site/validate/order/getgoodslist/'+this.$route.params.ids)
                .then(res=>{
                    if(res.data.status ==1){
                        this.$message.error(res.data.message);
                        return;
                    }

                    res.data.message.forEach(item=>{
                        item.buycount = this.ruleForm.cargoodsobj[item.id];
                        item.totalamount = this.ruleForm.cargoodsobj[item.id] * item.sell_price;

                        // 叠加购买商品总数
                        this.ruleForm.goodsCount += this.ruleForm.cargoodsobj[item.id];
                        // 叠加购买商品总金额
                        this.ruleForm.goodsAmount+= item.totalamount;
                    });

                    this.goodslist = res.data.message;
                });
            },
            //省市区选择后触发
            areaselect(value) {
                this.ruleForm.area = value;
                $('.mysel .el-form-item__error').css("display", "none");
                //    console.log(this.$refs['ruleForm'].rules);
            },
            setorder(){
                // this.cargoodsobj =  this.$store.getters.getCarGoods;

                this.$http.post('/site/validate/order/setorder',this.ruleForm)
                .then(res=>{
                    if(res.data.status ==1){
                        this.$message.error(res.data.message);
                        return;
                    }

                    this.$message({
                        showClose: true,
                        message: '下单成功，正在跳转到支付页面',
                        type: 'success',
                        duration:1000,
                        onClose:()=>{
                            this.$router.push({name:'payment',params:{orderid:res.data.message.orderid}});
                            // alert('跳转到二维码支付'+res.data.message.orderid);
                        }
                        });
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.setorder();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        computed:{
            goodsTotalAmount(){
                this.ruleForm.expressMoment = this.moneybyExpress[this.ruleForm.express_id];
                // 运费+商品总金额
             return this.ruleForm.expressMoment + this.ruleForm.goodsAmount;
            }
        },
        created(){
            this.getgoodslist();
        }
    }

</script>

<style scoped>
    .tip {
        color: rgba(0, 0, 0, 0.4);
        padding-left: 15px;
    }

    .tip1 {
        color: rgba(0, 0, 0, 0.4);
    }
</style>