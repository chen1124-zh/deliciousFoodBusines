<template>
	<view>
		<view class="title">
			基本信息
		</view>
		<view class="information">
			<view class="item">
				<view class="name">
					<text>*</text>店铺名称
				</view>
				<view class="inp">
					<input type="text" v-model="shopData.name" placeholder="建议2-8个字"/>
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text>*</text>店铺简称
				</view>
				<view class="inp">
					<input type="text" v-model="shopData.simple" placeholder="建议2-4个字"/>
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text>*</text>店铺类别
				</view>
				<view class="inp">
					{{shopData.category}}
					<!-- <input type="text" value="" /> -->
				</view>
			</view>
		</view>
		<view class="title">
			店铺地址
		</view>
		<view class="information">
			<view class="item">
				<view class="name">
					<text>*</text>所在地区
				</view>
				<view class="inp" @click="getMap">
					<view class="" v-if="region.province&&region.city&&region.district">
						{{region.province}}{{region.city}}{{region.district}}
					</view>
					<view class="h" v-else>
						省市区县、镇/街道、村/社区等
					</view>
					
					<!-- <input type="text" value="" /> -->
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text>*</text>小区/村庄
				</view>
				<view class="inp">
					
					<input type="text" v-model="shopData.area" placeholder="所在小区、村民小組、园区、大厦名称"/>
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text>*</text>详情地址
				</view>
				<view class="inp">
					
					<input type="text" v-model="shopData.details" placeholder="楼牌号、路牌号"/>
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text>*</text>经纬度
				</view>
				<view class="inp">
					<!-- <input type="text" value="" /> -->
					
					<view class="" v-if="region.location.lat && region.location.lng">
						{{region.location.lat}} , {{region.location.lng}}
					</view>
					<view class="h" v-else>
						请获取商家经营地的经纬度
					</view>
					
				</view>
			</view>
		</view>
		
		<view class="op" @click="op">
			提交
		</view>
	</view>
</template>

<script scoped>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				user:'',
				shopData:{
					name:'',
					simple:'',
					category:'就餐餐所和餐馆（包括快餐）',
					where:'',
					area:'',
					details:'',
					loa:'',
					lng:''
					
				},
				region:{
					title: "",
					address: "",
					category: "",
					location: {
						lat: '',
						lng: '',
					},
					province: "",
					city: "",
					district: "",
				}
			}
		},
		onShow() {
			this.user = uni.getStorageSync('user')
			var map = uni.getStorageSync('addMap');
			if(map == ''){
				
			}else{
				
				
				this.region = map
				
				
				this.shopData.where = this.region.province+this.region.city+this.region.district
				this.shopData.loa = this.region.location.lat
				this.shopData.lng = this.region.location.lng
					
				
				
				
			}
			this.region = map
			console.log(map)
		},
		methods: {
			getMap(){
				uni.navigateTo({
					url:'../regionMap/regionMap'
				})
			},
			op(){
				console.log(this.shopData)
				
				
				var data = {
					storeName:this.shopData.name,    //店铺名称
					storeLogo:'',     //店铺图标
					storePhoto:'',   //店铺照片
					storeMobile:0,
					status:0,
					storeIntroductImg:'',    //店铺介绍(图片)
					storeIntroduct:'',     //店铺介绍
					foodLabel:'',          //菜品标签
					servuceConfiguration:'',   //服务配置
					foodSort:'',              //菜系分类
					appraiseManager:'',      //评价管理
					foodItem:'',             //菜品特色
					businessDate:'',         //营业日期
					businessTime:'',         //营业时段
					deliveryTime:0,        //配送时间
					startingPrice:0,       //起送价格
					deliveryRange:'',     //配送距离
					deliveryCost:0,    //配送费
					longDeliveryRange:'',  //最远配送距离
					deliveryWay:'',        //配送方式
					bookSetUp:'',          //预定设置
					seat:'',            //座位
					eatType:0,         //套餐类型
					zcTimeType:0,       //早餐类型
					zcBookHour:0,       //早餐预定时间
					zcBookDay1:0,       //早餐预定天数1
					zcBookDay2:0,       //早餐预定天数2
					zcNowTimeBook:0,     //早餐今天预定时间
					zchTimeType:0,      //早茶类型
					zchBookHour:0,      //早茶预定时间
					zchBookDay1:0,       //早茶预定天数1
					zchBookDay2:0,        //早茶预定天数2
					zchNowTimeBook:'',       //早茶今天预定时间
					wcTimeType:0,       //午餐预定类型
					wcBookHour:0,       //午餐预定时间
					wcBookDay1:0,       //午餐预定天数1
					wcBookDay2:0,      //午餐预定天数2
					wcNowTimeBook:'',    //午餐今天预定时间
					wcnTimeType:'',      //晚餐预定类型
					wcnBookHour:0,      //晚餐预定时间
					wcnBookDay1:0,         //晚餐预定填数1
					wcnBookDay2:0,        //晚餐预定填数2
					wcnNowTimeBook:0,    //晚餐今天预定时间
					yxTimeType:0,      //宵夜预定类型
					yxBookHour:0,     //宵夜预定时间
					yxBookDay1:0,     //宵夜预定天数1
					yxBookDay2:0,     //宵夜预定天数2
					yxNowTimeBook:0,   //宵夜今天预定时间
					timeType:0,       //餐时设置
					bookHour:0,       //订座时间
					bookDay1:0,       //订座天数1
					bookDay2:0,       //订座天数2
					nowTimeBook:'',    //订座今天预定时间
					people:0,         //人数
					eatSetUp:0,
					seatSetUp:'',
					businessLicense:'',   //营业执照
					license:'',           //经营许可证
					licenseNo:'',         //许可证号码
					deliveryClerk:'',     //配送员
					deliveryClerkNum:'',  //配送员电话
					userId:this.user.openId,         //用户id
					bookType:'',        //订座类型
					longitude:this.region.location.lng,         //经度
					latitude:this.region.location.lat,          //维度	
					address:this.shopData.details,	//详细地址
					shortName:this.shopData.simple,      //简称
					village:this.shopData.area,       //小区
					area:this.shopData.where,           //地区
					category:this.shopData.category,       //类别
					addIncome:0,
					addOrderNum:0,
					shopNum:0,
					ssProduct:'',
					businessName:''
				}
				
				
				Api.addStore(data).then(res => {
					// console.log('res',res);
					uni.showToast({
						title:'新增成功',
						icon:'none'
					})
					
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
	view{
		font-size: 28rpx;
	}
	
	.information{
		
	}
	
	.item{
		display: flex;
		padding: 30rpx;
		border-bottom: 1rpx solid #F0F0F0;
	}
	
	.item .name{
		width: 170rpx;
		margin-right: 20rpx;
	}
	
	.item text{
		color: red;
	}
	
	.inp{
		flex: 1;
	}
		
	.title{
		font-weight: 600;
		margin: 30rpx;
	}
	
	.op{
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 20rpx 0;
		background: #10C5A5;
		text-align: center;
		color: #fff;
	}
	
	.h{
		color: #808080;
	}
</style>
