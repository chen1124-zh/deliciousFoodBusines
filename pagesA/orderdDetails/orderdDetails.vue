<template>
	<view>
		<view class="tips">
			<view class="tips_name">
				订单状态
			</view>
			<view class="">
				<view class="customer_logo">
					
				</view>
				<view class="">
					客服
				</view>
			</view>
		</view>
		
		
		<view class="" style="position: relative;">
			
			<view class="" style="position: absolute;top: -20rpx; width: 100%;height: 60rpx;background: #0D92FF;z-index: -1;">
				
			</view>
			
			<view class="information_box">
				<view class="">
					洞庭麻辣香锅
				</view>
				
				<view class="good">
					<view class="good_item">
						<view class="good_img">
							
						</view>
						<view class="good_name">
							三文鱼
						</view>
						<view class="good_num">
							2
						</view>
						<view class="good_p">
							4.5
						</view>
						
					</view>
				</view>
				
				<view class="package">
					<view class="">
						包装费
					</view>
					<view class="">
						4.5
					</view>
				</view>
				<view class="" style="text-align: right;">
					合计：41:5
				</view>
			</view>
		
			<view class="information_box">
				
				
				<view class="title">
					参团类表
				</view>
				<view class="">
					<view class="user">
						<view class="user_img">
							
						</view>
						<view class="user_name">
							电击小子
						</view>
					</view>
					<view class="good">
						<view class="good_item">
							<view class="good_img">
								
							</view>
							<view class="good_name">
								三文鱼
							</view>
							<view class="good_num">
								2
							</view>
							<view class="good_p">
								4.5
							</view>
							
						</view>
					</view>
					
					<view class="package">
						<view class="">
							包装费
						</view>
						<view class="">
							4.5
						</view>
					</view>
					<view class="" style="text-align: right;">
						小计：41:5
					</view>
				</view>
				<view class="package">
					<view class="">
						合计
					</view>
					<view class="">
						4.5
					</view>
				</view>
				<view class="" style="text-align: right;">
					小计：41:5
				</view>
			</view>
				
					
		</view>
		
		
		
		<view class="information_box">
			<view class="title">
				配送信息
			</view>
			<view class="left_right">
				<view class="">
					预定时间
				</view>
				<view class="">
					111
				</view>
			</view>
			<view class="left_right">
				<view class="">
					预定时间
				</view>
				<view class="">
					111
				</view>
			</view>
			<view class="left_right">
				<view class="">
					预定时间
				</view>
				<view class="">
					111
				</view>
			</view>
			<view class="left_right">
				<view class="">
					预定时间
				</view>
				<view class="">
					111
				</view>
			</view>
			<view class="left_right">
				<view class="">
					预定时间
				</view>
				<view class="">
					111
				</view>
			</view>
		</view>
		
		
		
		
		<view class="Mask">
			<view class="">
				<view class="">
					
				</view>
				<view class="">
					x
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
		width: 30rpx;
		height: 40rpx;
		background: #000000;
	}
	
	
	.tips_name{
		font-size: 50rpx;
	}
	
	
	.information_box{
		margin: 20rpx;
		padding: 20rpx;
		background: #07C160;
		border-radius: 10rpx;
	}
	
	.good_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.good_img{
		width: 80rpx;
		height: 80rpx;
		background: #0D92FF;
	}
	
	.package{
		display: flex;
		justify-content: space-between;
		margin: 30rpx 0;
	}
	
	.title{
		font-size: 32rpx;
		font-weight: 600;
	}
	
	.left_right{
		display: flex;
		justify-content: space-between;
		margin: 30rpx 0;
	}
	
	.user{
		display: flex;
		align-items: center;
	}
	
	.user_img{
		width: 60rpx;
		height: 60rpx;
		background: #000000;
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
	
	
	
</style>
