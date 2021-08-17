<template>
	<view>
		<view class="search">
			<view class="search_box">
				<view class=".search_icon">
					
				</view>
				<view class="">
					水煮牛肉
				</view>
			</view>
		</view>
		
		<view class="title_name">
			<view class="name">
				历史搜索
			</view>
			<view class="d_icon">
				
			</view>
		</view>
		
		<view class="select_name">
			<view class="item">
				皮蛋瘦肉粥
			</view>
			<view class="item">
				皮蛋瘦肉粥
			</view>
			<view class="item">
				皮蛋瘦肉粥
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

	.search{
		/* background-color: #0D92FF; */
		padding: 12rpx 25rpx;
	}
	
	.search_box{
		display: flex;
		align-items: center;
		width: 100%;
		color: #999;
		/* height: 0; */
		background-color: #f0f0f0;
		border-radius: 38rpx;
	}
	
	.search_icon{
		width: 40rpx;
		height: 40rpx;
		padding: 20rpx;
		background: #ccc;
	}
	
	.title_name{
		margin: 70rpx 30rpx 30rpx 30rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.name{
		font-size: 28rpx;
		font-weight: 800;
	}
	
	.d_icon{
		width: 30rpx;
		height: 30rpx;
		background-color: #000000;
	}
	
	
	.select_name{
		/* display: flex; */
		margin: 0 40rpx;
	}
	
	.item{
		float: left;
		margin: 10rpx;
		font-size: 28rpx;
		padding: 10rpx 40rpx;
		background: #f0f0f0;
	}
</style>
