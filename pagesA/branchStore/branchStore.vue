<template>
	<view>
		<view class="bar">
			<view class="" style="width: 100rpx;height: 100rpx;border-radius: 50%;overflow: hidden;margin-right: 20rpx;">
				<image :src="user.images" mode="" style="width: 100%;height: 100%;"></image>
			</view>
			<view class="wordsInformation">
				<view class="name" >
					洞庭麻辣香锅
				</view>
				<view class="words">
					<text>法人：</text>{{user.nickName}}
				</view>
				<view class="words">
					<text>注册账号：</text>123
				</view>
				<view class="words">
					<text>营业期限：</text>123
				</view>
			</view>
		</view>
		
		<view class="shopList">
			<view class="shopItem" v-for="(item,index) in shopData" :key="index">
				<view class="shopImg">
					<image :src="item.storeLogo" mode="" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="shopItemWords">
					<view class="shopName">
						{{item.storeName}}
					</view>
					<view class="">
						<text>负责人:</text>{{user.nickName||''}}
					</view>
					<view class="">
						<text>店员人数：</text>{{item.people||0}}
					</view>
					<view class="">
						<text>店铺地址：</text>
					</view>
					<view class="operation">
						<view class="" @click="ustore(index)">
							<uni-icons type="compose" color="#007AFF"></uni-icons> 编辑
						</view>
						<view class="" @click="dStore(index)">
							<uni-icons type="trash" color="#007AFF"></uni-icons> 删除
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
		
		<view class="add" @click="addShop">
			+ 新增分店
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				user:'',
				shopData:[] 
			}
		},
		onShow() {
			this.user = uni.getStorageSync('user');
			this.getShopList()
		},
		computed:{
			uniIcons
		},
		methods: {
			dStore(index){
				uni.showModal({
					title:'删除店铺',
					content:'确认删除吗',
					success:(res)=>{
						if(res.confirm){
							Api.deleteStore({id:this.shopData[index].id}).then(res => {
								uni.showToast({
									title:'删除成功',
									icon:'none'
								})
								this.getShopList()
							}).catch(err => {
								uni.showToast({
									title: err.msg,
									icon: 'none'
								})
							});
						}else if(res.cancel){
							uni.showToast({
								title:'已取消',
								icon:"none"
							})
						}
					}
				})
			},
			ustore(index){
				uni.setStorageSync('shopDatas',this.shopData[index])
				uni.navigateTo({
					url:'../shopSetUp/shopSetUp'
				})
			},
			
			getShopList(){
				var than = this
				
				
			
				var data = {
					userId:this.user.openId,
				} 
				Api.getStoreList(data).then(res => {
					console.log('res',res);
					if(res.data.length == 0){
						uni.showToast({
							title:'暂无店铺',
							icon:'none'
						}) 
						return
					}
					
					than.shopData = res.data;
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
			},
			addShop(){
				uni.removeStorageSync('addMap')
				uni.navigateTo({
					url:"../addShop/addShop"
				})
			}
		}
	}
</script>

<style>
	.bar{
		background: #10C5A5;
		display: flex;
		padding: 20rpx;
	}
	
	.wordsInformation{
		color: #fff;
		
	}
	
	.wordsInformation .name{
		font-size: 40rpx;
	}
	
	.wordsInformation view{
		margin: 10rpx 0;
	}
	
	.wordsInformation .words{
		font-size: 28rpx;
	}
	
	.wordsInformation .words text{
		display: inline-block;
		width: 150rpx;
	}
	
	.add{
		width: 100%;
		font-size: 34rpx;
		padding: 40rpx 0;
		position: fixed;
		bottom: 0;
		text-align: center;
		color: red;
		border-top: 1rpx solid #F0F0F0;
	}
	
	.shopItem{
		display: flex;
		margin: 30rpx;
		border-radius: 10rpx;
		padding: 30rpx;
		box-shadow: 0rpx 0rpx 5rpx #888888;
	}
	
	.shopImg{
		border-radius: 10rpx;
		width: 80rpx;
		height: 80rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}
	
	.shopName{
		font-weight: 600;
	}
	
	
	.shopItemWords{
		flex: 1;
	}
	
	.shopItemWords view{
		font-size: 30rpx;
		margin: 5rpx;
	}
	
	.shopItemWords text{
		display: inline-block;
		width: 160rpx;
		color: #999;
	}
	
	.operation{
		display: flex;
		justify-content: flex-end;
	}
	
	.operation view{
		color: #007AFF;
		margin: 0 20rpx;
	}
	
	.uni-icons{
		width: 40rpx !important;
	}
	
</style>
