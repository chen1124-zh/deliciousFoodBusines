<template>
	<view>
		<view class="box">
			<view class="title">
				店铺图标
			</view>
			<view class="s_pass" v-if="!shopicon" @click="addImg(1)">
				<image src="../../static/x.svg" mode=""></image>
			</view>
			
			<view class="s_pass" v-else @click="addImg(1)">
				<image :src="shopicon" mode="" style="width: 100%;height: 100%;"></image>
			</view>
		</view>
		<view class="box">
			<view class="title">
				店铺照片
			</view>
			<view class="s_pass" v-if="!storePhoto" @click="addImg(2)">
				<image src="../../static/x.svg" mode=""></image>
			</view>
			<view class="s_pass" v-else @click="addImg(2)">
				<image :src="storePhoto" mode="" style="width: 100%;height: 100%;"></image>
			</view>
		</view>
		<view class="box">
			<view class="title">
				店铺介绍
			</view>
			<view class="s_pass" v-if="!storeIntroductImg" @click="addImg(3)">
				<image src="../../static/x.svg" mode=""></image>
			</view>
			<view class="s_pass" v-else @click="addImg(3)">
				<image :src="storeIntroductImg" mode="" style="width: 100%;height: 100%;"></image>
			</view>
		</view>
		
		<textarea v-model="storeIntroduct" placeholder="店铺介绍" 
		style="border: 1rpx solid #ccc;margin: 20rpx;border-radius: 10rpx; background: #F0F0F0;padding: 10rpx;"/>
	
		
		<view class="preservation" @click="eShop">
			保存
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				shopicon:'',
				storePhoto:'',
				storeIntroductImg:'',
				storeIntroduct:'',
				shopData:''
			}
		},
		onLoad() {
			this.shopData = uni.getStorageSync('shopData');
			this.shopicon = this.shopData.storeLogo
			this.storePhoto = this.shopData.storePhoto
			this.storeIntroductImg = this.shopData.storeIntroductImg
			this.storeIntroduct = this.shopData.storeIntroduct
		},
		methods: {
			addImg(i){
				
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res) => {
						if(i == 1){
							uni.uploadFile({
								 url : 'http://47.113.217.251:8080/user/fileUpload',
								 filePath: res.tempFilePaths[0],
								 name: 'file',
								
								success: (uploadFileRes)=> {
									console.log(uploadFileRes.data)
									
									var d = uploadFileRes.data.substring(1,uploadFileRes.data.length-1)
									this.shopicon = d
								}
									
									
							})
							
							
						}else if(i == 2){
							
							uni.uploadFile({
								 url : 'http://47.113.217.251:8080/user/fileUpload',
								 filePath: res.tempFilePaths[0],
								 name: 'file',
								
								success: (uploadFileRes)=> {
									console.log(uploadFileRes.data)
									
									var d = uploadFileRes.data.substring(1,uploadFileRes.data.length-1)
									this.storePhoto = d
								}
									
									
							})
							
						}else{
							
							uni.uploadFile({
								 url : 'http://47.113.217.251:8080/user/fileUpload',
								 filePath: res.tempFilePaths[0],
								 name: 'file',
								
								success: (uploadFileRes)=> {
									console.log(uploadFileRes.data)
									
									var d = uploadFileRes.data.substring(1,uploadFileRes.data.length-1)
									this.storeIntroductImg = d
								}
									
									
							})
							// this.storeIntroductImg = res.tempFilePaths[0]
							
						}
						
				        // console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			},
			
			eShop(){
				
				
				this.shopData.storeLogo = this.shopicon
				this.shopData.storePhoto = this.storePhoto
				this.shopData.storeIntroductImg = this.storeIntroductImg
				this.shopData.storeIntroduct = this.storeIntroduct
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
	
	.box{
		margin: 20rpx;
	}
	
	
	.title{
		font-size: 28rpx;
		color: #999;
		margin: 20rpx 0;
	}
	
	.s_pass{
		width: 200rpx;
		height: 160rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		border: 1rpx dashed #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.s_pass image{
		width: 40rpx;
		height: 40rpx;
	}
</style>
