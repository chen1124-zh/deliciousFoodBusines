<template>
	<view class="content">
		<view :style="{'height':navigation.height+'px',
						'paddingTop': navigation.top + 'px',
						'paddingBottom':'20rpx',
						'color':'#fff'}" >
			<view :style="{'height':navigation.height+'px'}" class="topNavigation">
				
				<view style="height: 100%; display: flex;align-items: center;font-size: 34rpx;color: #000;margin-left:20rpx ;font-weight: 800;">
					商品管理
				</view>
			</view>
		</view>
		<view class="button">
			<view class="c" @click="classifi">
				菜单分类
			</view>
			<view class="a" @click="addCommodity">
				添加新商品
			</view>
		</view>
		
		
		<view class="week">
			<view :class="week==1?'weekSelect':''" @click="week=1;getGoodData()">
				周一
			</view>
			<view :class="week==2?'weekSelect':''" @click="week=2;getGoodData()">
				周二
			</view>
			<view :class="week==3?'weekSelect':''" @click="week=3;getGoodData()">
				周三
			</view>
			<view :class="week==4?'weekSelect':''" @click="week=4;getGoodData()">
				周四
			</view>
			<view :class="week==5?'weekSelect':''" @click="week=5;getGoodData()">
				周五
			</view>
			<view :class="week==6?'weekSelect':''" @click="week=6;getGoodData()">
				周六
			</view>
			<view :class="week==0?'weekSelect':''" @click="week=0;getGoodData()">
				周日
			</view>
		</view>
		
		
		<view class="good_box">
			<view class="good_left">
				<view class="time">
					<picker mode="selector" :range="cs" range-key="name" @change="cschange">
						<view>{{cs[csIndex].name}}</view>
					</picker>
				</view>
				<view class="good_title_select">
					<view :class="classifSelect==index?'selectGood':''" v-for="(item,index) in classifiList" :key='index' @click="classClick(index)">
						<text>{{item.menuName}}</text>
					</view>
					
				</view>
			</view>
			<view class="good_right">
				<view class="good_title">
					{{classifiList[classifSelect].menuName}}
				</view>
				<view class="good_item_box">
					<view class="good_item" v-for="(item,index) in goodList" :key='index'>
						<view class="good_img">
							<image :src="item.img" style="width: 100%;height: 100%;" mode=""></image>
						</view>
						<view class="good_content">
							<view class="good_name">
								{{item.productName}}
							</view>
							<view class="good_describe">
								{{item.describe}}
							</view>
							<view class="operation">
								<view class="price_discount">
									<view class="discount" v-if="false">
										9.8
										<!-- ￥{{item.linedPrice}} -->
									</view>
									<view class="price">
										￥{{item.productPrice}}
									</view>
								</view>
								
								<view class="cz" >
									<text class="" @click="uGoog(index)">
										修改
									</text>
									<text class="" @click="sxGoog(index)">
										{{item.productStatus == 1?'下架':'上架'}}
										
									</text>
								</view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				cs:[
					{
						name:'早茶',
						value:'zc'
					},
					{
						name:'早餐',
						value:'zcn'
					},
					{
						name:'午餐',
						value:'wc'
					},
					{
						name:'下午茶',
						value:'xwc'
					},
					{
						name:'晚餐',
						value:'wcn'
					},
					{
						name:'夜宵',
						value:'yx'
					}
				],
				csIndex:0,
				week:1,
				active: 0,
				navigation:'',
				shopData:null,
				classifSelect:0,
				classifiList:[],
				goodList:[]
			}
		},
		onShow() {
			this.getUser()
			
			// this.getGoodData()
		},
		created() {
			this.navigation = this.$store.getters.getNavigation
		},
		onLoad() {

		},
		methods: {
			getUser(){
				var than = this
				var user = uni.getStorageSync('user')
				
				if(user == ''){
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
												"addTotal":0,
												"orderNum":0,
												"accountMoney":0,
												"isvipLevel":''
											}
										},
										success: (resdata) => {
											this.user = resdata.data.data.data
											uni.setStorageSync('token',resdata.data.data.data.openId);
											uni.setStorageSync('user',resdata.data.data.data);
											
											if(this.user.status == 0){
												uni.removeStorageSync('addMap')
												uni.navigateTo({
													url:'../../pagesA/Induction/Induction'
												})
												return
											}
											
											if(this.user.status == 1){
												
												uni.navigateTo({
													url:'../../pagesA/examine/examine'
												})
												return
											}
										
											// Api.getStoreList({userId:resdata.data.data.data.openId}).then(res => {
											// 	// console.log('res',res);
											// 	if(res.data.length == 0){
											// 		uni.showToast({
											// 			title:'暂无店铺',
											// 			icon:'none'
											// 		})
											// 		return
											// 	}
											// 	than.shopData = res.data[0];
											// 	uni.setStorageSync('shopData',than.shopData)
											// }).catch(err => {
											// 	uni.showToast({
											// 		title: err.msg,
											// 		icon: 'none'
											// 	})
											// });
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
				}else{
					this.getMenuTypeListData()
				}
				
			},
			sxGoog(index){
				var data = goodList[index]
				if(data.productStatus == 1){
					data.productStatus = 0
				}else{
					data.productStatus = 1
				}
				
				
				Api.updateProduct(data).then(res => {
					
					if(res.code == 200){
						uni.showToast({
							title:"修改成功",
							icon:"none"
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:-1
							})
						},1000)
					}else{
						uni.showToast({
							title:"修改失败！！！",
							icon:"none"
						})
					}
					
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
			},
			uGoog(index){
				uni.setStorageSync('uGood',this.goodList[index])
				uni.navigateTo({
					url:'../../pagesA/addCommodity/addCommodity'
				})
			},
			cschange(e){
				this.csIndex = e.detail.value;
				this.getGoodData()
			},
			classClick(index){
				this.classifSelect = index;
				this.getGoodData()
			},
			
			classifi(){
				uni.navigateTo({
					url:"../../pagesA/classification/classification"
				})
			},
			addCommodity(){
				uni.removeStorage({
					key:'uGood'
				})
				// uni.clearStorageSync('uGood')
				uni.navigateTo({
					url:"../../pagesA/addCommodity/addCommodity"
				})
			},
			getMenuTypeListData(){
				var than = this
				this.shopData = uni.getStorageSync('shopData');
				var data = {
					 storeId:this.shopData.id
				}
				Api.getMenuTypeList(data).then(res => {
					
					than.classifiList = res.data.data
					than.getGoodData()
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
			},
			getGoodData(){
				this.shopData = uni.getStorageSync('shopData');
				var data = {
					 storeId:this.shopData.id,
					 menuType:this.classifiList[this.classifSelect].id,
					 week1: this.week==1?1:'',
					 week2: this.week==2?1:'',
					 week3: this.week==3?1:'',
					 week4: this.week==4?1:'',
					 week5: this.week==5?1:'',
					 week6: this.week==6?1:'',
					 week7: this.week==0?1:'',
					 zc: this.cs[this.csIndex].value == 'zc'?1:'',
					 zcn: this.cs[this.csIndex].value == 'zcn'?1:'',
					 wc: this.cs[this.csIndex].value == 'wc'?1:'',
					 xwc: this.cs[this.csIndex].value == 'xwc'?1:'',
					 wcn: this.cs[this.csIndex].value == 'wcn'?1:'',
					 xy: this.cs[this.csIndex].value == 'xy'?1:'',
				}
				
				
				Api.getProductList(data).then(res => {
					this.goodList = res.data.data
					
					this.goodList.map((item)=>{
						console.log(item.productImg)
						console.log()
						if(item.productImg != undefined){
							item.img = item.productImg.split(',')[0]
						}
					})
					
					
					console.log(res)
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
	.button{
		display: flex;
		justify-content: space-between;
	}
	
	.button view{
		flex: 1;
		text-align: center;
		margin: 20rpx;
		padding: 20rpx 0;
		border-radius: 20rpx;
	}
	
	.button .c{
		border: 4rpx solid #10C5A5;
		color: #10C5A5;
	}
	
	.button .a{
		background: #10C5A5;
		color: #fff;
	}
	
	
	.week{
		display: flex;
		margin: 20rpx;
	}
	
	.week view{
		text-align: center;
		flex: 1;
		padding: 10rpx 0;
		border-radius: 15rpx 15rpx 0 15rpx;
		box-shadow: 0rpx 0rpx 5rpx #ccc;
	}
	
	.good_box{
		display: flex;
	}
	
	.time{
		margin: 20rpx;
		padding:10rpx 20rpx;
		background: #F0F0F0;
		border-radius: 20rpx;
		color: #999;
	}
	.good_title_select{
		width: 190rpx;
		background: #F8F8F8;
	}
	
	.good_title_select view{
		width: auto;
		padding: 0 6rpx;
		
	}
	
	.good_title_select view text{
		display: block;
		text-align: center;
		padding: 20rpx 0;
		margin: 10rpx 0;
	}	
	
	.good_title_select .selectGood text{
		display: block;
		text-align: center;
		padding: 20rpx 0;
		margin: 10rpx 0;
		background: #fff;
		border-left: 6rpx solid #289EFF;
	}
	
	.good_right{
		margin-left: 30rpx;
		flex: 1;
	}
	.good_title{
		margin: 20rpx 0;
		font-size: 30rpx;
	}
	
	
	.good_item{
		margin: 20rpx 0;
		display: flex;
		align-items: center;
	}
	
	.good_img{
		width: 200rpx;
		height: 200rpx;
		background: #000000;
		margin-right: 10rpx;
		overflow: hidden;
	}
	
	.good_name{
		font-size: 30rpx;
		font-weight: 800;
	}
	
	.good_describe{
		font-size: 28rpx;
		color: #D4C3CE;
	}
	
	.operation{
		display: flex;
		align-items: flex-end;
	}
	
	.weekSelect{
		color: #fff;
		background: #270546;
	}
	
	.cz text{
		display: inline-block;
		background-color: #10C5A5;
		color: #fff;
		font-size: 24rpx;
		padding: 5rpx 10rpx;
		border-radius: 10rpx;
		margin: 0 20rpx;
	}
	
</style>
