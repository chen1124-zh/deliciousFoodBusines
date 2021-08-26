<template>
	<view>
		<view class="user_information" @click="getUser()">
			<view class="user_img">
				<image :src="shopData.storeLogo||'../../static/tmepshop1.png'" style="width: 100%;height: 100%;" mode=""></image>
			</view>
			<view v-if="user == ''"
			style="line-height: 130rpx;">
				未登录
			</view>
			<view class="" v-else>
				<view class="" style="font-size: 44rpx;margin-bottom: 20rpx;">
					{{shopData.storeName}}
				</view>
				<view class="evaluate" style="font-size: 28rpx;">
					<text>评价0</text><text>月售3035</text> <text>配送约{{shopData.deliveryTime||0}}分钟</text>
				</view>
				<view 
				style="font-size: 26rpx;border-radius: 2rpx;padding: 0 20rpx;border-radius: 20rpx;color: #5EACE7;background: #EEF7FF;display: inline-block;margin: 20rpx 0;">
					营业时间：{{tiemList || '未设置营业时间'}}
					<!-- 12312 -->
				</view>
				<view class="" v-if="biao.length>0">
					<text v-for="(item,index) in biao" :key='index'
					style="display: inline-block;border-radius: 10rpx;background: #4B2F65;color: #999;padding: 5rpx 30rpx;margin-right:20rpx;">
						{{item}}
					</text>
					<!-- <text style="display: inline-block;border-radius: 10rpx;background: #4B2F65;color: #999;padding: 5rpx 30rpx;margin-right: 20rpx;">123</text> -->
					<!-- <text style="display: inline-block;border-radius: 10rpx;background: #4B2F65;color: #999;padding: 5rpx 30rpx;margin-right: 20rpx;">123</text>
					 --><!-- <text v-for="(item,index) in biao">{{item}}</text> -->
					<!-- {{this.shopData.foodItem = this.labellist.join()}} -->
				</view>
				<view v-else>
					未设置菜品标签
				</view>
			</view>
		</view>
		
		<view class="often_function">
			<view class="bar">
				
			</view>
			<view class="often_box">
				<view class="often_title">
					常用功能
				</view>
				<view class="often_item_box">
					<view class="often_item" v-for="(item,index) in often" :key='index' @click="laoutJump(index)">
						<view class="often_icon">
							<image :src="item.icon" mode=""></image>
						</view>
						<view class="often_name">
							{{item.name}}
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<view class="analysis">
			<view class="name">
				财务统计
			</view>
			<view class="charts-box">
			  <qiun-data-charts
			    type="line"
			    :chartData="chartData"
			    background="none"
			  />
			</view>
		</view>
		
		
		<view class="analysis">
			<view class="name">
				菜品分析
			</view>
			<view class="table">
				<view class="th">
					<view class="">
						名称
					</view>
					<view class="">
						累计销量
					</view>
					<view class="">
						本月销量
					</view>
					<view class="">
						今日销量
					</view>
				</view>
				
				<view class="td" v-for="(item,index) in foodList" :key='index'>
					<view class="">
						{{item.name}}
					</view>
					<view class="">
						{{item.accumulation}}
					</view>
					<view class="">
						{{item.month}}
					</view>
					<view class="">
						{{item.day}}
					</view>
				</view>
			</view>
		</view>
	
		
		
		
	</view>
</template>

