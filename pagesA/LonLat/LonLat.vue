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
		<view class="" v-if="current">
			<view class="" style="flex:1;margin: 10rpx 0;">
				<view class="" style="font-size: 32rpx;color: #10C5A5;">
					{{current.result.formatted_addresses.recommend}}
				</view>
				<view class="" style="font-size: 28rpx;">
					{{current.result.address_component.city}}{{current.result.address_component.district}}{{current.result.address_component.street}}{{current.result.address_component.street_number}}
				</view>
			</view>
		</view>
		<view class="mapBox">
			<map :latitude="lat" :longitude="lon" :markers="covers" style="width: 100%;height: 100%;" v-if="lat != '' && lon != ''"></map>
		</view>
		
		<view class="onekey" @click="jump">
			一键获取，既可输入经纬度
		</view>
		<view class="onekey" style="background: #10C5A5;color: #fff;" @click="latLng" v-if="lat != '' && lon != ''">
			保存
		</view>
		
	</view>
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				qqmapsdk:'',
				current:'',
				lat:'',
				lon:'',
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
			this.qqmapsdk = new QQMapWX({
			    // 在腾讯平台自己申请的秘钥
			    key: '6HXBZ-NCJKU-OA7VM-2YK6B-BYNHJ-LAFLA' 
			})
			uni.getLocation({
				type: 'wgs84',
				geocode:true,//设置该参数为true可直接获取经纬度及城市信息
				success: (res) =>{
					console.log(res)
					this.lat = res.latitude
					this.lon = res.longitude
					this.covers[0].latitude = res.latitude
					this.covers[0].longitude = res.longitude
					// that.addrDel = res;
				},
				fail: function () {
					uni.showToast({
						title: '获取地址失败，将导致部分功能不可用',
						icon:'none'
					});
				}
			});
			
			console.log(2)
		},
		onShow() {
			var u = uni.getStorageSync('tempLanLon')
			console.log(u == '')
			if(u == ''){
				
			}else{
				console.log(1)
				this.lat = u.location.lat
				this.lon = u.location.lng
				this.covers[0].latitude = this.lat
				this.covers[0].longitude = this.lon
				this.locationName(this.lat,this.lon)
			}
			
		},
		methods: {
			locationName(lat,lon){
				console.log(3)
				this.qqmapsdk.reverseGeocoder({
					location:{
						latitude:lat,
						longitude:lon,
					},
					success:(res)=>{
						this.current = res
						console.log(res)
					},
					fail:(e)=>{
						console.log(e)
					}
				})
			},
			jump(){
				uni.navigateTo({
					url:'../address/address'
				})
			},
			inp(e){
				this.covers[0].latitude = this.lat
				this.covers[0].longitude = this.lon
				
				this.locationName(this.lat,this.lon)
			},
			latLng(){
				var data = {
					lat:this.lat,
					lon:this.lon
				}
				uni.setStorageSync('latlon',data)
				uni.navigateBack({
					delta:1
				})
				console.log()
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
