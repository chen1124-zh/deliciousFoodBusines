<template>
	<view>
		<view class="title">
			店铺标签
		</view>
		<view class="item_lable" @click="lables(1)">
			<view class="" style="color:#999;">
				菜品标签（多选）
			</view>
			<view class="" style="color: #000;">
				<image src="../../static/right.svg" style="width: 10rpx;height: 30rpx;" mode=""></image>
			</view>
		</view>
		<view class="item_lable" @click="lables(2)">
			<view class="" style="color:#999;">
				服务配置（多选）
			</view>
			<view class="" style="color: #000;">
				<image src="../../static/right.svg" style="width: 10rpx;height: 30rpx;" mode=""></image>
			</view>
		</view>
		<view class="item_lable" @click="lables(3)">
			<view class="" style="color:#999;">
				菜单分类（多选）
			</view>
			<view class="" style="color: #000;">
				<image src="../../static/right.svg" style="width: 10rpx;height: 30rpx;" mode=""></image>
			</view>
		</view>
		<view class="item_lable" @click="lables(4)">
			<view class="" style="color:#999;">
				评价管理（多选）
			</view>
			<view class="" style="color: #000;">
				<image src="../../static/right.svg" style="width: 10rpx;height: 30rpx;" mode=""></image>
			</view>
		</view>
		<view class="item_lable" @click="lables(5)">
			<view class="" style="color:#999;">
				菜品特色（多选）
			</view>
			<view class="" style="color: #000;">
				<image src="../../static/right.svg" style="width: 10rpx;height: 30rpx;" mode=""></image>
			</view>
		</view>
		
		<view class="preservation" @click="tiao()">
			保存
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
			lables(index){
				uni.navigateTo({
					url:'../label/label?type='+index
				})
			},
			tiao(){
				uni.navigateBack({
					delta:-1
				})
			}
		}
	}
</script>

<style>
	.title{
		margin:30rpx;
		color: #999;
	}
	.item_lable{
		margin:10rpx 30rpx;
		padding: 20rpx;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
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
