<template>
	<view class="content">
		<view :style="{'height':navigation.height+'px',
						'paddingTop': navigation.top + 'px',
						'paddingBottom':'20rpx',
						'backgroundColor':'#270546',
						'color':'#fff'}" >
			<view :style="{'height':navigation.height+'px'}" class="topNavigation">
				 
				
				<view class="user_content" @click="userClick()">
					<view class="user_img">
						<image :src="user.images" mode="" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="user_name">
						{{user.nickName}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="all_achievement">
			<view class="switchs" @click="sW">
				切换店铺
			</view>
			<view class="bang">
				<view class="" style="font-size: 36rpx;">
					￥12312
				</view>
				<view class="" style="font-size: 20rpx;">
					累计收益
				</view>
			</view>
			<view class="achievement">
				<view class="">
					<view class="achievement_num">
						32425
					</view>
					<view class="achievement_name">
						就餐人数
					</view>
				</view>
				<view class="">
					<view class="achievement_num">
						32425
					</view>
					<view class="achievement_name">
						就餐人数
					</view>
				</view>
				<view class="">
					<view class="achievement_num">
						32425
					</view>
					<view class="achievement_name">
						就餐人数
					</view>
				</view>
			</view>
		</view>
		
		<view class="store_content">
			<view class="barck">
				
			</view>
			<view class="store_box">
				<view class="img_name">
					<view class="img">
						<image :src="shopData.storeLogo" style="width: 100%;height: 100%;" mode=""></image>
					</view>
					<view class="">
						<view class="store_name">
							{{shopData.storeName}}
						</view>
						<view class="follow">
							关注人
						</view>
					</view>
				</view>
				
				<view class="Specifications">
					<view class="Specifications_item">
						<view class="Specifications_item_img">
							<image src="../../static/Dishes.png" mode=""></image>
						</view>
						<view class="">
							<view class="Specifications_title">
								菜品
							</view>
							<view class="people_num">
								12
							</view>
						</view>
					</view>
					<view class="Specifications_item">
						<view class="Specifications_item_img">
							<image src="../../static/Package.png" mode=""></image>
						</view>
						<view class="">
							<view class="Specifications_title">
								套餐
							</view>
							<view class="people_num">
								12
							</view>
						</view>
					</view>
					<view class="Specifications_item">
						<view class="Specifications_item_img">
							<image src="../../static/meal.png" mode=""></image>
						</view>
						<view class="">
							<view class="Specifications_title">
								餐位
							</view>
							<view class="people_num">
								12
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	
		<view class="static_num">
			<view class="static_name">
				待接单
			</view>
			<view class="static_name">
				待配送
			</view>
			<view class="static_name">
				配送中
			</view>
			<view class="static_name">
				待就餐
			</view>
			<view class="static_name">
				售后
			</view>
		</view>
		
		<view class="good_box">
			<view class="good_item">
				<view class="good_item_top">
					<view class="">
						12:30
					</view>
					<view class="">
						待接单
					</view>
				</view>
				<view class="user">
					
					<view class="user_logo">
						
					</view>
					<view class="user_N">
						<view class="">
							
							<view class="user_Name">
								张
							</view>
							<view class="user_phone">
								123123123
							</view>
						</view>
						<view class="address">
							广州
						</view>
					</view>
					
					
					
					<view class="requirement">
						送货上门
						<view class="phone_img">
							
						</view>
					</view>
				</view>
				<view class="order_miao">
					<view class="order_img_name">
						<view class="order_img">
							<view class="order_item_img">
								
							</view>
						</view>
						<view class="order_item_name">
							鱼蛋分、肥牛
						</view>
					</view>
					<view class="order_price_num">
						<view class="order_item_price">
							25.5
						</view>
						<view class="order_item_num">
							共4件
						</view>
					</view>
				</view>
				
				<view class="agree">
					<view class="">
						拒绝
					</view>
					<view class="">
						接单
					</view>
				</view>
				
				
			</view>
		</view>
	
		<view class="Mask " :style="{'justifyContent':Distribution?'center':'space-between'}"  v-if="match" @click="match=false;userSelectImg=false">
			<view class="personal" :style="{'marginTop': navigation.height+navigation.top + 'px'}" v-if="userSelectImg">
				<view class="personal_content">
					<view class="personal_user_img">
						<image :src="user.images" mode="" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="">
						<view class="">
							{{user.nickName}}
						</view>
						<view class="">
							{{user.mobile}}
						</view>
					</view>
				</view>
				<view class="select_content">
					
					<view class="function">
						<text class="text_name">绑定手机号</text>
						<text>{{user.mobile}}</text>
					</view>
					
				</view>
			</view>
			
			
			<view class="switch" v-if='shopShow'>
				<view class="cole">
					关闭
				</view>
				<view class="switch_title">
					
					切换店铺
					
				</view>
				
				<view class="se" v-for="(item,index) in shopDataList" :key='index' @click.stop="qhuang(index)">
					{{item.storeName}}
				</view>
			</view>
		
			<view class="Distribution_box" v-if="Distribution">
				<view class="Distribution_select">
					<text>商家自配送</text>
					<text>外面员配送</text>
				</view>
				
				<view class="">
					<input type="text" value="" placeholder="配送员名字" class="Distribution_inp"/>
					<input type="text" value="" placeholder="联系电话" class="Distribution_inp"/>
				</view>
				
				<view class="agree">
					<view class="">
						拒绝
					</view>
					<view class="">
						接单
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
				shopShow:false,
				user:null,
				navigation:'',
				match:false,
				userSelectImg:false,
				Distribution:false,
				shopData:null,
				shopDataList:null
			}
		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync('user');
			if(this.user == ''){
				
			}else{
				if(this.user.status == 0){
					uni.removeStorageSync('addMap')
					uni.navigateTo({
						url:'../../pagesA/Induction/Induction'
					})
					return
				}
				
				if(this.user.status == 1){
					// uni.removeStorageSync('addMap')
					uni.navigateTo({
						url:'../../pagesA/examine/examine'
					})
					return
				}
				this.getStoreList()
			}
			
		},
		created() {
			this.navigation = this.$store.getters.getNavigation
		},
		methods: {
			qhuang(index){
				this.shopData = this.shopDataList[index];
				uni.setStorageSync('shopData',this.shopData);
				
				this.match = false
				this.shopShow = false
				uni.showToast({
					title:'切换成功',
					icon:'none'
				})
			},
			sW(){
				this.match = true
				this.shopShow = true;
				this.getshop()
			},
			getshop(){
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
					console.log(res)
					than.shopDataList = res.data
					console.log(than.shopDataList)
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
			},
			getStoreList(){
				var than = this
				
				var tempShopData = uni.getStorageSync('shopData')
				if(tempShopData == ''){
					
					var data = {
						userId:this.user.openId,
					} 
					Api.getStoreList(data).then(res => {
						// console.log('res',res);
						if(res.data.length == 0){
							uni.showToast({
								title:'暂无店铺',
								icon:'none'
							})
							return
						}
						than.shopDataList = res.data
						
						than.shopData = res.data[0];
						uni.setStorageSync('shopData',than.shopData)
					}).catch(err => {
						uni.showToast({
							title: err.msg,
							icon: 'none'
						})
					});
				}else{
					than.shopData = tempShopData
				}
			},
			userClick(){
				this.match = true;
				this.userSelectImg = true;
				this.Distribution = false
			},
			gitPhone(){
				uni.showActionSheet({
				    itemList: ['A', 'B', 'C'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			}
		}
	}
</script>

<style scoped>
	
	.content{
		background: #F7F7F7;
	}
	
	.user_content{
		display: flex;
		align-items: center;
	}
	
	.user_img{
		width: 80rpx;
		height: 80rpx;
		background: #000;
		border-radius: 50%;
		margin:0 30rpx;
		overflow: hidden;
	}
	
	.all_achievement{
		background: #270546;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		height: 360rpx;
		/* padding-bottom: 30rpx; */
	}
	
	.bang{
		    width: 300rpx;
		    height: 300rpx;
		    background-color: transparent;
		    border:4rpx solid rgb(248, 129, 1);
		    text-align: center;
			border-radius: 50%;
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: #fff;
			/* bottom: -100rpx; */
	}
	
	.achievement{
		width: 100%;
		display: flex;
		justify-content: space-around;
		font-size: 28rpx;
		text-align: center;
		color: #fff;
		margin: 30rpx 0;
		position: absolute;
		bottom: 0;
		background: #270546;
		padding: 10rpx;
	}
	
	.store_content{
		position: relative;
		
	}
	
	.barck{
		position: absolute;
		top: 0;
		width: 100%;
		height: 60rpx;
		border-radius: 0 0 20rpx 20rpx;
		background: #270546;
		/* z-index: -1; */
	}
	
	.store_box{
		background: #fff;
		margin: 0 40rpx;
		padding: 30rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 20rpx #888888;
		margin-bottom: 40rpx;
		position: relative;
	}
	
	.img_name{
		display: flex;
	}
	
	.img{
		width: 80rpx;
		height: 80rpx;
		/* background: #000; */
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	
	.store_name{
		font-size: 30rpx;
		font-weight: 800;
	}
	
	.follow{
		font-size: 26rpx;
		color: #999;
	}
	
	.Specifications{
		display: flex;
		justify-content: space-around;
	}
	
	.Specifications_item{
		margin-top: 20rpx;
		display: flex;
	}
	
	
	.Specifications_item_img{
		width: 70rpx;
		height: 70rpx;
		/* background: #000; */
		margin-right: 10rpx;
	}
	
	.Specifications_item_img image{
		width: 70rpx;
		height: 70rpx;
	}
	
	.Specifications_title{
		font-size: 30rpx;
		font-weight: 800;
	}
	
	.people_num{
		font-size: 26rpx;
		color: #999;
	}
	
	.static_num{
		display: flex;
		margin: 30rpx;
	}
	
	.static_name{
		flex: 1;
		/* background: #aa0000; */
		box-shadow: 0rpx 0rpx 2rpx #888888;
		text-align: center;
		padding: 20rpx;
		font-size: 30rpx;
		border-radius: 20rpx 20rpx 0 20rpx;
	}
	
	.good_box{
		
	}
	
	.good_item{
		padding: 20rpx;
		margin: 30rpx;
		background-color: #fff;
		box-shadow: 1rpx 1rpx 1rpx #888888;
	}
	
	
	.good_item_top{
		display: flex;
		justify-content: space-between;
	}
	
	.user{
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0;
	}
	
	.user_logo{
		width: 50rpx;
		height: 50rpx;
		background: #000000;
		margin-right: 10rpx;
	}
	
	.user_N{
		flex: 1;
	}
	
	.order_miao{
		display: flex;
		justify-content: space-between;
	}
	
	.order_img_name{
		display: flex;
		align-items: center;
	}
	
	.order_img{
		display: flex;
	}
	
	.order_item_img{
		width: 112rpx;
		height: 112rpx;
		background: #000;
	}
	
	.order_item_name{
		color: #999;
		margin-left: 20rpx;
	}
	
	.order_item_price{
		color: #000;
		font-size: 50rpx;
	}
	
	.order_item_num{
		font-size: 26rpx;
		text-align: center;
	}
	
	.agree{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		
	}
	
	
	.agree view{
		margin: 0 10rpx;
		flex: 1;
		padding: 10rpx 0;
		text-align: center;
		border: 1rpx solid #ccc;
		/* padding: 10rpx; */
	}
	
	.Mask{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	
	.personal{
		border-radius:0 60rpx 0 0;
		width: 80%;
		height: 100%;
		background-color: #fff;
		border-radius: 0 50rpx 0 0;
		overflow: hidden;
	}
	
	.personal_content{
		height: 220rpx;
		background: #10C5A5;
		display: flex;
		align-items: center;
		padding-left: 40rpx;
	}
	
	.personal_user_img{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: #000000;
		margin-right: 20rpx;
		overflow: hidden;
	}
	
	
	.select_content{
		margin: 30rpx;
	}
	
	.function{
		display: flex;
		justify-content: space-between;
	}
	
	.switch{
		/* display:none; */
		position: absolute;
		bottom: 0;
		height: 70%;
		width: 100%;
		background: #fff;
		border-radius: 30rpx 30rpx 0 0;
	}
	
	.switch_title{
		font-size: 40rpx;
		color: #888;
		margin: 30rpx 0;
		text-align: center;
	}
	
	.cole{
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		color: #ccc;
	}
	
	
	.se{
		font-size: 36rpx;
		
		padding: 30rpx;
		border-bottom: 1rpx solid #ccc;
	}
	
	
	.Distribution_box{
		width: 80%;
		background: #fff;
		padding: 40rpx;
		border-radius: 10rpx;
	}
		
	.Distribution_select{
		margin-bottom: 30rpx;
		font-size: 36rpx;
		font-weight: 800;
	}
	
	.Distribution_inp{
		border: 1rpx solid #ccc;
		padding: 20rpx;
		border-radius: 10rpx;
		margin: 10rpx 0;
	}
	
	.switchs{
		position: absolute;
		right: 0;
		top: 20rpx;
		padding: 6rpx 20rpx;
		background: rgba(255,255,255,0.3);
		font-size: 24rpx;
		border-radius: 20rpx 0 0 20rpx;
		/* z-index: 101; */
		color: #fff;
	}
	
</style>
