<template>
	<view>
		<view class="i">
			<input type="number" v-model="shopData.deliveryTime" placeholder="配送时间"/>
			<view class="">
				分钟
			</view>
		</view>
		<view class="i">
			<input type="number" v-model="shopData.startingPrice" placeholder="起送价格"/>
			<view class="">
				元起
			</view>
		</view>
		<view class="i">
			<input type="text" v-model="shopData.deliveryRange" placeholder="配送距离"/>
			<view class="">
				米内免费
			</view>
		</view>
		<view class="" style="display: flex;align-items: center;margin: 20rpx;">
			超出距离每千米
			<view class="i" style="flex: 1;margin: 0;margin-left: 5rpx;">
				
				<input type="number" v-model="shopData.deliveryCost" placeholder="配送费" />
				<view class="">
					元
				</view>
			</view>
		</view>
		
		<view class="i">
			<input type="text" v-model="shopData.longDeliveryRange" placeholder="最远配送距离"/>
			<view class="">
				米内
			</view>
		</view>	
		
		<view class="i">
			<view class="" style="padding: 10rpx;color: #999;">
				配送方式
			</view>
			<picker mode="selector" :value="rangeData" :range="rangeData" range-key="name" @change="change">
				<view style="color: #999;">{{rangeData[rangeIndex].name}}</view>
			</picker>
			<!-- <input type="text" value="" placeholder="配送方式"/> -->
			
		</view>	
		
		<view class="" style="font-size: 26rpx;color: #999;margin:0 20rpx;">
			注：团餐和拼餐不计算配送费
		</view>
		
		
		
		<view class="preservation" @click="uShopData()">
			保存
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				rangeData:[
					{
						name:'自送'
					}
				],
				rangeIndex:0,
				shopData:'',
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
			console.log(this.shopData)
				
		},
		methods: {
			change(e){
				this.rangeIndex = e.detail.value
			},
			uShopData(){
				this.shopData.deliveryWay = this.rangeIndex
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
	
	.i{
		margin: 20rpx;
		display: flex;
		align-items: center;
		position: relative;
		border: 1rpx solid #ccc;
		padding: 10rpx;
		border-radius: 10rpx;
	}
	
	view{
		font-size: 24rpx;
	}
	
	input{
		flex: 1;
		/* width: %; */
		padding: 10rpx;
		/* border: 1rpx solid #ccc; */
		font-size: 24rpx;
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
