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
			<view class="good_item">
				<view class="good_item_top">
					<view class="">
						12:30
					</view>
					<view class="">
						待接单
					</view>
				</view>
				<view class="user">
					
					<view class="user_logo">
						
					</view>
					<view class="user_N">
						<view class="">
							
							<view class="user_Name">
								张
							</view>
							<view class="user_phone">
								123123123
							</view>
						</view>
						<view class="address">
							广州
						</view>
					</view>
					
					
					
					<view class="requirement">
						送货上门
						<view class="phone_img">
							
						</view>
					</view>
				</view>
				<view class="order_miao">
					<view class="order_img_name">
						<view class="order_img">
							<view class="order_item_img">
								
							</view>
						</view>
						<view class="order_item_name">
							鱼蛋分、肥牛
						</view>
					</view>
					<view class="order_price_num">
						<view class="order_item_price">
							25.5
						</view>
						<view class="order_item_num">
							共4件
						</view>
					</view>
				</view>
				
				
				
			</view>
			
			<view class="good_item">
				<view class="good_item_top">
					<view class="">
						12:30
					</view>
					<view class="">
						待接单
					</view>
				</view>
				<view class="user">
					
					<view class="user_logo">
						
					</view>
					<view class="user_N">
						<view class="">
							
							<view class="user_Name">
								张
							</view>
							<view class="user_phone">
								123123123
							</view>
						</view>
						<view class="address">
							广州
						</view>
					</view>
					
					
					
					<view class="requirement">
						送货上门
						<view class="phone_img">
							
						</view>
					</view>
				</view>
				<view class="order_miao">
					<view class="order_img_name">
						<view class="order_img">
							<view class="order_item_img">
								
							</view>
						</view>
						<view class="order_item_name">
							鱼蛋分、肥牛
						</view>
					</view>
					<view class="order_price_num">
						<view class="order_item_price">
							25.5
						</view>
						<view class="order_item_num">
							共4件
						</view>
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
				active: 0,
				user:'',
				navigation:''
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
	.good_box{
		
	}
	
	.good_item{
		padding: 20rpx;
		margin: 30rpx;
		background-color: #fff;
		box-shadow: 1rpx 1rpx 1rpx #888888;
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
	}
	
	.user_N{
		flex: 1;
	}
	
	.order_miao{
		display: flex;
		justify-content: space-between;
	}
	
	.order_img_name{
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
	}
	
	.order_item_name{
		color: #999;
		margin-left: 20rpx;
	}
	
	.order_item_price{
		color: #000;
		font-size: 50rpx;
	}
	
	.order_item_num{
		font-size: 26rpx;
		text-align: center;
	}
	
	
	
	
</style>
