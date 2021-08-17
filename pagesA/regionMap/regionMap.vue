<template>
	<view class="content">
		
		<view class="inp">
			<input type="text" v-model="mapName" @input="inputName"/>
		</view>
		<map :latitude="mapData.latitude" :longitude="mapData.longitude"  :markers="markers" style="width: 100%;height: 40vh;"></map>
		<view class="">
			<view class="title">
				选择地址
			</view>
			<view class="slider">
				<view class="itemSlider" v-for="(item,index) in mapList"  @click="selectMapX(index)" :key='index'>
					{{item.province}}{{item.city}}{{item.title}}
				</view>
			</view>
		
		</view> 
		
		<view class="q" @click="addMap">
			确认
		</view>
	</view> 
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				mapName:'',
				mapList:[],
				mapData:{
					latitude:'',
					longitude:''
				},
				selectMapName:'',
				markers: [
				    {
				        id: 0,
				        latitude: 24.4455700000,
				        longitude: 118.0824000000,
				    }
				],
				mapshow:true,
				type:''
			}
		},
		onLoad(option) {
			
			this.type = option.type
			
		    this.qqmapsdk = new QQMapWX({
		        // 在腾讯平台自己申请的秘钥
		        key: '6HXBZ-NCJKU-OA7VM-2YK6B-BYNHJ-LAFLA' 
		    })
		},
		onShow() {
			this.huoq()
		},
		methods: {
			inputName(){
				let vm = this
				// vm.markers = []
				vm.qqmapsdk.getSuggestion({
					keyword:this.mapName,
				    success: function (res) {
						vm.mapList = res.data
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
			selectMapX(index){
				this.selectMapName = this.mapList[index];
				// console.log(this.markers)
				
				this.mapData.latitude = this.mapList[index].location.lat
				this.mapData.longitude = this.mapList[index].location.lng

				this.markers[0].latitude = this.mapList[index].location.lat
				this.markers[0].longitude = this.mapList[index].location.lng
				// this.mapshow = false
				// setTimeout(()=>{
				// 	this.mapshow = true
				// },500)
				
				this.mapName =  this.mapList[index].province+this.mapList[index].city+this.mapList[index].title
			},
			huoq(){
				var than = this
				uni.getLocation({
					type: 'wgs84',
					geocode:true,//设置该参数为true可直接获取经纬度及城市信息
					success: function (res) {
						than.jed = res
						than.mapData.latitude = res.latitude
						than.mapData.longitude = res.longitude
						
						// than.markers[0].latitude = res.latitude
						// than.markers[0].longitude = res.longitude
						
						// than.getLocal(res.latitude, res.longitude)
					},
					fail: function () {
						uni.showToast({
							title: '获取地址失败',
							icon:'none'
						});
					}
				});
			},
			addMap(){
				uni.setStorageSync('addMap',this.selectMapName);
				uni.navigateBack({
					delta:-1
				})
			}
			// getLocal(latitude, longitude) {
			// 	console.log(123)
			//     let vm = this
			//         vm.qqmapsdk.reverseGeocoder({
			// 	    location: {
			// 	        latitude: latitude,
			// 			longitude: longitude
			// 	    },
			// 	    success: function (res) {
			// 			console.log('res',res)
			// 	    },
			// 	        fail: function (res) { 
			// 		      console.log(res)
			// 		},
			// 		complete: function (res) {
			// 		    // console.log(res)
			// 	    }
			// 	})
			// }
		}
	}
</script>

<style>
	.inp{
		border: 1rpx solid #ccc;
		margin: 20rpx;
		padding: 10rpx;
		border-radius: 20rpx;
	}
	
	.title{
		text-align: center;
		margin: 10rpx;
		font-weight: 600;
	}
	
	.slider{
		overflow-y: auto;
		height: 35vh;
		
	}
	
	.itemSlider{
		border-bottom: 1rpx solid #F0F0F0;
		font-size: 28rpx;
		padding: 20rpx;
	}
	.q{
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 20rpx 0;
		text-align: center;
		background: #007AFF;
	}
	
</style>
