<template>
	<view>
		<view class="selectList">
			<view :class="select == 0?'selectA':''" @click="select = 0">
				餐型
			</view>
			<view :class="select == 1?'selectA':''" @click="select = 1">
				订座
			</view>
		</view>
		
		<view class="" v-if="select == 0">
			<view class="" style="display: flex;flex-wrap: wrap;">
				<view class="choice">
					<view class="icon">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						行政套餐
					</view>                             
				</view>
				<view class="choice">
					<view class="icon">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						自选套餐
					</view>  
					
				</view>
				<view class="choice">
					<view class="icon">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						会务套餐
					</view>  
					
				</view>
				<view class="choice">
					<view class="icon">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						零食
					</view>  
					
				</view>
				<view class="choice">
					<view class="icon">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						贵宾
					</view>
					
				</view>
			</view>
			
			<view class="current">
				当前选择
			</view>
			
			<view class="package">
				<view class="">
					行政套餐
				</view>
				<view class="">
					自选套餐
				</view>
				
				
			</view>
			
			<view class="meal">
				<view class="time">
					早餐
				</view>
				<view class="day" style="margin: 10rpx 0;">
					<view class="icon">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						<text>当天预约</text>
						<text>
							7:00 
						</text>
						<text>前预定</text>
					</view>
					
				</view>
				<view class=""  style="display: flex;">
					<view class="day">
						<view class="icon">
							<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
						</view>
						<view class="">
							隔天预定
						</view>
						
					</view>
					<view class="">
						<view class="">
							往后1至30天预约
						</view>
						<view class="">
							今天23:00前预约
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="" v-else>
			<view class="">
				<image src="" mode=""></image>
			</view>
			<view class="">
				<view class="">
					包厢
				</view>
				<view class="">
					卡座
				</view>
				<view class="">
					大厅
				</view>
			</view>
			<view class="">
				当天预约 7:00 前预定
			</view>
			<view class="">
				<view class="">
					隔天预定
				</view>
				<view class="">
					<view class="">
						往后1至30天预约
					</view>
					<view class="">
						今天23:00前预约
					</view>
				</view>
			</view>
			<view class="">
				起定6人
			</view>
		</view>
		
		<view class="preservation" @click="opData">
			保存
		</view>
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				select:0,
			}
		},
		components:{
			uniIcons
		},
		methods: {
			
		}
	}
</script>

<style>
	view{
		font-size: 28rpx;
	}
	.selectList{
		display: flex;
		justify-content: center;
		margin: 30rpx;
	}
	
	.selectList view{
		padding:20rpx 30rpx ;
		box-shadow: 0 0 10rpx #eeeeee; 
		border-radius: 10rpx 10rpx 0 10rpx;
		/* background: ; */
	}
	
	.selectA{
		background: #270546;
		color: #fff;
	}
	
	.choice{
		display: flex;
		/* flex-wrap: wrap; */
		margin: 10rpx 30rpx;
		align-items: center;
	}
	
	.icon{
		width: 30rpx;
		height: 30rpx;
		background: #C7C7C7;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 10rpx;
	}
	
	.current{
		text-align: center;
		font-size: 36rpx;
		font-weight: 600;
		margin: 30rpx 0 0 10rpx;
	}
	
	
	.package{
		display: flex;
	}
	
	
	.package view{
		font-size: 32rpx;
		color: #999;
		margin: 20rpx;
	}
	
	.meal{
		margin: 10rpx 30rpx;
	}
	
	.time{
		font-size: 32rpx;
		color: #999;
		margin: 20rpx 0;
	}
	
	.day{
		display: flex;
		/* align-items: center; */
		
	}
	
	
	
	.preservation{
		position: fixed;
		bottom: 30rpx;
		width: 90%;
		height: 100rpx;
		background: #10C5A5;
		box-direction: unset;
		margin: 0 5%;
		border-radius: 10rpx;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
