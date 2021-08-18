<template>
	<view>
		<view class="selectList">
			<view :class="select == 0?'selectA':''" @click="select = 0">
				餐型
			</view>
			<view :class="select == 1?'selectA':''" @click="select = 1">
				订座
			</view>
		</view>
		
		<view  style="margin-bottom:150rpx;" v-if="select == 0">
			<view class="" style="display: flex;flex-wrap: wrap;">
				<view class="choice">
					<view class="icon" :style="{'background': administration?'#028EFF':'#C7C7C7'}" @click="administration = !administration">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						行政套餐
					</view>                             
				</view>
				<view class="choice">
					<view class="icon" :style="{'background': optional?'#028EFF':'#C7C7C7'}" @click="optional = !optional">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						自选套餐
					</view>  
					
				</view>
				<view class="choice">
					<view class="icon" :style="{'background': meeting?'#028EFF':'#C7C7C7'}" @click="meeting = !meeting">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						会务套餐
					</view>  
					
				</view>
				<view class="choice">
					<view class="icon" :style="{'background': snacks?'#028EFF':'#C7C7C7'}"  @click="snacks = !snacks">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						零食
					</view>  
					
				</view>
				<view class="choice">
					<view class="icon" :style="{'background': vip?'#028EFF':'#C7C7C7'}" @click="vip = !vip">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="">
						贵宾
					</view>
					
				</view>
			</view>
			
			<view class="current">
				当前选择
			</view>
			
			<view class="package">
				<view :class="type?'typeSelect':''" @click="type=true">
					行政套餐
				</view>
				<view :class="!type?'typeSelect':''"  @click="type=false">
					自选套餐
				</view>
				
				
			</view>
			
			<view class="meal">
				<view class="time">
					早餐
				</view>
				<view class="day" style="margin: 10rpx 0;">
					<view class="icon" :style="{'background': zcTime.status?'#1897FF':'#C7C7C7'}" @click="zcTime.status = true">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="" style="display: flex;color: #999;">
						<text style="color: #000;">当天预约</text>
						<view class="pickerTime"  >
							<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindzcTimeChange">
								<view class="uni-input">{{zcTime.today.time}}</view>
							</picker>
							<!-- 7:00 -->
						</view>
						<text>前预定</text>
					</view>
					
				</view>
				<view class=""  style="display: flex;">
					<view class="day">
						<view class="icon" :style="{'background': !zcTime.status?'#1897FF':'#C7C7C7'}" @click="zcTime.status = false">
							<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
						</view>
						<view style="color: #000;">
							隔天预定
						</view>
						
					</view>
					<view class="" style="margin: 0 20rpx;">
						<view class="" style="display: flex;color: #999;">
							<view class="">
								往后
							</view>
							<view class="pickerTime">
								<input type="number" v-model="zcTime.beApart.sDay" style="width: 40rpx;"/>
							</view>
							<view class="">
								至
							</view>
							
							<view class="pickerTime">
								<input type="number" v-model="zcTime.beApart.eDay" style="width: 40rpx;"/>
								<!-- 7:00 -->
							</view>
							
							<view class="">
								天预约
							</view>
						</view>
						<view class="" style="display: flex;color: #999;margin: 10rpx 0;">
							<text>今天</text>
							<view class="pickerTime">
								<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindzcTimesChange">
									<view class="uni-input">{{zcTime.beApart.time}}</view>
								</picker>
								<!-- 7:00 -->
							</view>
							<text>前预定</text>
							
						</view>
					</view>
				</view>
			</view>
			
			<view class="meal">
				<view class="time">
					早茶
				</view>
				<view class="day" style="margin: 10rpx 0;">
					<view class="icon" :style="{'background': zchTime.status?'#1897FF':'#C7C7C7'}" @click="zchTime.status = true">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="" style="display: flex;color: #999;">
						<text style="color: #000;">当天预约</text>
						<view class="pickerTime"  >
							<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindzchTimeChange">
								<view class="uni-input">{{zchTime.today.time}}</view>
							</picker>
							<!-- 7:00 -->
						</view>
						<text>前预定</text>
					</view>
					
				</view>
				<view class=""  style="display: flex;">
					<view class="day">
						<view class="icon" :style="{'background': !zchTime.status?'#1897FF':'#C7C7C7'}"  @click="zchTime.status = false">
							<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
						</view>
						<view style="color: #000;">
							隔天预定
						</view>
						
					</view>
					<view class="" style="margin: 0 20rpx;">
						<view class="" style="display: flex;color: #999;">
							<view class="">
								往后
							</view>
							<view class="pickerTime">
								<input type="number" v-model="zchTime.beApart.sDay" style="width: 40rpx;"/>
								
							</view>
							<view class="">
								至
							</view>
							
							<view class="pickerTime">
								<input type="number" v-model="zchTime.beApart.eDay" style="width: 40rpx;"/>
								<!-- 7:00 -->
							</view>
							
							<view class="">
								天预约
							</view>
						</view>
						<view class="" style="display: flex;color: #999;margin: 10rpx 0;">
							<text>今天</text>
							<view class="pickerTime">
								<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindzchTimesChange">
									<view class="uni-input">{{zchTime.beApart.time}}</view>
								</picker>
								<!-- 7:00 -->
							</view>
							<text>前预定</text>
							
						</view>
					</view>
				</view>
			</view>
			
			<view class="meal">
				<view class="time">
					午餐
				</view>
				<view class="day" style="margin: 10rpx 0;">
					<view class="icon" :style="{'background': wcTime.status?'#1897FF':'#C7C7C7'}"  @click="wcTime.status = true">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="" style="display: flex;color: #999;">
						<text style="color: #000;">当天预约</text>
						<view class="pickerTime"  >
							<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindwcTimeChange">
								<view class="uni-input">{{wcTime.today.time}}</view>
							</picker>
							<!-- 7:00 -->
						</view>
						<text>前预定</text>
					</view>
					
				</view>
				<view class=""  style="display: flex;">
					<view class="day">
						<view class="icon" :style="{'background': !wcTime.status?'#1897FF':'#C7C7C7'}" @click="wcTime.status = false">
							<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
						</view>
						<view style="color: #000;">
							隔天预定
						</view>
						
					</view>
					<view class="" style="margin: 0 20rpx;">
						<view class="" style="display: flex;color: #999;">
							<view class="">
								往后
							</view>
							<view class="pickerTime">
								<input type="number" v-model="wcTime.beApart.sDay" style="width: 40rpx;"/>
								<!-- <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
									<view class="uni-input">{{time}}</view>
								</picker> -->
								<!-- 7:00 -->
							</view>
							<view class="">
								至
							</view>
							
							<view class="pickerTime">
								<input type="number" v-model="wcTime.beApart.eDay" style="width: 40rpx;"/>
								<!-- 7:00 -->
							</view>
							
							<view class="">
								天预约
							</view>
						</view>
						<view class="" style="display: flex;color: #999;margin: 10rpx 0;">
							<text>今天</text>
							<view class="pickerTime">
								<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindwcTimesChange">
									<view class="uni-input">{{wcTime.beApart.time}}</view>
								</picker>
								<!-- 7:00 -->
							</view>
							<text>前预定</text>
							
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="meal">
				<view class="time">
					晚餐
				</view>
				<view class="day" style="margin: 10rpx 0;">
					<view class="icon" :style="{'background': wcnTime.status?'#1897FF':'#C7C7C7'}"  @click="wcnTime.status = true">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="" style="display: flex;color: #999;">
						<text style="color: #000;">当天预约</text>
						<view class="pickerTime"  >
							<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindwcnTimeChange">
								<view class="uni-input">{{wcnTime.today.time}}</view>
							</picker>
							<!-- 7:00 -->
						</view>
						<text>前预定</text>
					</view>
					
				</view>
				<view class=""  style="display: flex;">
					<view class="day">
						<view class="icon" :style="{'background': !wcnTime.status?'#1897FF':'#C7C7C7'}"  @click="wcnTime.status = false">
							<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
						</view>
						<view style="color: #000;">
							隔天预定
						</view>
						
					</view>
					<view class="" style="margin: 0 20rpx;">
						<view class="" style="display: flex;color: #999;">
							<view class="">
								往后
							</view>
							<view class="pickerTime">
								<input type="number" v-model="wcnTime.beApart.sDay" style="width: 40rpx;"/>
								<!-- <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
									<view class="uni-input">{{time}}</view>
								</picker> -->
								<!-- 7:00 -->
							</view>
							<view class="">
								至
							</view>
							
							<view class="pickerTime">
								<input type="number" v-model="wcnTime.beApart.eDay" style="width: 40rpx;"/>
								<!-- 7:00 -->
							</view>
							
							<view class="">
								天预约
							</view>
						</view>
						<view class="" style="display: flex;color: #999;margin: 10rpx 0;">
							<text>今天</text>
							<view class="pickerTime">
								<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindwcnTimesChange">
									<view class="uni-input">{{wcnTime.beApart.time}}</view>
								</picker>
								<!-- 7:00 -->
							</view>
							<text>前预定</text>
							
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="meal">
				<view class="time">
					夜宵
				</view>
				<view class="day" style="margin: 10rpx 0;">
					<view class="icon" :style="{'background': yxTime.status?'#1897FF':'#C7C7C7'}"  @click="yxTime.status = true">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="" style="display: flex;color: #999;">
						<text style="color: #000;">当天预约</text>
						<view class="pickerTime"  >
							<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindyxTimeChange">
								<view class="uni-input">{{yxTime.today.time}}</view>
							</picker>
							<!-- 7:00 -->
						</view>
						<text>前预定</text>
					</view>
					
				</view>
				<view class=""  style="display: flex;">
					<view class="day">
						<view class="icon" :style="{'background': !yxTime.status?'#1897FF':'#C7C7C7'}" @click="yxTime.status = false">
							<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
						</view>
						<view style="color: #000;">
							隔天预定
						</view>
						
					</view>
					<view class="" style="margin: 0 20rpx;">
						<view class="" style="display: flex;color: #999;">
							<view class="">
								往后
							</view>
							<view class="pickerTime">
								<input type="number" v-model="yxTime.beApart.sDay" style="width: 40rpx;"/>
								<!-- <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
									<view class="uni-input">{{time}}</view>
								</picker> -->
								<!-- 7:00 -->
							</view>
							<view class="">
								至
							</view>
							
							<view class="pickerTime">
								<input type="number" v-model="yxTime.beApart.eDay" style="width: 40rpx;"/>
								<!-- 7:00 -->
							</view>
							
							<view class="">
								天预约
							</view>
						</view>
						<view class="" style="display: flex;color: #999;margin: 10rpx 0;">
							<text>今天</text>
							<view class="pickerTime">
								<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindyxTimesChange">
									<view class="uni-input">{{yxTime.beApart.time}}</view>
								</picker>
								<!-- 7:00 -->
							</view>
							<text>前预定</text>
							
						</view>
					</view>
				</view>
			</view>
			
			
			
			
			
		</view>
		
		
		<view  style="margin-bottom:150rpx;" v-else>
			<view class="" style="position: relative;">
				<view class="a" v-for="(item,index) in SeatList" :key='index' 
				:style="{'top':item.top+'px','left':item.left+'px','color':item.color}"
				 v-if="item.seatType==itemType">
					{{item.seatName}}
				</view>
				<view class="" style="width: 100%;height: 600rpx;">
					<image :src="bImg" mode="" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
			<view class="" style="display: flex;justify-content: center;">
				<view :class="itemType==0?'typeSelect':''" style="margin: 20rpx;" @click="itemType=0">
					包厢
				</view>
				<view :class="itemType==1?'typeSelect':''" style="margin: 20rpx;"  @click="itemType=1">
					卡座
				</view>
				<view :class="itemType==2?'typeSelect':''" style="margin: 20rpx;"  @click="itemType=2">
					大厅
				</view>
			</view>
			
			<view class="meal">
				<view class="day" style="margin: 10rpx 0;">
					<view class="icon" :style="{'background': DTime.status?'#1897FF':'#C7C7C7'}" @click="DTime.status = true">
						<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
					</view>
					<view class="" style="display: flex;color: #999;">
						<text style="color: #000;">当天预约</text>
						<view class="pickerTime"  >
							<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindDTimeChange">
								<view class="uni-input">{{DTime.today.time}}</view>
							</picker>
							<!-- 7:00 -->
						</view>
						<text>前预定</text>
					</view>
					
				</view>
				<view class=""  style="display: flex;">
					<view class="day">
						<view class="icon" :style="{'background': !DTime.status?'#1897FF':'#C7C7C7'}" @click="DTime.status = false">
							<uni-icons type="checkmarkempty" color='#fff'></uni-icons>
						</view>
						<view style="color: #000;">
							隔天预定
						</view>
						
					</view>
					<view class="" style="margin: 0 20rpx;">
						<view class="" style="display: flex;color: #999;">
							<view class="">
								往后
							</view>
							<view class="pickerTime">
								<input type="number" v-model="DTime.beApart.sDay" style="width: 40rpx;"/>
							</view>
							<view class="">
								至
							</view>
							
							<view class="pickerTime">
								<input type="number" v-model="DTime.beApart.eDay" style="width: 40rpx;"/>
								<!-- 7:00 -->
							</view>
							
							<view class="">
								天预约
							</view>
						</view>
						<view class="" style="display: flex;color: #999;margin: 10rpx 0;">
							<text>今天</text>
							<view class="pickerTime">
								<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindDTimesChange">
									<view class="uni-input">{{DTime.beApart.time}}</view>
								</picker>
								<!-- 7:00 -->
							</view>
							<text>前预定</text>
							
						</view>
					</view>
				</view>
				
				<view class=""  style="display: flex;color: #999;align-items: center;">
					<view class="">
						起定
					</view>
					<view class="pickerTime">
						<input type="number" v-model="DTime.people" style="width: 40rpx;"/>
					</view>
					<view class="">
						人
					</view>
					
				</view>
			</view>
			<!-- <view class="">
				当天预约 7:00 前预定
			</view>
			<view class="">
				<view class="">
					隔天预定
				</view>
				<view class="">
					<view class="">
						往后1至30天预约
					</view>
					<view class="">
						今天23:00前预约
					</view>
				</view>
			</view> -->
			
		</view>
		
		<view class="preservation" @click="opData">
			保存
		</view>
		
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				administration:false,
				optional:false,
				meeting:false,
				snacks:false,
				vip:false,
				
				
				select:0,
				type: true,
				DTime:{
					status:true,
					today:{
						
						time:'12:00'
					},
					beApart:{
						sDay:1,
						eDay:30,
						time:'12:00'
					},
					people:6
				},
				zcTime:{
					name:'早餐',
					status:true,
					today:{
						
						time:'12:00'
					},
					beApart:{
						sDay:1,
						eDay:30,
						time:'12:00'
					}
				},
				zchTime:{
					name:'早茶',
					status:true,
					today:{
						time:'12:00'
					},
					beApart:{
						sDay:1,
						eDay:30,
						time:'12:00'
					}
				},
				wcTime:{
					name:'午餐',
					status:true,
					today:{
						time:'12:00'
					},
					beApart:{
						sDay:1,
						eDay:30,
						time:'12:00'
					}
				},
				wcnTime:{
					name:'晚餐',
					status:true,
					today:{
						time:'12:00'
					},
					beApart:{
						sDay:1,
						eDay:30,
						time:'12:00'
					}
				},
				yxTime:{
					name:'夜宵',
					status:true,	
					today:{
						time:'12:00'
					},
					beApart:{
						sDay:1,
						eDay:30,
						time:'12:00'
					}
				},
				itemType:0,
				shop:'',
				img:'',
				SeatList:[],
				bImg:''
			}
		},
		onLoad() {
			this.shop = uni.getStorageSync('shopData');
			this.getSeat()
		},
		components:{
			uniIcons
		},
		methods: {
			getSeat(){
				Api.getSeatList({storeId:this.shop.id}).then(res => {
					if(res.data.data.length != 0){
						this.bImg = res.data.data[0].seatImg
						this.SeatList = res.data.data
						// this.shop[6].Already = true
					}
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
			},
			
			bindzcTimeChange: function(e) {
				
				this.zcTime.today.time = e.target.value
			},
			bindzchTimeChange: function(e) {
				
				this.zchTime.today.time = e.target.value
			},
			
			bindwcTimeChange: function(e) {
				
				this.wcTime.today.time = e.target.value
			},
			
			bindwcnTimeChange: function(e) {
				
				this.wcnTime.today.time = e.target.value
			},
			
			bindyxTimeChange: function(e) {
				
				this.yxTime.today.time = e.target.value
			},
			
			bindDTimeChange: function(e) {
				
				this.DTimes.today.time = e.target.value
			},
			
			
			bindzcTimesChange: function(e) {
				
				this.zcTime.beApart.time = e.target.value
			},
			bindzchTimesChange: function(e) {
				
				this.zchTime.beApart.time = e.target.value
			},
			
			bindwcTimesChange: function(e) {
				
				this.wcTime.beApart.time = e.target.value
			},
			
			bindwcnTimesChange: function(e) {
				
				this.wcnTime.beApart.time = e.target.value
			},
			
			bindyxTimesChange: function(e) {
				
				this.yxTime.beApart.time = e.target.value
			},
			
			bindDTimesChange: function(e) {
				
				this.DTimes.beApart.time = e.target.value
			},
			
			
			
			opData(){
				// String bookSetUp;          //预定设置
				// String seat;            //座位
				// Integer eatType;         //套餐类型
				// Integer zcTimeType;       //早餐类型
				// Integer zcBookHour;       //早餐预定时间
				// Integer zcBookDay1;       //早餐预定天数1
				// Integer zcBookDay2;       //早餐预定天数2
				// Integer zcNowTimeBook;     //早餐今天预定时间
				// Integer zchTimeType;      //早茶类型
				// Integer zchBookHour;      //早茶预定时间
				// Integer zchBookDay1;       //早茶预定天数1
				// Integer zchBookDay2;        //早茶预定天数2
				// String zchNowTimeBook;       //早茶今天预定时间
				// Integer wcTimeType;       //午餐预定类型
				// Integer wcBookHour;       //午餐预定时间
				// Integer wcBookDay1;       //午餐预定天数1
				// Integer wcBookDay2;      //午餐预定天数2
				// String wcNowTimeBook;    //午餐今天预定时间
				// String wcnTimeType;      //晚餐预定类型
				// Integer  wcnBookHour;      //晚餐预定时间
				// Integer wcnBookDay1;         //晚餐预定填数1
				// Integer wcnBookDay2;        //晚餐预定填数2
				// Integer wcnNowTimeBook;    //晚餐今天预定时间
				// Integer yxTimeType;      //宵夜预定类型
				// Integer yxBookHour;     //宵夜预定时间
				// Integer yxBookDay1;     //宵夜预定天数1
				// Integer yxBookDay2;     //宵夜预定天数2
				// Integer yxNowTimeBook;   //宵夜今天预定时间
				console.log(1)
				this.shop.bookSetUp = this.select
				this.shop.seat = this.itemType
				this.shop.zcTimeType = this.zcTime.status?'1':'0'
				this.shop.zcBookHour = this.zcTime.beApart.time
				this.shop.zcBookDay1 = this.zcTime.beApart.sDay+''
				this.shop.zcBookDay2 = this.zcTime.beApart.eDay+''
				this.shop.zcNowTimeBook =  this.zcTime.today.time
				
				console.log(2)
				this.shop.zchTimeType = this.zchTime.status?'1':'0'
				this.shop.zchBookHour = this.zchTime.beApart.time
				this.shop.zchBookDay1 = this.zchTime.beApart.sDay+''
				this.shop.zchBookDay2 = this.zchTime.beApart.eDay+''
				this.shop.zchNowTimeBook =  this.zchTime.today.time
				
				
				console.log(3)
				this.shop.wcTimeType = this.wcTime.status?'1':'0'
				this.shop.wcBookHour = this.wcTime.beApart.time
				this.shop.wcBookDay1 = this.wcTime.beApart.sDay+''
				this.shop.wcBookDay2 = this.wcTime.beApart.eDay+''
				this.shop.wcNowTimeBook =  this.wcTime.today.time
				
				console.log(4)
				this.shop.wcnTimeType = this.wcnTime.status?'1':'0'
				this.shop.wcnBookHour = this.wcnTime.beApart.time
				this.shop.wcnBookDay1 = this.wcnTime.beApart.sDay+''
				this.shop.wcnBookDay2 = this.wcnTime.beApart.eDay+''
				this.shop.wcnNowTimeBook =  this.wcnTime.today.time
				
				console.log(5)
				this.shop.yxTimeType = this.yxTime.status?'1':'0'
				this.shop.yxBookHour = this.yxTime.beApart.time
				this.shop.yxBookDay1 = this.yxTime.beApart.sDay+''
				this.shop.yxBookDay2 = this.yxTime.beApart.eDay+''
				this.shop.yxNowTimeBook =  this.yxTime.today.time
				
				
				var data = this.shop
				
					
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
	view{
		font-size: 28rpx;
	}
	
	.pickerTime{
		margin: 0 20rpx;
		border: 1rpx solid #f0f0f0;
		border-radius: 10rpx;
		color: #999;
		padding: 3rpx 10rpx;
		height: 50rpx;
	}
	.selectList{
		display: flex;
		justify-content: center;
		margin: 30rpx;
	}
	
	.selectList view{
		padding:20rpx 30rpx ;
		box-shadow: 0 0 10rpx #eeeeee; 
		border-radius: 10rpx 10rpx 0 10rpx;
		/* background: ; */
	}
	
	.selectA{
		background: #270546;
		color: #fff;
	}
	
	.choice{
		display: flex;
		/* flex-wrap: wrap; */
		margin: 10rpx 30rpx;
		align-items: center;
	}
	
	.icon{
		width: 30rpx;
		height: 30rpx;
		background: #C7C7C7;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 10rpx;
	}
	
	.current{
		text-align: center;
		font-size: 36rpx;
		font-weight: 600;
		margin: 30rpx 0 0 10rpx;
	}
	
	
	.package{
		display: flex;
	}
	
	
	.package view{
		font-size: 32rpx;
		color: #999;
		margin: 20rpx;
	}
	
	.meal{
		margin: 10rpx 30rpx;
	}
	
	.time{
		font-size: 32rpx;
		color: #999;
		margin: 20rpx 0;
	}
	
	.day{
		display: flex;
		/* align-items: center; */
		
	}
	
	.typeSelect{
		border-bottom: 3rpx solid #270546;
		color: #270546 !important;
	}
	
	
	.a{
		position: absolute;
		padding: 20rpx;
		background-color: rgba(0,0,0,.3);
		font-size: 24rpx;
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
