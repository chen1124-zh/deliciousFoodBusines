<template>
	<view style="background: #F8F8F8;padding-bottom: 50rpx;">
		<view class="tips">
			<view class="tips_name" @click="mask = true">
				订单状态>
			</view>
			<view class="" @click.stop="gitPhone">
				<view class="customer_logo" >
					<image src="../../static/service.png" style="width: 100%;height: 100%;" mode=""></image>
				</view>
				<view class="">
					客服
				</view>
			</view>
		</view>
		
		
		<view class="" style="position: relative;">
			
			<view class="" style="position: absolute;top: -20rpx; width: 100%;height: 60rpx;background: #0D92FF;z-index: 0;">
				
			</view>
			
			
		
			<view class="information_box">
				
				
				<view class="title">
					{{orderDetailData.id == 0?'参团列表':orderDetailData.shopName}}
					
				</view>
				<view class="" style="border-top:1rpx solid #f0f0f0 ;" v-for="(item,index) in orderDetailData.goodList" :key='index'>
					<view class="user" v-if="orderDetailData.id == 0">
						<view class="user_img">
							<image :src="item.userImg" mode="" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="user_name">
							{{item.userName}}
						</view>
					</view>
					<view class="good" v-for="(items,indexs) in item.list" :key='index'>
						<view class="good_item">
							<view style="flex: 1;display: flex;align-items: center;">
								<view class="good_img">
									<image :src="items.goodImg" mode="" style="width: 100%;height: 100%;"></image>
								</view>
								<view class="good_name">
									<view class="">
										{{items.goodName}}
									</view>
									<view style="color: #ccc;font-size: 24rpx;" v-if="items.degree">
										{{items.degree}}
									</view>
									
								</view>
							</view>
							<view style="width: 30%; display: flex;align-items: center;justify-content: space-between;">
								<view class="good_num">
									x{{items.num}}
								</view>
								<view class="good_p" style="font-weight: bold;">
									￥{{items.money}}
								</view>
							</view>
							
							
						</view>
					</view>
					
					<view class="package">
						<view class="">
							包装费
						</view>
						<view class="" style="font-weight: bold;">
							￥{{item.packing || 0}}
						</view>
					</view>
					<view class="" style="text-align: right;font-weight: bold;margin: 10rpx 0;"  v-if="orderDetailData.id == 0">
						小计：￥{{item.subtotal}}
					</view>
				</view>
				<view class="package" v-if="orderDetailData.id == 0">
					<view class="">
						合计
					</view>
					<view class="" style="font-weight: bold;">
						￥{{orderDetailData.allPrice}}
					</view>
				</view>
				<view style="text-align: right;color: red;font-weight: bold;" v-else>
					合计：￥<text style="font-size: 34rpx;">{{orderDetailData.allPrice}}</text> 
				</view>
			</view>
				
					
		</view>
		
		
		
		<view class="information_box">
			<view class="title">
				配送信息
			</view>
			<view class="left_right">
				<view class="subject">
					预订时间
				</view>
				<view class="content">
					3月23日 周一 [12:45]
				</view>
			</view>
			<view class="left_right">
				<view class="subject">
					收货地址 <view style="display: inline-block;color: #9F9F9F;background: #F5F5F5;border-radius: 10rpx;padding: 0 10rpx;">站点</view>
				</view>
				<view class="content">
					<text>广州天河南山南比还\n</text> 
					<text>张小飞 18100000000</text>
					
				</view>
			</view>
			<view class="left_right">
				<view class="subject">
					配送方式
				</view>
				<view class="content">
					国社餐厅
				</view>
			</view>
			
		</view>
		
		<view class="information_box">
			<view class="title">
				订单信息
			</view>
			<view class="left_right">
				<view class="subject">
					订单号
				</view>
				<view class="content">
					<text>21152222222222</text><text style="margin: 0 20rpx;">|</text><text style="color: #289EFF;">复制</text>
				</view>
			</view>
			<view class="left_right">
				<view class="subject">
					支付方式
				</view>
				<view class="content">
					在线支付
				</view>
			</view>
			<view class="left_right">
				<view class="subject">
					下单时间
				</view>
				<view class="content">
					2019-9-21 12:10
				</view>
			</view>
			
			
		</view>
		
		
		
		
		<view class="Mask" v-if="mask">
			<view class="" style="width: 78%;">
				<view class="" style="background: #fff;padding: 40rpx;border-radius: 20rpx;">
					<time-axis :dataArray = 'dataArray'></time-axis>
				</view>
				<view @click="mask = false"
				style="text-align: center;margin-top: 30rpx;">
					<uni-icons type="close" size="30" color="#fff"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	import timeAxis from '@/components/time_axis/time_axis.vue'
	export default {
		data() {
			return {
				mask:false,
				dataArray:[
					{
						time:'2020-11-25 17:32:15',
						title:'提交订单',
					},{
						time:'2020-11-25 17:32:15',
						title:'订单支付',
					},{
						time:'2020-11-25 17:32:15',
						title:'商家接单',
					},{
						time:'2020-11-25 17:32:15',
						title:'订单配送',
					},{
						time:'2020-11-25 17:32:15',
						title:'订单送达',
					}
				],
				orderDetailData:{
					id:0,
					shopName:'洞庭麻辣香锅（华景分店）',
					allPrice:4.5,
					goodList:[
						{
							userImg:'../../static/user2.png',
							userName:'电击小子',
							list:[
								{
									goodImg:'../../static/tempGood2.png',
									goodName:'三文鱼',
									num:2,
									money:4.5,
									degree:'3分熟'
								}
							],
							packing:4.5,
							subtotal:41.5
						},
						{
							userImg:'../../static/user2.png',
							userName:'电击小子',
							list:[
								{
									goodImg:'../../static/tempGood2.png',
									goodName:'三文鱼',
									num:2,
									money:4.5,
									degree:'3分熟'
								},
								{
									goodImg:'../../static/tempGood2.png',
									goodName:'三文鱼',
									num:2,
									money:4.5,
									degree:'3分熟'
								}
							],
							packing:0,
							subtotal:41.5
						}
					]
				}
			}
		},
		components:{
			uniIcons,
			timeAxis
		},
		onLoad(op) {
			console.log(op.id)
			this.orderDetailData.id = op.id
			if(this.orderDetailData.id == 1){
				this.orderDetailData.goodList.length = 1
			}
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
		}
	}
