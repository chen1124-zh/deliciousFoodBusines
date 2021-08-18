<template>
	<view>
		<view class="box">
			<view class="name">
				营业执照
			</view>
			<view class="s_pass" @click="addImg(1)" v-if="!business">
				<image src="../../static/x.svg" mode=""></image>
			</view>
			<view class="s_pass"  @click="addImg(1)" v-else>
				<image :src="business" mode="" style="width: 100%;height: 100%;"></image>
			</view>
		</view>
		<view class="box">
			<view class="name">
				经营许可证
			</view>
			<view class="s_pass" @click="addImg(2)" v-if="!management">
				<image src="../../static/x.svg" mode=""></image>
			</view>
			<view class="s_pass"  @click="addImg(2)" v-else>
				<image :src="management" mode="" style="width: 100%;height: 100%;"></image>
			</view>
		</view>
		
		<view class="box">
			<input type="text" v-model="hao" placeholder="许可证号" style="padding: 20rpx;border: 1rpx solid #f0f0f0;border-radius: 10rpx;"/>
		</view>
		
		<view class="preservation" @click="opData">
			保存
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				hao:'',
				management:'',
				business:'',
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
			
			this.business = this.shopData.businessLicense;
			this.management = this.shopData.license
			this.hao = this.shopData.licenseNo
		},
		methods: {
			addImg(index){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res) => {
						if(index == 1){
							this.business =  res.tempFilePaths
						}else{
							this.management =  res.tempFilePaths
						}
						// res.tempFilePaths.map((item)=>{
							
						// 	if(this.img.length >= 6){
						// 		return
						// 	}
							
						// 	uni.uploadFile({
						// 		 url : 'http://47.113.217.251:8080/user/fileUpload',
						// 		 filePath: item,
						// 		 name: 'file',
								
						// 		success: (uploadFileRes)=> {
						// 		  this.img.push({
						// 		  	id:this.imgId++,
						// 		  	path:uploadFileRes
						// 		  })
						// 		}
									
									
						// 	})
							
							
						// })
						
						// console.log(res)
				        // console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			},
			
			opData(){
				
				
					uni.uploadFile({
						 url : 'http://47.113.217.251:8080/user/fileUpload',
						 filePath: this.business,
						 name: 'file',
						
						success: (uploadFileRes)=> {
						  this.business = uploadFileRes.data
						}
							
							
					})
					
					uni.uploadFile({
						 url : 'http://47.113.217.251:8080/user/fileUpload',
						 filePath: this.management,
						 name: 'file',
						
						success: (uploadFileRes)=> {
						  this.management = uploadFileRes.data
						}
							
							
					})
					
					this.shopData.businessLicense = this.business;
					this.shopData.license = this.management
					this.shopData.licenseNo = this.hao
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
	
	.box{
		margin: 30rpx;
	}
	
	.name{
		margin: 20rpx 0;
		color: #999;
	}
	
	.s_pass{
		margin-right: 10rpx;
		margin-bottom: 10rpx;
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
