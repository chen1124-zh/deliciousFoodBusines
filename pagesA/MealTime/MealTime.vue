<template>
	<view class="select_box">
		<!-- <view class="title">
			时段
		</view> -->
		<view class=""style=" display: flex;align-items: center; margin: 10rpx 30rpx;"  v-for="(item,index) in typeList" :key='index' @click="s(index)">
			
			<view class="selectBox">
				<view class="zho" v-if="item.select">
					
				</view>
			</view>
			<view class="" style="margin:20rpx 50rpx 20rpx 5rpx;">
				{{item.name}}
			</view>
			<view 
			style="display: flex;align-items: center; border: 1rpx solid #f0f0f0;padding: 10rpx 20rpx;border-radius: 10rpx;">
				<view class="" style="color: #999;">
					{{item.stime}}
				</view>
				<view class="" style="margin:0 20rpx;">
					至
				</view>
				<view class="" style="color: #999;">
					{{item.etime}}
				</view>
			</view>
		</view>
		
		<view class="preservation" @click="ushopData">
			保存
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				typeList:[
					{
						name:'早餐',
						stime:'07:00',
						etime:'09:00',
						select:false
					},
					{
						name:'早茶',
						stime:'09:00',
						etime:'11:30',
						select:false
					},
					{
						name:'午餐',
						stime:'11:30',
						etime:'14:00',
						select:false
					},
					{
						name:'下午茶',
						stime:'14:00',
						etime:'18:00',
						select:false
					},
					{
						name:'晚餐',
						stime:'18:00',
						etime:'21:00',
						select:false
					},
					{
						name:'宵夜',
						stime:'21:00',
						etime:'02:00',
						select:false
					}
				],
				shopData:''
			}
		},
		onLoad() {
			var tempshop = uni.getStorageSync('shopDatas')
			var shops
			if(tempshop == ''){
				shops = uni.getStorageSync('shopData')
			}else{
				shops = tempshop
			}
			this.shopData = shops
		},
		methods: {
			s(index){
				this.typeList[index].select = !this.typeList[index].select
				console.log(this.typeList)
			},
			ushopData(){
				this.shopData.timeType = JSON.stringify(this.typeList)
				var data = this.shopData
				Api.updateStore(data).then(res => {
					// console.log('res',res);
					uni.showToast({
						title:'修改成功',
						icon:'none'
					})
					
					uni.setStorageSync('shopData',data)
					
					uni.navigateBack({
						delta:-1
					})
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
	
	.selectBox{
		width: 25rpx;
		height: 25rpx;
		border-radius: 50%;
		border: 1rpx solid #ccc;
		padding: 5rpx;
	}
	
	.zho{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #007AFF;
		
	}
	
	.select_box{
		/* margin: 30rpx; */
		font-size: 24rpx;
		overflow: hidden;
	}
	
	
	.select_item{
		float: left;
		padding:10rpx 20rpx;
		background: #007AFF;
		border-radius: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
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
