<template>
	<view>
		<view class="">
			<view class="single_item" v-for="(item,index) in shop" :key='index' @click="setShop(index)">
				<view class="" style="color: #A7A8A7;">
					{{item.name}}
				</view>
				<view class="" style="display: flex;justify-content: center;">
					<text :style="{'color':item.Already?'#000':'#FD6F54'}">{{item.Already?'已设置':'未设置'}}</text> 
					<image src="../../static/right.svg" style="width: 50rpx;height: 100%;" mode=""></image>
				</view>
			</view>
		</view>
		<view class="preservation" @click="upShop()">
			保存
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				shop:[
					{
						name:'店铺信息',
						Already:false,
						path:'../shopInformation/shopInformation'
					},
					{
						name:'店铺标签',
						Already:false,
						path:'../customLabel/customLabel'
					},
					{
						name:'营业时间',
						Already:false,
						path:'../doBusiness/doBusiness'
					},{
						name:'配送设置',
						Already:false,
						path:'../Distribution/Distribution'
					},
					{
						name:'预定设置',
						Already:false,
						path:'../reserve/reserve'
					},{
						name:'餐时设置',
						Already:false,
						path:'../MealTime/MealTime'
					},{
						name:'桌位设置',
						Already:false,
						path:'../position/position'
					},{
						name:'食品安全档案',
						Already:false,
						path:'../archives/archives'
					}
				]
			}
		},
		onShow() {
			var shops = uni.getStorageSync('shopData')
			if(shops == ''){
				
			}else{
				
				if(shops.storePhoto!=''	&&shops.storeLogo!=''&&shops.storeIntroductImg!=''&&shops.storeIntroduct!=''){
					this.shop[0].Already = true
				}
				
				if(shops.foodItem!=''	&&shops.appraiseManager!=''&&shops.foodSort!=''&&shops.servuceConfiguration!=''&&shops.foodLabel!=''){
					this.shop[1].Already = true
				}
				if(shops.businessTime!=''	&&shops.businessDate!=''){
					this.shop[2].Already = true
				}
				if(shops.deliveryTime!=''	&&shops.startingPrice!=''&&shops.deliveryRange!=''&&shops.deliveryCost!=''
				&&shops.longDeliveryRange!=''&& shops.deliveryWay==0 ){
					this.shop[3].Already = true
				}
				
				
				
				if(shops.timeType!=''){
					this.shop[5].Already = true
				}
				
				Api.getSeatList({storeId:shops.id}).then(res => {
					if(res.data.data.length != 0){
						this.shop[6].Already = true
					}
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
				
				if(shops.businessLicense!=''&&shops.license != '' && shops.licenseNo != ''){
					this.shop[7].Already = true
				}
				
			}
		},
		methods: {
			setShop(index){
				uni.navigateTo({
					url:this.shop[index].path
				})
			},
			upShop(){
				
			}
		}
	}
</script>

<style>
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
	
	.single_item{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
		margin:0 30rpx;
		border-bottom:1rpx solid #ccc ;
		font-size: 30rpx;
	}
</style>