</script>

<style>
	
	.tips{
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		background: #0D92FF;
		color: #fff;
	}
	
	.customer_logo{
		width: 40rpx;
		height: 40rpx;
		margin: 0 auto;
		/* background: #000000; */
	}
	
	
	.tips_name{
		font-size: 50rpx;
	}
	
	
	.information_box{
		margin: 20rpx;
		padding: 20rpx;
		background: #fff;
		box-shadow: 0 0 20rpx #f0f0f0;
		border-radius: 10rpx;
		position: relative;
	}
	
	.good{
		margin: 20rpx 0;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.good_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx 0;
	}
	
	.good_img{
		width: 80rpx;
		height: 80rpx;
		background: #0D92FF;
		margin-right: 20rpx;
		overflow: hidden;
	}
	
	.package{
		display: flex;
		justify-content: space-between;
		margin: 30rpx 0;
	}
	
	.title{
		font-size: 32rpx;
		font-weight: bold;
		margin: 20rpx 0;
	}
	
	.left_right{
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
		border-top: 1rpx solid #f0f0f0;
		color: #999;
		
	}
	
	.left_right .subject{
		color: #333;
		margin-right: 50rpx;
	}
	
	.user{
		display: flex;
		align-items: center;
		margin: 20rpx 0;
	}
	
	.user_img{
		width: 60rpx;
		height: 60rpx;
		background: #000000;
		border-radius: 50%;
		margin-right: 10rpx;
		overflow: hidden;
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
	
	
	.content{
		flex: 1;
		text-align: right;
	}
	
	
	
	
</style>
