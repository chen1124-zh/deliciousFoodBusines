<template>
	<view class="content">
		<view :style="{'height':navigation.height+'px',
						'paddingTop': navigation.top + 'px',
						'paddingBottom':'20rpx',
						'color':'#fff'}" >
			<view :style="{'height':navigation.height+'px'}" class="topNavigation">
				
				<view style="height: 100%; display: flex;align-items: center;font-size: 34rpx;color: #000;margin-left:20rpx ;font-weight: 800;">
					历史订单
				</view>
			</view>
		</view>
		<view class="good_box">
			<view class="good_item" v-for="(item,index) in orderList" @click="details(index)">
				<view class="good_item_top">
					<view class="">
						<text class="mode">{{item.eatType==0?'外卖':'到店'}}</text> {{item.tiem}}送达
					</view>
					<view class="">
						{{item.static==0?'已完成':'已取消'}}
						<!-- {{}} -->
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
						<view class="address">
							{{item.userAddress}}
						</view>
					</view>
					
					
					
					<view class="requirement">
						<!-- 送货上门 -->
						<view class="phone_img" style="margin: 20rpx;"  @click.stop="gitPhone">
							<image src="../../static/phone.png" style="width: 100%;height: 100%;text-align: center;" mode=""></image>
						</view>
					</view>
				</view>
				<view class="order_miao">
					<view class="order_img_name">
						<view class="order_img">
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
				
				<!-- <view class="agree">
					<view class="" style="width: 30%;color: #999;">
						拒绝
					</view>
					<view class="" style="flex: 1;background: #10C5A5;color: #fff;">
						接单
					</view>
				</view> -->
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				active: 0,
				user:'',
				navigation:'',
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
						id:1,
						eatType:0,
						tiem:'12:30',
						static:1,
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
						eatType:0,
						tiem:'12:30',
						static:1,
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
				]
			}
		},
		created() {
			this.navigation = this.$store.getters.getNavigation
		},
		onShow() {
			this.user = uni.getStorageSync('user')
			this.getOrderLists()
		},
		methods: {
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
					
			details(index){
				uni.navigateTo({
					url:'../../pagesA/orderdDetails/orderdDetails?id='+this.orderList[index].id
				})
			},
			getOrderLists(){
				var data = {
					userId:'',
					storeId:this.user.id
				}
				Api.getOrderList(data).then(res => {
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
	
	.content{
		background: #FAFAFA;
	}
	
	.good_box{
		
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
	
	.order_item_img{
		width: 112rpx;
		height: 112rpx;
		background: #000;
		margin-right: 10rpx;
		border-radius: 10rpx;
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
	
	
	
</style>
