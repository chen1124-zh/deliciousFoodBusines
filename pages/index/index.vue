<template>
	<view class="content">
		<view :style="{'height':navigation.height+'px',
						'paddingTop': navigation.top + 'px',
						'paddingBottom':'20rpx',
						'backgroundColor':'#270546',
						'color':'#fff'}" >
			<view :style="{'height':navigation.height+'px'}" class="topNavigation">
				 
				
				<view class="user_content" @click="userClick()">
					<view class="user_img">
						<image :src="user.images" mode="" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="user_name">
						{{user.nickName || "未登陆"}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="all_achievement">
			<view class="switchs" @click="sW">
				切换店铺
			</view>
			<view class="bang">
				<view class="">
					￥{{profit.toFixed(2) || 0.00}}
				</view>
				<view  style="font-size: 20rpx;">
					累计收益
				</view>
			</view>
			<view class="achievement">
				<view class="">
					<view class="achievement_num">
						￥{{today.toFixed(2)}}
					</view>
					<view class="achievement_name">
						今日收入
					</view>
				</view>
				<view class="">
					<view class="achievement_num">
						{{orderNum}}
					</view>
					<view class="achievement_name">
						今日订单
					</view>
				</view>
				<view class="">
					<view class="achievement_num">
						{{eat}}
					</view>
					<view class="achievement_name">
						就餐人数
					</view>
				</view>
			</view>
		</view>
		
		<view class="store_content">
			<view class="barck">
				
			</view>
			<view class="store_box">
				<view class="img_name">
					<view class="img">
						<image :src="shopData.storeLogo||'../../static/tmepshop1.png'" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<view class="">
						<view class="store_name">
							{{shopData.storeName || "未登录"}}
						</view>
						<view class="follow">
							关注{{follow}}人
						</view>
					</view>
				</view>
				
				<view class="Specifications">
					<view class="Specifications_item">
						<view class="Specifications_item_img">
							<image src="../../static/Dishes.png" mode=""></image>
						</view>
						<view class="">
							<view class="Specifications_title">
								菜品
							</view>
							<view class="people_num">
								{{food}}道
							</view>
						</view>
					</view>
					<view class="Specifications_item">
						<view class="Specifications_item_img">
							<image src="../../static/Package.png" mode=""></image>
						</view>
						<view class="">
							<view class="Specifications_title">
								套餐
							</view>
							<view class="people_num">
								{{set}}套
							</view>
						</view>
					</view>
					<view class="Specifications_item">
						<view class="Specifications_item_img">
							<image src="../../static/meal.png" mode=""></image>
						</view>
						<view class="">
							<view class="Specifications_title">
								餐位
							</view>
							<view class="people_num">
								{{table}}桌
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	
		<view class="static_num">
			<view :class="orderIndex == 0?'select_static_name':'static_name'" @click="orderIndex = 0">
				待接单({{orderListNum.waitingList}})
			</view>
			<view :class="orderIndex == 1?'select_static_name':'static_name'" @click="orderIndex = 1">
				待配送({{orderListNum.toBeDelivered}})
			</view>
			<view :class="orderIndex == 2?'select_static_name':'static_name'" @click="orderIndex = 2">
				配送中({{orderListNum.distribution}})
			</view>
			<view :class="orderIndex == 3?'select_static_name':'static_name'" @click="orderIndex = 3">
				待就餐({{orderListNum.waitingEat}})
			</view>
			<view :class="orderIndex == 4?'select_static_name':'static_name'" @click="orderIndex = 4">
				售后({{orderListNum.after}})
			</view>
		</view>
		
		<view class="good_box">
			<view class="good_item" v-for="(item,index) in orderList" :key='index' v-if="item.static!=10 && orderIndex==item.static && item.static != 4" @click="details(index)">
				<view class="good_item_top">
					<view class="">
						<text class="mode">{{item.eatType==0?'外卖':'到店'}}</text> {{item.tiem}}送达
					</view>
					<view class="">
						{{orderstaticStr[item.static]}}
					</view>
				</view>
				<view class="user">
					
					<view class="user_logo">
						<image :src="item.userImg" mode="" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="user_N">
						<view class="user_information">
							
							<view class="user_Name">
								{{item.userName}}
							</view>
							<view class="user_phone">
								{{item.phone}}
							</view>
						</view>
						<view class="address" v-if="item.orderStatic!=3">
							{{item.userAddress}}
						</view>
					</view>
					
					
					
					<view class="requirement">
						{{orderStaticStr[item.orderStatic] }}
						<view class="phone_img" style="margin: 20rpx auto 20rpx;" @click.stop="gitPhone">
							<image src="../../static/phone.png" style="width: 100%;height: 100%;text-align: center;" mode=""></image>
						</view>
					</view>
				</view>
				<view class="order_miao">
					<view class="order_img_name">
						<view class="order_img" >
							<view class="order_item_img" v-for="(items,indexs) in item.goodimgList" :key='indexs'>
								<image :src="items" mode="" style="width: 100%;height: 100%;"></image>
							</view>
						
						</view>
						<view class="order_item_name">
							{{item.goodNameList}}
						</view>
					</view>
					<view class="order_price_num">
						<view class="order_item_price">
							￥{{item.allPrice}}
						</view>
						<view class="order_item_num">
							共{{item.quantity}}件
						</view>
					</view>
				</view>
				
				<view class="agree">
					<view @click.stop="refuse(index)" v-if='item.static != 3'
					 style="width: 30%;color: #999;">
						{{buttomStr[item.static].left}}
					</view>
					<view @click.stop="meet(index)"
					 style="flex: 1;background: #10C5A5;color: #fff;">
						{{buttomStr[item.static].right}}
					</view>
				</view>
				
				
			</view>
		</view>
	
		<view class="Mask " :style="{'justifyContent':Distribution?'center':'space-between'}"  v-if="match" @click="match=false;userSelectImg=false">
			<view class="personal" :style="{'marginTop': navigation.height+navigation.top + 'px'}" v-if="userSelectImg">
				<view class="personal_content">
					<view class="personal_user_img">
						<image :src="user.images" mode="" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="">
						<view class="">
							{{user.nickName}}
						</view>
						<view class="">
							{{user.mobile}}
						</view>
					</view>
				</view>
				<view class="select_content">
					
					<view class="function">
						<text class="text_name">绑定手机号</text>
						<text>{{user.mobile}}</text>
					</view>
					
				</view>
			</view>
			
			
			<view class="switch" v-if='shopShow'>
				<view class="cole">
					关闭
				</view>
				<view class="switch_title">
					
					切换店铺
					
				</view>
				
				<view class="se" v-for="(item,index) in shopDataList" :key='index' @click.stop="qhuang(index)">
					{{item.storeName}}
				</view>
			</view>
		
			<view class="Distribution_box" v-if="Distribution">
				<view class="Distribution_select">
					<text>商家自配送</text>
					<text>外面员配送</text>
				</view>
				
				<view class="">
					<input type="text" value="" placeholder="配送员名字" class="Distribution_inp"/>
					<input type="text" value="" placeholder="联系电话" class="Distribution_inp"/>
				</view>
				
				<view class="agree">
					<view class="">
						拒绝
					</view>
					<view class="">
						接单
					</view>
				</view>
			</view>
		</view>
		
		
	
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		
		data() {
			return {
				shopShow:false,
				user:null,
				navigation:'',
				match:false,
				userSelectImg:false,
				Distribution:false,
				shopData:null,
				shopDataList:null,
				profit:0,
				today:0,
				orderNum:0,
				eat:0,
				follow:0,
				food:0,
				set:0,
				table:0,
				orderstaticStr:{
					0:'待接单',
					1:'待配送',
					2:'配送中',
					3:'就餐中',
				},
				buttomStr:{
					0:{
						left:'拒单',
						right:'接单'
					},
					1:{
						left:'取消订单',
						right:'配送'
					},
					2:{
						left:'打印配送单',
						right:'订单已送达'
					},
					3:{
						left:'',
						right:'扫吗就餐'
					},
				},
				orderList:[
					{
						id:0,
						eatType:0,
						tiem:'12:30',
						static:0,
						orderStatic:0,
						userImg:'../../static/user2.png',
						userName:'小旋风',
						phone:'1888888888',
						userAddress:'广州天河南山南比还',
						goodimgList:['../../static/tempGood2.png','../../static/tempGoodImg1.png','../../static/tempGood2.png'],
						goodNameList:'鱼蛋分、肥牛',
						allPrice:'25.5',
						quantity:4,
						
					},
					{
						id:0,
						eatType:1,
						tiem:'12:30',
						static:0,
						orderStatic:1,
						userImg:'../../static/user2.png',
						userName:'小旋风',
						phone:'1888888888',
						userAddress:'广州天河南山南比还',
						goodimgList:['../../static/tempGood2.png','../../static/tempGoodImg1.png','../../static/tempGood2.png'],
						goodNameList:'鱼蛋分、肥牛',
						allPrice:'25.5',
						quantity:4,
						
					},
					{
						id:1,
						eatType:2,
						tiem:'12:30',
						static:0,
						orderStatic:2,
						userImg:'../../static/user2.png',
						userName:'小旋风',
						phone:'1888888888',
						userAddress:'到店人数：6人',
						goodimgList:['../../static/tempGood2.png','../../static/tempGoodImg1.png','../../static/tempGood2.png'],
						goodNameList:'鱼蛋分、肥牛',
						allPrice:'25.5',
						quantity:4,
						
					},
					{
						id:1,
						eatType:3,
						tiem:'12:30',
						static:0,
						orderStatic:3,
						userImg:'../../static/user2.png',
						userName:'小旋风',
						phone:'1888888888',
						userAddress:'广州天河南山南比还',
						goodimgList:['../../static/tempGood2.png','../../static/tempGoodImg1.png','../../static/tempGood2.png'],
						goodNameList:'鱼蛋分、肥牛',
						allPrice:'25.5',
						quantity:4,
						
					}
				],
				orderStaticStr:{
					0:'送货上门',
					1:'国社餐厅',
					2:'点房：12人 01包厢',
					3:'到店取餐'
				},
				orderListNum:{
					waitingList:0,
					toBeDelivered:0,
					distribution:0,
					waitingEat:0,
					after:0
				},
				orderIndex:0,
			}
		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync('user');
			if(this.user == ''){
				
			}else{
				if(this.user.status == 0){
					uni.removeStorageSync('addMap')
					uni.navigateTo({
						url:'../../pagesA/Induction/Induction'
					})
					return
				}
				
				if(this.user.status == 1){
					// uni.removeStorageSync('addMap')
					uni.navigateTo({
						url:'../../pagesA/examine/examine'
					})
					return
				}
				this.getStoreList()
				
				
			}
			
		},
		created() {
			this.navigation = this.$store.getters.getNavigation
		},
		methods: {
			meet(index){
				
				this.orderList[index].static++
			},
			refuse(index){
				this.orderList[index].static = 10
			},
			details(index){
				uni.navigateTo({
					url:'../../pagesA/orderdDetails/orderdDetails?id='+this.orderList[index].id
				})
			},
			selectDayTotalList(){
				var data = {
					storeId:this.shopData.id
				}
				Api.selectDayTotal(data).then(res => {
					if(res.data == undefined){
						this.today = 0
					}else{
						this.today = res.data.num
					}
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
				Api.selectOrderTotal(data).then(res => {
					if(res.data == undefined){
						this.orderNum = 0
					}else{
						this.orderNum = res.data.num
					}
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
				Api.selectPeopleTotal(data).then(res => {
					if(res.data == undefined){
						this.eat = 0
					}else{
						this.eat = res.data.num
					}
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
				Api.selectAllTotal(data).then(res => {
					
					if(res.data == undefined){
						this.profit = 0
					}else{
						this.profit = res.data.num
					}
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
			},
			qhuang(index){
				this.shopData = this.shopDataList[index];
				uni.setStorageSync('shopData',this.shopData);
				
				this.match = false
				this.shopShow = false
				uni.showToast({
					title:'切换成功',
					icon:'none'
				})
				
				this.getOrderList();
				this.selectDayTotalList();
			},
			sW(){
				this.match = true
				this.shopShow = true;
				this.getshop()
			},
			getshop(){
				var than = this
				var data = {
					userId:this.user.openId,
				} 
				Api.getStoreList(data).then(res => {
					console.log('res',res);
					if(res.data.length == 0){
						uni.showToast({
							title:'暂无店铺',
							icon:'none'
						})
						return
					}
					console.log(res)
					than.shopDataList = res.data
					console.log(than.shopDataList)
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
			},
			getStoreList(){
				var than = this
				
				var tempShopData = uni.getStorageSync('shopData')
				if(tempShopData == ''){
					
					var data = {
						userId:this.user.openId,
					} 
					Api.getStoreList(data).then(res => {
						// console.log('res',res);
						if(res.data.length == 0){
							uni.showToast({
								title:'暂无店铺',
								icon:'none'
							})
							return
						}
						than.shopDataList = res.data
						
						than.shopData = res.data[0];
						uni.setStorageSync('shopData',than.shopData)
						this.selectDayTotalList()
						this.getOrderList() 
					}).catch(err => {
						uni.showToast({
							title: err.msg,
							icon: 'none'
						})
					});
				}else{
					than.shopData = tempShopData
					this.selectDayTotalList()
					this.getOrderList() 
				}
			},
			userClick(){
				console.log(this.user)
				if(this.user == ''){
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
												"addTotal":0,
												"orderNum":0,
												"accountMoney":0,
												"isvipLevel":''
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
											
											this.getStoreList()
											
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
					return
				}
				
				this.match = true;
				this.userSelectImg = true;
				this.Distribution = false;
				this.shopShow = false
			},
			gitPhone(){
				uni.showActionSheet({
				    itemList: ['1899999990'],
					itemColor:'#1890FF',
				    success: function (res) {
						
						
						uni.makePhoneCall({
						    phoneNumber: '1899999990' //仅为示例
						});
						
				        console.log(res);
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
		
			getOrderList(){
				
				var data = {
					userId:'',
					storeId:this.user.id
				}
				
				Api.getOrderList(data).then(res => {
					console.log('res',res);
					
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

<style lang="scss" scoped>
	
	image{
		width: 100%;
		height: 100%;
	}
	.content{
		background: #F7F7F7;
		.user_content{
			display: flex;
			align-items: center;
			.user_img{
				width: 80rpx;
				height: 80rpx;
				background: #000;
				border-radius: 50%;
				margin:0 30rpx;
				overflow: hidden;
			}
		}
		
		.all_achievement{
			background: #270546;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			height: 360rpx;
			.switchs{
				position: absolute;
				right: 0;
				top: 20rpx;
				padding: 6rpx 20rpx;
				background: rgba(255,255,255,0.3);
				font-size: 24rpx;
				border-radius: 20rpx 0 0 20rpx;
				/* z-index: 101; */
				color: #fff;
			}
			
			.bang{
				width: 300rpx;
				height: 300rpx;
				background-color: transparent;
				border:4rpx solid rgb(248, 129, 1);
				text-align: center;
				border-radius: 50%;
				position: absolute;
				display: flex;
				flex-direction: column;
				justify-content: center;
				color: #fff;
				font-size: 36rpx;
				/* bottom: -100rpx; */
			}
			
		}
		
		.achievement{
			width: 100%;
			display: flex;
			justify-content: space-around;
			font-size: 28rpx;
			text-align: center;
			color: #fff;
			margin: 30rpx 0;
			position: absolute;
			bottom: 0;
			background: #270546;
			padding: 10rpx;
		}
		
		.store_content{
			position: relative;
			
			.barck{
				position: absolute;
				top: 0;
				width: 100%;
				height: 60rpx;
				border-radius: 0 0 20rpx 20rpx;
				background: #270546;
			}
		}
		
		.store_box{
			background: #fff;
			margin: 0 40rpx;
			padding: 30rpx;
			border-radius: 10rpx;
			box-shadow: 0rpx 0rpx 20rpx #888888;
			margin-bottom: 40rpx;
			position: relative;
			
			.img_name{
				display: flex;
			}
			
			.img{
				width: 80rpx;
				height: 80rpx;
				/* background: #000; */
				border-radius: 10rpx;
				margin-right: 20rpx;
				overflow: hidden;
			}
			.order_item_img{
				width: 112rpx;
				height: 112rpx; 
				background: #000;
				margin-right: 10rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}
			
			.order_item_name{
				color: #999;
				margin-left: 20rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			
			.order_item_price{
				color: #000;
				font-size: 50rpx;
			}
			
			.order_item_num{
				font-size: 26rpx;
				text-align: center;
			}
		}
		
		
		
	}
	
	.store_name{
		font-size: 30rpx;
		font-weight: 800;
	}
	
	.follow{
		font-size: 26rpx;
		color: #999;
	}
	
	.Specifications{
		display: flex;
		justify-content: space-around;
	}
	
	.Specifications_item{
		margin-top: 20rpx;
		display: flex;
	}
	
	.Specifications_item_img{
		width: 70rpx;
		height: 70rpx;
		/* background: #000; */
		margin-right: 10rpx;
	}
	
	.Specifications_item_img image{
		width: 70rpx;
		height: 70rpx;
	}
	
	.Specifications_title{
		font-size: 30rpx;
		font-weight: 800;
	}
	
	.people_num{
		font-size: 26rpx;
		color: #999;
	}
	
	.static_num{
		display: flex;
		margin: 30rpx;
		/* font-size: 26rpx; */
	}
	
	.static_name{
		flex: 1;
		background: #fff;
		border: 1rpx solid #f0f0f0;
		text-align: center;
		padding: 20rpx;
		font-size: 22rpx;
		border-radius: 20rpx 20rpx 0 20rpx;
	}
	
	.select_static_name{
		flex: 1;
		background: #270546;
		color: #fff;
		border: 1rpx solid #f0f0f0;
		text-align: center;
		padding: 20rpx;
		font-size: 22rpx;
		border-radius: 20rpx 20rpx 0 20rpx;
	}
	
	.good_item{
		padding: 20rpx;
		margin: 30rpx;
		background-color: #fff;
		box-shadow: 0rpx 0rpx 20rpx #f0f0f0;
		border-radius: 20rpx;
	}
	
	
	.good_item_top{
		display: flex;
		justify-content: space-between;
	}
	
	.user{
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0;
	}
	
	.user_logo{
		width: 50rpx;
		height: 50rpx;
		background: #000000;
		margin-right: 10rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	
	.user_N{
		flex: 1;
	}
	
	.order_miao{
		display: flex;
		justify-content: space-between;
	}
	
	.order_img_name{
		max-width: 500rpx;
		display: flex;
		align-items: center;
	}
	
	.order_img{
		display: flex;
	}
	
	.agree{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		
	}
	
	.agree view{
		margin: 0 10rpx;
		/* flex: 1; */
		padding: 10rpx 0;
		text-align: center;
		border: 1rpx solid #f0f0f0;
		border-radius: 20rpx;
		/* padding: 10rpx; */
	}
	
	.Mask{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	
	.personal{
		border-radius:0 60rpx 0 0;
		width: 80%;
		height: 100%;
		background-color: #fff;
		border-radius: 0 50rpx 0 0;
		overflow: hidden;
	}
	
	.personal_content{
		height: 220rpx;
		background: #10C5A5;
		display: flex;
		align-items: center;
		padding-left: 40rpx;
	}
	
	.personal_user_img{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: #000000;
		margin-right: 20rpx;
		overflow: hidden;
	}
	
	.select_content{
		margin: 30rpx;
	}
	
	.function{
		display: flex;
		justify-content: space-between;
	}
	
	.switch{
		/* display:none; */
		position: absolute;
		bottom: 0;
		height: 70%;
		width: 100%;
		background: #fff;
		border-radius: 30rpx 30rpx 0 0;
	}
	
	.switch_title{
		font-size: 40rpx;
		color: #888;
		margin: 30rpx 0;
		text-align: center;
	}
	
	.cole{
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		color: #ccc;
	}
	
	.se{
		font-size: 36rpx;
		
		padding: 30rpx;
		border-bottom: 1rpx solid #ccc;
	}
	
	.Distribution_box{
		width: 80%;
		background: #fff;
		padding: 40rpx;
		border-radius: 10rpx;
	}
		
	.Distribution_select{
		margin-bottom: 30rpx;
		font-size: 36rpx;
		font-weight: 800;
	}
	
	.Distribution_inp{
		border: 1rpx solid #ccc;
		padding: 20rpx;
		border-radius: 10rpx;
		margin: 10rpx 0;
	}
	
	.mode{
		display: inline-block;
		border: 1rpx solid #53C2FE;
		color: #53C2FE;
		border-radius: 10rpx;
		font-size: 28rpx;
		padding:0rpx 10rpx;
		margin-right: 10rpx;
	}
		
	.user_information{
		display: flex;
		color: #958E8E;
		font-size: 28rpx;
	}
	
	.user_Name{
		margin-right: 20rpx;
	}
	
	.requirement{
		font-size: 25rpx;
	}
	
	.phone_img{
		width: 40rpx;
		height: 40rpx;
	}
	
	.address{
		font-size: 26rpx;
		margin-right: 100rpx;
	}
	
</style>
