<template>
	<view style="height: 100vh;display: flex;flex-wrap: wrap;justify-content: center;align-items: center;">
		<view class="">
			
		</view>
		<view class="">
			请等待审核结果
		</view>
		
		<view class="shu" @click="userClick">
			刷新
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				user:''
			}
		},
		methods: {
			userClick(){
				this.user = uni.getStorageSync('user')
				this.user.status = 2
				
				var data = {
					id:this.user.id,
					nickName:this.user.nickName,   //昵称
					mobile:this.user.mobile,   //手机号
					isVip:this.user.isVip,    //是否为会员
					images:this.user.images,    //头像
					userName:'',   //账号
					password:'',   //密码
					accountType:2,   //账号类型	
					addTotal:0,  //累计消费
					orderNum:0,  //累计下单量
					accountMoney:0, //账户余额
					isvipLevel:0,   //会员等级
					status:2
				}
				
				Api.updateUser(data).then(res => {
					// uni.showToast({
					// 	title:'修改成功',
					// 	icon:'none'
					// })
					uni.setStorageSync('user',this.user)
					uni.navigateBack({
						delta:-1
					})
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
				
				return
					uni.getUserProfile({
						desc: '登录',
						success: (res) => {
							
							uni.login({
								success: (ress) => {
									let code = ress.code
									uni.request({
										url: 'http://47.113.217.251:8080/user/save', //仅为示例，并非真实接口地址。
										method:"POST",
										data: {           
											"code":code,
											"type":2,
											"rawData":{
												"nickName":res.userInfo.nickName,
												"mobile":"",
												"isVip":0,
												"images":res.userInfo.avatarUrl,
												"userName":"",
												"password":"",
												"accountType":2,
												"gender":res.userInfo.gender,
												"name":res.userInfo.nickName,
												"addTotal":0,
												"orderNum":0,
												"accountMoney":0,
												"isvipLevel":''
											}
										},
										success: (resdata) => {
											uni.setStorageSync('token',resdata.data.data.data.openId);
											uni.setStorageSync('user',resdata.data.data.data);
											console.log(resdata.data.data.data)
											if(resdata.data.data.data.status != 0 && resdata.data.data.data.status != 1 ){
												uni.navigateBack({
													delta:-1
												})
											}else{
												uni.showToast({
													title:'还在审核中',
													icon:"none"
												})
											}
											
											
										
										}
									});
									
								},
							})
						},
						fail() {
							uni.showToast({
								title: '需要授权后才能继续',
								duration: 1500,
								icon: 'none'
							})
						}
					})
				
				
			},
		}
	}
</script>

<style>
	.shu{
		position: fixed;
		bottom: 20rpx;
		width: 90%;
		border-radius: 20rpx;
		color: #fff;
		text-align: center;
		padding: 30rpx 0;
		background: #10C5A5;
	}
</style>