<script>
	import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts.vue'
	import Api from '@/common/http.js'
	export default {
		data() {
			return { 
				tiemList:'',
				user:'',
				biao:'',
				chartData:{
				  
				      categories: [
				          "11-24",
				          "11-25",
				          "11-26",
				          "11-27",
				          "11-28",
				          "11-29",
						  "11-30"
				      ],
				      series: [
				          {
				              "name": "营业额",
				              "data": [
				                  1,
				                  3,
				                  100,
				                  10,
				                  4,
				                  20,
								  1,
								  10
				              ]
				          },
				          {
				              "name": "订单量",
				              "data": [
				                  70,
				                  40,
				                  65,
				                  80,
				                  44,
				                  68,
								  10,
								  1
				              ]
				          }
				      ]
				  
				},
				foodList:[
					{
						name:'白切鸡',
						accumulation:'222',
						month:'111',
						day:'111'
					}
				],
				shopData:'',
				often:[
					{
						name:'店鋪设置',
						path:'../../pagesA/shopSetUp/shopSetUp',
						icon:'../../static/setUp.svg'
					},{
						name:'评价',
						path:'',
						icon:'../../static/evaluate.svg'
					},{
						name:'店员管理',
						path:'',
						// ../../pagesA/clerk/clerk
						icon:'../../static/clerk.png'
					},
					{
						name:'消息',
						path:'',
						// ../../pagesA/news/news
						icon:'../../static/news.svg'
					},{
						name:'客服',
						path:'',
						icon:'../../static/customerService.svg'
					},{
						name:'打印机',
						path:'',
						icon:'../../static/Print.svg'
					},{
						name:'分店',
						path:'../../pagesA/branchStore/branchStore',
						icon:'../../static/shop.png'
					},{
						name:'资金账户',
						path:'',
						icon:'../../static/capital.svg'
					},{
						name:'意见反馈',
						path:'',
						icon:'../../static/feedback.svg'
					},
				]
			}
		},
		onShow() {
			this.user = uni.getStorageSync('user')
			if(this.user == ''){
				
			}else{
				console.log(this.user)
				if(this.user.status == 0){
					uni.removeStorageSync('addMap')
					uni.navigateTo({
						url:'../../pagesA/Induction/Induction'
					})
					return
				}
				
				if(this.user.status == 1){
					
					uni.navigateTo({
						url:'../../pagesA/examine/examine'
					})
					return
				}
			}
			
			
			this.getShopData()
			var shop = ''
			shop = uni.getStorageSync('shopData')
			if(shop!=''){
				this.getSelectCountProduct()
			}
			this.tiemList = ''
			if(shop.businessTime){
				var temp = JSON.parse(shop.businessTime)
				
				if(temp.standard){
					this.tiemList = temp.bz.stime+'-'+temp.bz.etime
				}else{
					console.log(temp.timeList)
					temp.timeList.map((item)=>{
						console.log(item)
						this.tiemList+= item.sTime+'-'+item.dTime+' '
					})
				}
			}
			
			
			
			
		},
		components:{
			qiunDataCharts
		},
		mounted() {
		},
		methods: {
			
			getShopData(){
				var tempShopData = uni.getStorageSync('shopData');
				if(tempShopData != ''){
					this.shopData = tempShopData
					if(this.shopData.foodItem != undefined){
						this.biao = this.shopData.foodItem.split(',')
					}else{
						this.biao = []
					}
					
				}
			},
			laoutJump(index){
				
				if(this.user == ''){
					uni.showToast({
						title:"请先登录",
						icon:"none"
					})
					return
				}
				
				if(index == 0){
					uni.removeStorage({
						key:'shopDatas'
					})
				}
				
				if(this.often[index].path == ''){
					uni.showToast({
						title:'功能还在开发敬请期待',
						icon:'none'
					})
					return
				}
				
				uni.navigateTo({
					url:this.often[index].path
				})
			},
			getUser(){
				var than = this
				var user = uni.getStorageSync('user')
				
				if(user == ''){
					uni.getUserProfile({
						desc: '登录',
						success: (res) => {
							uni.login({
								success: (ress) => {
									let code = ress.code
									uni.request({
										url: 'http://47.113.217.251:8080/user/save', //仅为示例，并非真实接口地址。
										method:"POST",
										data: {           
											"code":code,
											"type":2,
											"rawData":{
												"nickName":res.userInfo.nickName,
												"mobile":"",
												"isVip":0,
												"images":res.userInfo.avatarUrl,
												"userName":"",
												"password":"",
												"accountType":2,
												"gender":res.userInfo.gender,
												"name":res.userInfo.nickName,
												"addTotal": 0,
												"orderNum": 0,
												"accountMoney": 0,
												"isvipLevel": ""
											}
										},
										success: (resdata) => {
											
											this.user = resdata.data.data.data
											uni.setStorageSync('token',resdata.data.data.data.openId);
											uni.setStorageSync('user',resdata.data.data.data);
											
											if(this.user.status == 0){
												uni.removeStorageSync('addMap')
												uni.navigateTo({
													url:'../../pagesA/Induction/Induction'
												})
												return
											}
											
											if(this.user.status == 1){
												
												uni.navigateTo({
													url:'../../pagesA/examine/examine'
												})
												return
											}
										
											Api.getStoreList({userId:resdata.data.data.data.openId}).then(res => {
												// console.log('res',res);
												if(res.data.length == 0){
													uni.showToast({
														title:'暂无店铺',
														icon:'none'
													})
													return
												}
												than.shopData = res.data[0];
												uni.setStorageSync('shopData',than.shopData)
											}).catch(err => {
												uni.showToast({
													title: err.msg,
													icon: 'none'
												})
											});
										}
									});
									
								},
							})
						},
						fail() {
							uni.showToast({
								title: '需要授权后才能继续',
								duration: 1500,
								icon: 'none'
							})
						}
					})
				}else{
					this.user = user
				}
				
			},
			getSelectCountProduct(){
				console.log(123)
				var data = {
					storeId:this.shopData.id
				}
				Api.selectCountProduct(data).then(res => {
					// console.log('res',res);
					console.log(res)
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
			}
		}
	}
</script>

<style>
	
	.user_information{
		display: flex;
		background: #270546;
		padding: 40rpx 20rpx 40rpx 40rpx;
		color: #fff;
	}
	
	.information{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.user_left{
		display: flex;
		margin-left: 30rpx;
		
	}
	
	.user_img{
		width: 140rpx;
		height: 140rpx;
		background: #ccc;
		border-radius: 20rpx;
		margin-right: 10rpx;
		overflow: hidden;
	}
	
	.often_function{
		position: relative;
	}
	
	.bar{
		position: absolute;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 40rpx;
		background: #270546;
	}
	
	.often_box{
		border-radius: 20rpx;
		margin: 0 40rpx;
		padding: 30rpx;
		background-color: #fff;
		box-shadow: 0rpx 0rpx 20rpx #888888;
	}
	
	.often_title{
		font-size: 32rpx;
		font-weight: 800;
	}
	
	.often_item_box{
		display: flex;
		flex-wrap: wrap;
		/* justify-content: space-around; */
		overflow: hidden;
		margin-top: 20rpx;
		
	}
	
	.often_item{
		width: 25%;
		/* float: left; */
		/* margin: 20rpx 5%; */
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}
	
	.often_icon{
		width: 60rpx;
		height: 60rpx;
		/* background: #000000; */
		margin: 20rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.often_icon image{
		width: 50rpx;
		height: 50rpx;
	}
	
	.often_name{
		font-size: 24rpx;
		color: #999;
	}
	
	.setMeal_box{
		margin-top: 40rpx;
		display: flex;
	}
	
	
	.setMeal_item{
		margin: 0 26rpx;
		font-size: 30rpx;
	}
	
	
	.good_all_box{
		margin-bottom: 30rpx;
	}
	
	.good_item_box{
		display: flex;
		margin: 20rpx;
	}
	
	.googImgBox{
		width: 170rpx;
		height: 170rpx;
		border-radius: 10rpx;
		background: #007AFF;
		margin-right: 20rpx;
	}
	.good_item_describe{
		flex: 1;
	}
	
	.good_name_mueu{
		display: flex;
		justify-content: space-between;
	}
	
	.good_name{
		font-size: 30rpx;
		color: #000;
	}
	.good_describe{
		display: flex;
		margin: 5rpx 0;
	}
	
	.good_score{
		margin-right: 20rpx;
		font-size: 28rpx;
	}
	
	.good_sale{
		font-size: 28rpx;
	}
	
	.good_start_price,.good_distance_time,.good_describe_label_box,.good_taste_label_box{
		font-size: 24rpx;
	}
	
	.good_performance{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	
	.good_describe_label_box{
		display: flex;
		
	}
	
	.good_item_describe_label{
		color: #E19D58;
		background: #FEF4E9;
		margin-right: 16rpx;
		padding: 2rpx 20rpx;
		border-radius: 1rpx;
	}
	
	.good_item_taste_label_box{
		color: #EEACAA;
		border: 1rpx solid #FCFCFC;
		margin-right: 16rpx;
		padding: 2rpx 20rpx;
		border-radius: 1rpx;
	}
	
	.good_taste_label_box{
		display: flex;
	}
	
	.good_reserve{
		padding: 10rpx;
		border: 1rpx solid #999;
	}
	
	.table{
		margin: 20rpx;
		font-size: 28rpx;
		
	}
	
	.table .th{
		display: flex;
		background: #FAF4FF;
		padding: 20rpx;
		font-weight: 600;
	}
	
	.table .th view{
		text-align: center;
		width: 25%;
		max-width: 25%;
	}
	
	.table .td{
		display: flex;
		border-bottom: 1rpx solid #f0f0f0;
		padding: 20rpx;
	}
	
	.table .td view{
		width: 25%;
		max-width: 25%;
		text-align: center;
		color: #999;
	}
	
	.analysis{
		padding:20rpx 0;
		margin: 40rpx;
		box-shadow: 0 0 20rpx #f0f0f0;
		border-radius: 10rpx;
	}
	
	.analysis .name{
		font-size: 32rpx;
		margin-left: 40rpx;
		
	}
	
	.evaluate{
		font-size: 28rpx;
	}
	
	.evaluate text{
		margin-right: 20rpx;
	}
	
</style>
