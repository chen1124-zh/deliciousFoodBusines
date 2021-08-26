<template>
	<view style="margin: 30rpx;">
		<view class="tips">
			<view class="icon">
				!
			</view>
			<view class="" style="flex: 1;font-size: 28rpx;">
				请输入商户经营地的经纬度，方便让附近用户发现您的商品，可以增加商品曝光率哦
			</view>
		</view>
		
		<view class="degree">
			<view class="and">
				经度
			</view>
			<input type="number" v-model="lat" @input="inp"/>
		</view>
		
		
		<view class="degree">
			<view class="and">
				纬度
			</view>
			<input type="number" v-model="lon" @input="inp"/>
			
		</view>
		
		<view style="font-size: 28rpx;color: #999;">
			当前位置
		</view>
		<view class="mapBox">
			<map :latitude="lat" :longitude="lon" :markers="covers" style="width: 100%;height: 100%;" v-if="lat != '' && lon != ''"></map>
		</view>
		
		<view class="onekey">
			一键获取，既可输入经纬度
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lat:22.71991,
				lon:114.24779,
				covers: [{
					latitude: 22.71991,
					longitude: 114.24779,
					iconPath: '../../static/location.png',
					width:30,
					height:30
				}]
			}
		},
		onLoad() {
			uni.getLocation({
				type: 'wgs84',
				geocode:true,//设置该参数为true可直接获取经纬度及城市信息
				success: function (res) {
					
					console.log(res)
					// that.addrDel = res;
				},
				fail: function () {
					uni.showToast({
						title: '获取地址失败，将导致部分功能不可用',
						icon:'none'
					});
				}
			});
		},
		methods: {
			inp(e){
				this.covers[0].latitude = this.lat
				this.covers[0].longitude = this.lon
			}
		}
	}
</script>

<style>
	.tips{
		display: flex;
	}
	
	.icon{
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		font-size: 40rpx;
		background: #10C5A5;
		color: #fff;
		margin-right: 20rpx;
	}
	
	.degree{
		display: flex;
		align-items: center;
		margin: 20rpx 0;
	}
	
	.and{
		font-size: 28rpx;
		margin-right: 20rpx;
	}
	
	.degree input{
		flex: 1;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
		padding: 10rpx;
	}
	
	.mapBox{
		width: 100%;
		height: 400rpx;
	}
	
	.onekey{
		width: 90%;
		margin: 20rpx auto;
		border-radius: 50rpx;
		padding: 20rpx;
		border: 3rpx solid #10C5A5;
		color: #10C5A5;
		text-align: center;
	}
</style>
