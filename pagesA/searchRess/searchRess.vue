<template>
	<view>
		<view style="display: flex;align-items: center;">
			<view class="search">
				<view class="city">
					<picker mode="selector" :range="city" @change="change">
						<view>{{city[cityIndex]}}</view>
					</picker>
				</view>
				<view class="inp">
					<uni-icons type="search"></uni-icons>
					<input type="text" v-model="keyword" placeholder="请输入地址" @input="inp"/>
				</view>
			</view>
			<view style="color: #10C5A5;">
				取消
			</view>
		</view>
		
		<view class="" v-if="addressList.length>0">
			<view class="addressItem" v-for="(item,index) in addressList" :key='index'>
				<view class="addressStr">
					{{item.address}}
				</view>
				<view @click="din(index)">
					<image src="../../static/location.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
					<!-- <uni-icons type="map-pin-ellipse" size='30'></uni-icons> -->
				</view>
			</view>
		</view>
		<text style="text-align: center;display: block;" v-else>
			暂无相关地址
			可输入关键字查询
		</text>
		
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
				addressList:[],
			}
		},
		onLoad() {
			this.qqmapsdk = new QQMapWX({
			    // 在腾讯平台自己申请的秘钥
			    key: '6HXBZ-NCJKU-OA7VM-2YK6B-BYNHJ-LAFLA' 
			})
		},
		methods: {
			din(index){
				uni.setStorageSync('tempLanLon',this.addressList[index])
				uni.navigateBack({
					delta:2
				})
			},
			change(e){
				this.cityIndex = e.detail.value
				// console.log(e)
				let vm = this
				vm.qqmapsdk.getSuggestion({
					keyword:this.city[this.cityIndex]+''+this.keyword,
				    success: (res)=> {
						if(res.status == 0){
							if(res.data.length == 0){
								this.addressList = []
							}else{
								this.addressList = res.data
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
			inp(e){
				let vm = this
				vm.qqmapsdk.getSuggestion({
					keyword:this.city[this.cityIndex]+''+this.keyword,
				    success: (res)=> {
						if(res.status == 0){
							if(res.data.length == 0){
								this.addressList = []
							}else{
								this.addressList = res.data
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
		}
	}
</script>

<style>
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
		/* height: 100%; */
		padding: 15rpx;
	}
	
	.inp input{
		margin-left: 10rpx;
		felx:1;
		/* width: 100%; */
		/* height: 100%; */
		
	}
	
	.addressItem{
		font-size: 28rpx;
		padding: 20rpx;
		border-bottom: 1rpx solid #f0f0f0;
		display: flex;
		justify-content: space-between;
	}
	
	.addressStr{
		margin-right: 20rpx;
	}
</style>
