<template>
	<view>
		<view class="step">
			<view :class="step==1?'speed selectSpeed':'speed'">
				<!-- <view class=""> -->
					1
				<!-- </view> -->
				
				<view class="">
					基本
				</view>
			</view>
			<view class="DottedLine">
				
			</view>
			<view  :class="step==2?'speed selectSpeed':'speed'">
				2
				<view class="">
					规格	
				</view>
			</view>
			<view class="DottedLine">
				
			</view>
			<view  :class="step==3?'speed selectSpeed':'speed'">
				3
				<view class="">
					参数
				</view>
			</view>
		</view>
		<view class="fillIn" v-if="step == 1">
			<view class="line_box">
				<view class="">
					商品名称
				</view>
				<view class="">
					<input type="text" v-model="addData.productName" />
				</view>
			</view>
			<view class="line_box">
				<view class="">
					商品价格
				</view>
				
				<view class="">
					<input type="number"  v-model="addData.productPrice" />
					<text>元</text>
				</view>
			</view>
			<view class="line_box">
				<view class="">
					划线价格
				</view>
				<view class="">
					<input type="number"  v-model="addData.linedPrice" />
					<text>元</text>
				</view>
			</view>
			<view class="line_box">
				<view class="">
					菜单分类
				</view>
				<view class="">
					<picker mode="selector" :range="addData.menuType" range-key="menuName" @change='changeMenuType'>
						<view>{{addData.menuType[addData.menuTypeIndex].menuName}}</view>
					</picker>
					<!-- <input type="text" value="" />
					<text>元</text> -->
				</view>
			</view>
			
			
			<view class="good_xx">
				<view class="good_xx_name">
					商品详情
				</view>
				<view class="" style="display: flex;flex-wrap: wrap;">
					<view class="s_pass" @click="addImg">
						<image src="../../static/x.svg" mode=""></image>
					</view>
					<view class="s_pass" v-for="(item,index) in img" :key='index'>
						<view class="" style="position: absolute;top: -20rpx;right: -20rpx;" @click="dimg(item.id)">
							<uni-icons type="close" color="red"></uni-icons>
						</view>
						<image :src="item.path" mode="" style="width: 100%;height: 100%;"></image>
					</view>
					<!-- <input type="" value="" /> -->
				</view>
				<view class="">
					<textarea v-model="addData.describe" placeholder="描述您的商品，有机会获得更多订单量哦～" style="font-size: 28rpx;color: #000000;background-color: #F8F8F8;border-radius: 10rpx;padding: 20rpx;height: 100rpx;"/>
				</view>
				
			</view>
			
			
			<!-- <view class="line_box">
				<view class="">
					商品分量
				</view>
				<view class="">
					<input type="number" v-model="addData.productWeight" />
					<text>克</text>
				</view>
			</view> -->
			<!-- <view class="line_box">
				<view class="">
					原料
				</view>
				<view class="">
					<input type="text" v-model="addData.stock" />
				</view>
			</view>
			<view class="line_box">
				<view class="">
					产地
				</view>
				<view class="">
					<input type="text" v-model="addData.producingArea" />
				</view>
			</view>
			<view class="line_box">
				<view class="">
					能量
				</view>
				<view class="">
					<input type="text" v-model="addData.energy" />
				</view>
			</view> -->
			
		</view>
		
		<view class="" v-if="step == 2">
			<view class="" style="margin: 40rpx;border: 1rpx solid #ccc;padding: 20rpx 0; text-align: center;" @click="addSpecifications">
				添加商品规格
			</view>
			
			<view class="Specifications" style="display: flex;" v-for="(item,index) in specification" :key="index">
				<view class="Sbox">
					<view class="">
						名称
					</view>
					<input type="text" v-model="item.name" />
					
				</view>
				<view class="Sbox">
					<view class="">
						额外价
					</view>
					<input type="number" v-model="item.price"  />
				</view>
			</view>
		</view>
		
		
		
		
		<view class="fillIn" v-if="step == 3">
			<view class="line_box">
				<view class="">
					制作时间
				</view>
				<view class="">
					<input type="number" v-model="addData.makeTime" />
					<text>分钟</text>
				</view>
			</view>
			<view class="line_box">
				<view class="">
					包装费
				</view>
				
				<view class="">
					<input type="text" v-model="addData.packing" />
					<text>元</text>
				</view>
			</view>
			
			
			<view class="good_xx">
				<view class="good_xx_name">
					备餐日期
				</view>
				<view class="">
					<view class="">
						<checkbox-group @change="checkboxChange" class="checkbox">
							<label class="uni-list-cell" v-for="item in items" :key="item.value">
								<!-- <view> -->
									<checkbox :value="item.value" :checked="item.checked" color="#00aaff" style="transform:scale(0.7)" />
								<!-- </view> -->
								<view>{{item.name}}</view>
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="good_xx_name">
					备餐时段
				</view>
				<view class="">
					<checkbox-group @change="checkboxsditemsChange" class="checkbox">
						<label class="uni-list-cell" v-for="item in sditems" :key="item.value">
							<!-- <view> -->
								<checkbox :value="item.value" :checked="item.checked" color="#00aaff" style="transform:scale(0.7)" />
							<!-- </view> -->
							<view>{{item.name}}</view>
						</label>
					</checkbox-group>
				</view>
				
			</view>
			
			
			<view class="line_box">
				<view class="">
					商品分量
				</view>
				<view class="">
					<input type="number" v-model="addData.productWeight" />
					<text>克</text>
				</view>
			</view>
			<view class="line_box">
				<view class="">
					原料
				</view>
				<view class="">
					<input type="text" v-model="addData.stock" />
				</view>
			</view>
			<view class="line_box">
				<view class="">
					产地
				</view>
				<view class="">
					<input type="text" v-model="addData.producingArea" />
				</view>
			</view>
			<view class="line_box">
				<view class="">
					能量
				</view>
				<view class="">
					<input type="text" v-model="addData.energy" />
				</view>
			</view>
			
		</view>
		
		<view class="lower"  @click="nextStep(1)" v-if="step == 1">
			下一步
		</view>
		
		<view class="UpDown tei" v-if="step == 2">
			<view class=""  @click="step--">
				上一步
			</view>
			<view class="" @click="nextStep(2)">
				下一步
			</view>
			
		</view>
		
		
		<view class="UpDown teis" v-if="step == 3">
			<view class="s" @click="step--">
				上一步
			</view>
			<view class="b"  @click="addProductData()">
				保存
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				step:1,
				shopId:'',
				specification:[
					
				],
				img:[],
				imgId:1,
				items: [
					{
						value: 'week1',
						name: '周一',
						checked:false
					},
					{
						value: 'week2',
						name: '周二',
						checked:false
					},
					{
						value: 'week3',
						name: '周三',
						checked:false
					},
					{
						value: 'week4',
						name: '周四',
						checked:false
					},
					{
						value: 'week5',
						name: '周五',
						checked:false
					},
					{
						value: 'week6',
						name: '周六',
						checked:false
					},
					{
						value: 'week7',
						name: '周日',
						checked:false
					}
				],
				sditems: [
					{
						value: 'zc',
						name: '早茶',
						checked:false
					},
					{
						value: 'zcn',
						name: '早餐',
						checked:false
					},
					{
						value: 'wc',
						name: '午餐',
						checked:false
					},
					{
						value: 'xwc',
						name: '下午茶',
						checked:false
					},
					{
						value: 'wcn',
						name: '晚餐',
						checked:false
					},
					{
						value: 'xy',
						name: '宵夜',
						checked:false
					}
				],
				user:'',
				addData:{
					productName:'',     //商品名称
					productPrice:'',   //商品价格
					linedPrice:'',   //划线价格
					menuType:'',      //菜单类型
					menuTypeIndex:0,	//下标
					productDetails:'',   //商品详情
					describe:'',     //描述
					productWeight:'',    //商品分量
					stock:'',      //原料
					producingArea:'',   //产地
					energy:'',    //能量
					specification:'',   //规格
					makeTime:'',    //制作时间
					packing:'',    //包装费
					preparesDate:'',   //备餐日期
					preparesTime:'',    //备餐时段
					storeId:'',    //商家id
					productImg:'',   //商品图片
					productStatus:'',   //商品状态
					productSet:''   //商品系列
				},
				goods:''
			}
		},
		components:{
			uniIcons
		},
		onLoad() {
			var good = uni.getStorageSync('uGood');
			console.log('good',good)
			this.goods = good
			if(good == ''){
				
				this.shopId = uni.getStorageSync('shopData').id;
				this.getMenuTypeListData()
			}else{
				
				this.shopId = uni.getStorageSync('shopData').id;
				this.getMenuTypeListData(good.menuType)
				this.addData = {
					productName:good.productName,     //商品名称
					productPrice:good.productPrice,   //商品价格
					linedPrice:good.linedPrice,   //划线价格
					menuType:'',      //菜单类型
					menuTypeIndex:0,	//下标
					productDetails:good.productDetails,   //商品详情
					describe:good.describe,     //描述
					productWeight:good.productWeight,    //商品分量
					stock:good.stock,      //原料
					producingArea:good.producingArea,   //产地
					energy:good.energy,    //能量
					specification:'',   //规格
					makeTime:good.makeTime,    //制作时间
					packing:good.packing,    //包装费
					preparesDate:good.preparesDate,   //备餐日期
					preparesTime:good.preparesTime,    //备餐时段
					storeId:good.preparesTime,    //商家id
					productImg:'',   //商品图片
					productStatus:good.productStatus,   //商品状态
					productSet:good.productSet   //商品系列
				}
				console.log('this.addData',this.addData)
				if(good.specification == '' || good.specification == undefined){
					
				}else{
					this.specification = JSON.parse(good.specification) ;
				}
				
				
			
				this.items = [
					{
						value: 'week1',
						name: '周一',
						checked:good.week1==1?true:false
					},
					{
						value: 'week2',
						name: '周二',
						checked:good.week2==1?true:false
					},
					{
						value: 'week3',
						name: '周三',
						checked:good.week3==1?true:false
					},
					{
						value: 'week4',
						name: '周四',
						checked:good.week4==1?true:false
					},
					{
						value: 'week5',
						name: '周五',
						checked:good.week5==1?true:false
					},
					{
						value: 'week6',
						name: '周六',
						checked:good.week6==1?true:false
					},
					{
						value: 'week7',
						name: '周日',
						checked:good.week7==1?true:false
					}
				]
				this.sditems = [
					{
						value: 'zc',
						name: '早茶',
						checked:good.zc==1?true:false
					},
					{
						value: 'zcn',
						name: '早餐',
						checked:good.zcn==1?true:false
					},
					{
						value: 'wc',
						name: '午餐',
						checked:good.wc==1?true:false
					},
					{
						value: 'xwc',
						name: '下午茶',
						checked:good.xwc==1?true:false
					},
					{
						value: 'wcn',
						name: '晚餐',
						checked:good.wcn==1?true:false
					},
					{
						value: 'xy',
						name: '宵夜',
						checked:good.xy==1?true:false
					} 
				]
				console.log(123)
				if(good.productImg == ''){
					
				}else{
					console.log(good.productImg.split(","))
					var tempImg = good.productImg.split(",")
					tempImg.map((item)=>{
						this.img.push({
							id:this.imgId++,
							path:item
						})
							
					})
				}
				
				// this.img = []
				
				
				
				
				
			}
			
			
			
			this.user = uni.getStorageSync("user")
		},
		methods: {
			dimg(id){
				var t = this.img.filter((item)=>{
					if(item.id != id){
						return item
						// console.log(123)
					}
				})
				
				this.img = t
				// console.log(t)
			},
			addImg(){
				var than = this
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res) => {
					
						
						res.tempFilePaths.map((item)=>{
							
							if(this.img.length >= 6){
								return
							}
							
							uni.uploadFile({
								 url : 'http://47.113.217.251:8080/user/fileUpload',
								 filePath: item,
								 name: 'file',
								success: (uploadFileRes)=> {
									
									var d = uploadFileRes.data.substring(1,uploadFileRes.data.length-1)
								
									  than.img.push({
										id:than.imgId++,
										path:d
									  })
								}
									
									
							})
							
							
							
							
						})
						
						console.log(res)
				        // console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			},
			addSpecifications(){
				this.specification.push({
					name:'',
					price:'',
				})
			},
			checkboxChange: function (e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
				
			},
			
			checkboxsditemsChange(e){
				var items = this.sditems,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			changeMenuType(e){
				this.addData.menuTypeIndex = e.detail.value
			},
			getMenuTypeListData(menuType){
				console.log(menuType)
				var than = this
				var data = {
					 storeId:this.shopId,
					 type:0
				}
				Api.getMenuTypeList(data).then(res => {
					
					
					than.addData.menuType = res.data.data
					than.addData.menuTypeIndex = 0
					
					if(menuType==undefined){
						
					}else{
						// console.log('this.addData',this.addData.menuType)
						this.addData.menuType.map((item,index)=>{
							if(item.id ==  menuType){
								than.addData.menuTypeIndex = index
							}
						})
					}
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
				
				
			},
			nextStep(i){
				if(i == 1){
					if(this.addData.productName == '' || this.addData.productPrice == '' || this.addData.linedPrice == '' || this.addData.describe == '' ) {
						uni.showToast({
							title:'请补充完！！！',
							icon:"none"
						})
						return
					}
				}else if(i == 2){
					
				}
				this.step ++
			},
			addProductData(){
				
				var d = false
				for (var i = 0; i < this.items.length; i++) {
					if(this.items[i].checked == true){
						d = true
						break
					}
				}
				
				if(d == false){
					uni.showToast({
						title:'请选择备餐日期',
						icon:"none"
					})
					return
				}
				
				var z = false
				for (var i = 0; i < this.sditems.length; i++) {
					if(this.sditems[i].checked == true){
						z = true
						break
					}
				}
				
				if(z == false){
					uni.showToast({
						title:'请选择备餐时段',
						icon:"none"
					})
					return
				}
				
				
				var productImgStr = ''
				this.img.map((item)=>{
					
					productImgStr+=item.path+','
					
					
				})
				
				
				productImgStr = productImgStr.substring(0,productImgStr.length-1)
				
				var data = {
					productName:this.addData.productName,     //商品名称
					productPrice:this.addData.productPrice,   //商品价格
					linedPrice:this.addData.linedPrice,   //划线价格
					menuType:this.addData.menuType[this.addData.menuTypeIndex].id,      //菜单类型
					productDetails:this.addData.productDetails,   //商品详情
					describe:this.addData.describe,     //描述
					productWeight:this.addData.productWeight,    //商品分量
					stock:this.addData.stock,      //原料
					producingArea:this.addData.producingArea,   //产地
					energy:this.addData.energy,    //能量
					specification:JSON.stringify(this.specification),   //规格
					makeTime:this.addData.makeTime,    //制作时间
					packing:this.addData.packing,    //包装费
					preparesDate:this.addData.preparesDate,   //备餐日期
					preparesTime:this.addData.preparesTime,    //备餐时段
					storeId:this.shopId,    //商家id
					productImg:productImgStr,   //商品图片
					productStatus:1,   //商品状态
					productSet:this.addData.productSet,   //商品系列
					discount:0,
					week1:this.items[0].checked?1:0,
					week2:this.items[1].checked?1:0,
					week3:this.items[2].checked?1:0,
					week4:this.items[3].checked?1:0,
					week5:this.items[4].checked?1:0,
					week6:this.items[5].checked?1:0,
					week7:this.items[6].checked?1:0,
					zc:this.sditems[0].checked?1:0,
					zcn:this.sditems[1].checked?1:0,
					wc:this.sditems[1].checked?1:0,
					xwc:this.sditems[1].checked?1:0,
					wcn:this.sditems[1].checked?1:0,
					xy:this.sditems[1].checked?1:0,
					ssProduct:this.user.id,
					saleNum:0,
					saleMoney:0,
					status:0
					 
				}
				
				
				if(this.goods != ''){
					
					data.id = this.goods.id
					Api.updateProduct(data).then(res => {
						
						if(res.code == 200){
							uni.showToast({
								title:"修改成功",
								icon:"none"
							});
							setTimeout(()=>{
								uni.navigateBack({
									delta:-1
								})
							},1000)
						}else{
							uni.showToast({
								title:"修改失败！！！",
								icon:"none"
							})
						}
						
					}).catch(err => {
						uni.showToast({
							title: err.msg,
							icon: 'none'
						})
					});
				}else{
					
					
					
					console.log(data)
					Api.addProduct(data).then(res => {
						console.log(res)
						if(res.code == 200){
							uni.showToast({
								title:"新增成功",
								icon:"none"
							});
							setTimeout(()=>{
								uni.navigateBack({
									delta:-1
								})
							},1000)
						}else{
							uni.showToast({
								title:"新增失败！！！",
								icon:"none"
							})
						}
						
					}).catch(err => {
						uni.showToast({
							title: err.msg,
							icon: 'none'
						})
					});
				}
				
				
			}
		}
	}
</script>

<style>
	
	.step{
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 80rpx 0;
	}
	
	.DottedLine{
		width: 160rpx;
		height: 0rpx;
		border:1px dashed #E2E2E2; 
	}
	
	.speed{
		position: relative;
		width: 60rpx;
		height: 60rpx;
		color: #CEC6C3;
		border-radius: 50%;
		background: #EAEAEA;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
	}
	
	.speed view{
		position: absolute;
		font-size: 24rpx;
		top: 110%;
		color: #CEC6C3;
	}
	
	.selectSpeed{
		color: #fff;
		background: #000000;
	}
	
	.selectSpeed view{
		color: #000;
		/* background: #000000; */
	}
	
	.fillIn{
		padding: 32rpx;
		margin: 24rpx;
		box-shadow: 0rpx 0rpx 10rpx #ccc;
		border-radius: 20rpx;
	}
	
	.line_box{
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #F1F1F1;
		color: #8B8D8B;
	}
	
	.line_box text{
		color: #000000;
	}
	
	.line_box input{
		text-align: right;
		padding: 0 20rpx;
		color: #000000;
	}

	.line_box view{
		display: flex;
	}

	.good_xx{
		color: #ccc;
	}
	
	.good_xx_name{
		color: #8B8D8B;
		padding: 10rpx;
	}
	
	
	.lower{
		padding: 20rpx 0;
		background: #10C5A5;
		margin: 60rpx;
		text-align: center;
		color: #fff;
		border-radius: 20rpx;
	}
	
	
	.UpDown{
		display: flex;
		margin: 60rpx;
	}
	
	.UpDown view{
		width: 50%;
		padding: 20rpx 0;
		background: #10C5A5;
		text-align: center;
		color: #fff;
		border-radius: 20rpx;
	}
	
	.uni-list-cell{
		display: flex;
		align-items: center;
		margin: 0 10rpx;
	}
	.checkbox{
		display: flex;
		flex-wrap: wrap;
	}
	
	.tei{
		margin: 0;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	
	.tei view{
		width: 50%;
		border-radius: 0;
		border-left: 1rpx solid #ccc;
	}
	
	.teis{
		margin: 0;
		position: fixed;
		bottom: 0;
		background: #fff;
		border-top: 1rpx solid #ccc;
		width: 100%;
		justify-content: space-around;
		padding: 23rpx 0px;
	}
	
	.teis .s{
		width: 20%;
		border: 1rpx solid #A1A1A1;
		color: #A1A1A1;
		background: #fff;
	}
	
	.teis .b{
		width: 70%;
	}
	
	.Specifications{
		display: flex;
		margin: 10rpx 45rpx;
	}
	
	
	.Sbox{
		display: flex;
		align-items: center;
		margin: 0 10rpx;
	}
	
	.Sbox input{
		flex: 1;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
		margin:  0 10rpx;
		padding: 6rpx;
	}
	
	
	.s_pass{
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		width: 200rpx;
		height: 160rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		border: 1rpx dashed #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	
	.s_pass image{
		width: 40rpx;
		height: 40rpx;
	}
</style>
