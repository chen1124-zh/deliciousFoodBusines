<template>
	<view>
		<view class="search">
			<view class="city">
				<picker mode="selector" :range="city" @change="change">
					<view>{{city[cityIndex]}}</view>
				</picker>
			</view>
			<view class="inp">
				<uni-icons type="search"></uni-icons>
				<input type="text" v-model="keyword" @input="inp"/>
			</view>
		</view>
		
		<view class="mapBox">
			<map :latitude="lat" :longitude="lon" :markers="covers" style="width: 100%;height: 100%;" v-if="lat != '' && lon != ''"></map>
		</view>
		<view style="margin: 20rpx;">
			<view class="" style="font-size: 28rpx;color: #999;">
				当前位置
			</view>
			<view class="" style="display: flex;align-items: center;margin: 10rpx 0;">
				<view class="" style="flex:1;margin: 10rpx 0;">
					<view class="" style="font-size: 32rpx;color: #10C5A5;">
						{{current.position.result.formatted_addresses.recommend}}
					</view>
					<view class="" style="font-size: 28rpx;">
						{{current.position.result.address_component.city}}{{current.position.result.address_component.district}}{{current.position.result.address_component.street}}{{current.position.result.address_component.street_number}}
					</view>
				</view>
				<view class="" style="color: #10C5A5;">
					使用该地址
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				qqmapsdk:'',
				city:[
					'广州',
					'深圳'
				],
				cityIndex:0,
				keyword:'',
				current:{
					lat:22.71991,
					lon:114.24779,
					position:''
				},
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
		onLoad(option) {
			// this.type = option.type
			
			this.qqmapsdk = new QQMapWX({
			    // 在腾讯平台自己申请的秘钥
			    key: '6HXBZ-NCJKU-OA7VM-2YK6B-BYNHJ-LAFLA' 
			})
			
			
			uni.getLocation({
				type: 'wgs84',
				geocode:true,//设置该参数为true可直接获取经纬度及城市信息
				success: (res)=> {
					
					this.current.lat = res.latitude
					this.current.lon = res.longitude
					this.lat = res.latitude
					this.lon = res.longitude
					this.covers[0].latitude = this.lat
					this.covers[0].longitude = this.lon
					
					
					this.qqmapsdk.reverseGeocoder({
						location:{
							latitude:this.current.lat,
							longitude:this.current.lon,
						},
						success:(res)=>{
							this.current.position = res
							console.log(this.current.position)
						},
						fail:(e)=>{
							console.log(e)
						}
					})
					
					// this.analysis(this.current.position,this.current.lat,this.current.lon)
					// console.log(this.analysis(this.current.lat,this.current.lon))
					// console.log(res)
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
			// analysis(obj,lat,lon){
			// 	this.qqmapsdk.reverseGeocoder({
			// 		location:{
			// 			latitude:this.current.lat,
			// 			longitude:this.current.lon,
			// 		},
			// 		success:(res)=>{
			// 			console.log(res)
			// 		},
			// 		fail:(e)=>{
			// 			console.log(e)
			// 		}
			// 	})
				
			// },
			inp(e){
				let vm = this
				vm.qqmapsdk.getSuggestion({
					keyword:this.city[this.cityIndex]+''+this.keyword,
				    success: (res)=> {
						if(res.status == 0){
							if(res.data.length == 0){
								
							}else{
								
							}
						}
						
						console.log('res',res)
				    },
				        fail: function (res) { 
					      console.log(res)
					},
					complete: function (res) {
					    // console.log(res)
				    }
				})
			},
			change(e){
				this.cityIndex = e.detail.value
				// console.log(e)
			}
		}
	}
</script>

<style>
	.mapBox{
		width: 100%;
		height: 400rpx;
	}
	
	.search{
		display: flex;
		margin: 30rpx;
		border: 3rpx solid #10C5A5;
		/* padding: 20rpx; */
		border-radius: 50rpx;
	}
	
	.city{
		padding:15rpx 30rpx;
		border-right: 1rpx solid #10C5A5;
	}
	
	
	.inp{
		display: flex;
		flex: 1;
		width: 100%;
		height: 100%;
		padding: 15rpx;
	}
	
	.inp input{
		margin-left: 10rpx;
		felx:1;
		/* width: 100%; */
		height: 100%;
		
	}
	
</style>
