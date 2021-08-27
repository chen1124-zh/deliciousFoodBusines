<template>
	<view>
		<swiper class="swiper" :indicator-dots="true"
				:autoplay="true"
				:circular = 'true'
				:interval="2000"
				:duration="500"
				indicator-color='#fff'
				indicator-active-color='#0D92FF'>
			<swiper-item>
				<!-- <view style="width: auto;height: 240rpx;"> -->
					<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgs.bzw315.com%2Fuploadfiles%2Fnew%2Fimage%2F20130201%2F20130201162439_7131.jpg&refer=http%3A%2F%2Fimgs.bzw315.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632559483&t=18abff196664c68d3cba4a7f7ee835be" style="width: 100%;height: 100%;" mode=""></image>
				<!-- </view> -->
			</swiper-item>
			<swiper-item>
				<!-- <view style="width: auto;height: 240rpx;"> -->
					<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F006HHNUjly4gtt34n1dyaj30u00k0did.jpg&refer=http%3A%2F%2Fwx2.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632559484&t=5ab482bf2e8298c685b8303b33d6ca69" style="width: 100%;height: 100%;" mode=""></image>
				<!-- </view> -->
			</swiper-item>
		</swiper>
		<view class="tal">
			基本信息
		</view>
		
		<view class="">
			<view class="item_H">
				<view class="name">
					<text style="color: red;">*</text>商户类型
				</view>
				<view class="" style="flex: 1;"> 
					 <picker style="width: 100%;" mode="selector" :range="goodType" range-key="name" @change="change">
						<view style="width: 100%;display: flex;justify-content: space-between;"><text>{{goodType[goodTypeIndex].name}}</text>  <uni-icons type="arrowright" size="20"></uni-icons> </view>
					 </picker>
					<!-- <input type="text" value="" /> -->
				</view>
			</view>
			
			<view class="item_H">
				<view class="name">
					<text style="color: red;">*</text>商户全称
				</view>
				<view class="">
					<input type="text" v-model="allName" placeholder="建议2-8个中文"/>
				</view>
			</view>
			
			<view class="item_H">
				<view class="name">
					<text style="color: red;">*</text>商户简称
				</view>
				<view class="">
					<input type="text" v-model="name"  placeholder="建议2-4个中文"/>
				</view>
			</view>
			<view class="item_H">
				<view class="name">
					<text style="color: red;">*</text>商户类别
				</view>
				<picker style="flex: 1;" mode="selector" :range="F" range-key="name" @change="Fchange">
						<view style="display: flex;justify-content: space-between;"><text>{{F[FIndex].name}}</text>  <uni-icons type="arrowright" size="20"></uni-icons> </view>
				</picker>
			</view>
			
		</view>
		
		
		
		<view class="tal">
			商户地址
		</view>
		<view class="">
			<view class="item_H">
				<view class="name">
					<text style="color: red;">*</text>所在地区
				</view>
				<view class="inp" @click="getMap">
					<view class="" v-if="region.province&&region.city&&region.district">
						{{region.province}}{{region.city}}{{region.district}}
					</view>
					<view class="h" v-else>
						省市区县、镇/街道、村/社区等
					</view>
				</view>
			</view>
			
			<view class="item_H">
				<view class="name">
					<text style="color: red;">*</text>小区/村组
				</view>
				<view class="fle">
					<input type="text" v-model="cui" placeholder="所在小区、村民小組、园区、大厦名称"/>
				</view>
			</view>
			
			<view class="item_H">
				<view class="name">
					<text style="color: red;">*</text>详细地址
				</view>
				<view class="">
					<input type="text" v-model="hao"  placeholder="楼牌号、路牌号"/>
				</view>
			</view>
			<view class="item_H">
				<view class="name">
					<text style="color: red;">*</text>经纬度
				</view>
				<view class="inp" @click="jump">
					<view class="" v-if="lat && Lon">
						{{lat}} , {{Lon}}
					</view>
					<view class="h" v-else>
						请获取商户经营地的经纬度
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="">
			<view class="xy" v-if="goodTypeIndex == 2">
				<uni-icons @click='xy.qi = true' type="circle" size="20" v-if="!xy.qi"></uni-icons>
				<uni-icons @click='xy.qi = false' type="checkbox-filled" v-else color='#66CD00' size="20"></uni-icons>
				同时开通企业号《企业号介绍》
			</view>
			<view class="xy">
				<uni-icons @click='xy.guo = true' type="circle" size="20" v-if="!xy.guo"></uni-icons>
				<uni-icons @click='xy.guo = false' type="checkbox-filled" v-else color='#66CD00'  size="20"></uni-icons>
				同意《国社商户服务条例》
			</view>
		</view>
		
		
		<view class="op">
			<view @click="preservation"
			 style="border-right: 1rpx solid #f0f0f0;">
				保存
			</view>
			<view class="" @click="userZgood">
				提交
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				allName:"",
				name:'',
				region:'',
				area:'',
				detailed:'',
				Lon:'',
				lat:'',
				F:[
					{name:'就餐场所和餐馆（包括快餐）'}
				],
				FIndex:0,
				xy:{
					guo:false,
					qi:false
				},
				cui:'',
				hao:'',
				goodType:[
					{
						name:'个人（小微）商户'
					},
					{
						name:'个体工商户'
					},
					{
						name:'企业商户'
					}
				],
				region:{
					province: "",
					city: "",
					district: "",
				},
				goodTypeIndex:0,
				user:''
			}
		},
		onShow() {
			this.user = uni.getStorageSync('user')
			
			var latLng = uni.getStorageSync('latlon');
			if(latLng == ''){
				
			}else{
				this.lat = latLng.lat
				this.Lon = latLng.lon
			}
			// var map = uni.getStorageSync('addMap');
			// if(map == ''){
				
			// }else{
			// 	this.region = map
			// 	this.lat = this.region.location.lat
			// 	this.Lon = this.region.location.lng
			// }
		},
		components:{
			uniIcons
		},
		methods: {
			jump(){
				uni.removeStorageSync('latlon')
				uni.removeStorageSync('tempLanLon')
				uni.navigateTo({
					url:'../LonLat/LonLat'
				})
			},
			preservation(){
				var tD = {
					goodTypeIndex:this.goodTypeIndex,
					allName:this.allName,
					name:this.name,
					cui:this.cui,
					hao:this.hao
				}
				
				console.log(tD)
			},
			Fchange(e){
				this.FIndex = e.detail.value
			},
			change(e){
				// console.log(e)
				this.goodTypeIndex = e.detail.value
			},
			getMap(){
				uni.navigateTo({
					url:'../hometown/hometown'
				})
			},
			userZgood(){
				
				// if(this.goodTypeIndex == 2 && this.xy.guo == true && this.xy.qi == true || this.allName != ''
				// 	|| this.name == '' || this.region == '' || this.cui == '' || this.hao == ''){
				// 	uni.showToast({
				// 		title:'请补充完整',
				// 		icon:'none'
				// 	})
				// 	return
				// }
				
				// if(this.goodTypeIndex != 2  && this.xy.qi == true || this.allName != ''
				// 	|| this.name == '' || this.region == '' || this.cui == '' || this.hao == ''){
				// 	uni.showToast({
				// 		title:'请补充完整',
				// 		icon:'none'
				// 	})
				// 	return
				// }
				
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
			}
		}
	}
</script> 

<style>
	input{
		width: 100%;
	}
	
	.fle{
		flex: 1;
	}
	view{
		font-size: 26rpx;
	}
	.tal{
		font-size: 30rpx;
		margin: 20rpx;
		font-weight: 600;
	}
	
	.item_H{
		display: flex;
		border-bottom: 1rpx solid #f0f0f0;
		padding: 20rpx;
	}
	
	.item_H .name{
		margin-right: 30rpx;
	}
	
	
	.h{
		color: #999;
	}
	
	.xy{
		margin: 10rpx;
	}
	
	.op{
		position: fixed;
		bottom: 0;
		width: 100%;
		/* padding: 20rpx 0; */
		
		text-align: center;
		color: #fff;
		display: flex;
		
	}
	
	.op view{
		flex: 1;
		padding: 20rpx 0;
		background: #10C5A5;
	}
	
</style>
