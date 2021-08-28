<template>
	<view style="background: #F7F7F7;height: 100vh;">
		<view class="" style="display: flex;background: #F2F2F2;">
			<view :class="setAndSuspend?'showSetTime':'setTime'" @click="setAndSuspend = true">
				设置时间
			</view>
			<view :class="!setAndSuspend?'showSetTime':'setTime'" @click="setAndSuspend = false">
				暂停营业
			</view>
		</view>
		
		<view class="" v-if="setAndSuspend">
			<view
			 style="background: #fff;border-radius: 20rpx;margin: 20rpx;padding: 30rpx;">
				
				<view class="select_box">
					<view class="title">
						日期<text style="color: #999;"> (可活动日期模块，分别设置营业时间)</text>
					</view>
					<view style="overflow-x: auto;margin: 30rpx 10rpx;">
						<view class="" style="width: 840rpx;display: flex;flex-wrap:nowrap;">
							<view class="select_item" :style="{'background':week.one?'#270546':'#fff','color': week.one?'#fff':'#000'}" @click="week.one=!week.one">
								周一	
							</view>
							<view class="select_item" :style="{'background':week.two?'#270546':'#fff','color': week.two?'#fff':'#000'}" @click="week.two=!week.two">
								周二
							</view>
							<view class="select_item" :style="{'background':week.three?'#270546':'#fff','color': week.three?'#fff':'#000'}" @click="week.three=!week.three">
								周三
							</view>
							<view class="select_item" :style="{'background':week.four?'#270546':'#fff','color': week.four?'#fff':'#000'}" @click="week.four=!week.four">
								周四
							</view>
							<view class="select_item" :style="{'background':week.five?'#270546':'#fff','color': week.five?'#fff':'#000'}" @click="week.five=!week.five">
								周五
							</view>
							<view class="select_item" :style="{'background':week.six?'#270546':'#fff','color': week.six?'#fff':'#000'}" @click="week.six=!week.six">
								周六
							</view>
							<view class="select_item" :style="{'background':week.day?'#270546':'#fff','color': week.day?'#fff':'#000'}" @click="week.day=!week.day">
								周日
							</view>
						</view>
						
					</view>
					
				</view>
				
				<view class="select_box">
					<view class="title">
						时段
					</view>
					<view class="">
						
						<view class="" style="display: flex;align-items: center;margin: 20rpx 0;">
							<view class="circle" @click="standard = true" :style="{'background':standard?'#270546':''}">
								
							</view>
							<view class="">
								标准设置
							</view>
							<view class="timeBox">
								<picker mode="time" :value="bz.stime" start="00:01" end="23:59" @change="bindSTimeChange">
									<view class="time">{{bz.stime}}</view>
								</picker>
								<view class="">
									至
								</view>
								<picker mode="time" :value="bz.etime" start="00:01" end="23:59" @change="bindDTimeChange">
									<view class="time">{{bz.etime}}</view>
								</picker>
							</view>
						</view>
						<view class="" style="display: flex;align-items: center;margin: 20rpx 0;">
							<view class="circle" @click="standard = false" :style="{'background':!standard?'#270546':''}">
								
							</view>
							<view class="">
								个性设置
							</view>
							<view style="color: #10C5A5;margin-left: 20rpx;" @click="showMask = true">
								+添加时段
							</view>
						</view>
						
						<view class=""
						 style="display: flex;align-items: center;margin: 20rpx 60rpx;"
						 v-for="(item,index) in timeList" :key='index'>
							<view class="circle" @click="itemSelect(index)" :style="{'background':item.select?'#270546':''}">
								
							</view>
							<view class="">
								{{item.name}}
							</view>
							<view class="timeBox">
								<picker mode="time" :value="item.sTime" start="00:01" end="23:59" @click="dian(index)" @change="bindSDTimeChange">
									<view class="time">{{item.sTime}}</view>
								</picker>
								<view class="">
									至
								</view>
								<picker mode="time" :value="item.dTime" start="00:01" end="23:59" @click="dian(index)" @change="bindDDTimeChange">
									<view class="time">{{item.dTime}}</view>
								</picker>
							</view>
							
							<view @click="dItem(index)"
							 style="color: #10C5A5;margin-left: 20rpx;">
								删除
							</view>
						</view>
						
						
					</view>
				</view>
				
			</view>
			
			<view class="Mask" v-if="showMask">
				<view class="add_label">
					<view class="" style="font-size: 32rpx;font-weight: bold;text-align: center;">
						添加时段
					</view>
					<view class="inp">
						<input type="text" v-model="addName" placeholder="时段名称(小于10个字)"/>
						<picker mode="time" :value="addStime" start="00:01" end="23:59" @change="bindAddStimeChange">
							<view class="AddT">{{addStime || '开始时间'}}</view>
						</picker>
						
						<picker mode="time" :value="addDtime" start="00:01" end="23:59" @change="bindAddDtimeChange">
							<view class="AddT">{{addDtime||'结束时间'}}</view>
						</picker>
					</view>
					<view class="bottom">
						<view class="" style="border: 1rpx solid #f0f0f0;color: #999;width: 20%;" @click="cancel">
							取消
						</view>
						<view class="" style="background: #10C5A5;color: #fff;flex: 1;" @click="addTime">
							确认添加
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="preservation" @click="opData">
				保存
			</view>
		</view>
		
		
		<view class="suspendBar" v-else>
			<view class="first">
				
				<picker mode="date" style="flex: 1;" :value="dates" :start="startDate" :end="endDate" @change="bindDatesChange">
					<view class="search"><uni-icons type="search" color='#999'></uni-icons> {{dates||'选择日期'}}</view>
				</picker>	
				
				<text style="color: #10C5A5;" @click="modal">暂停时段</text>
			</view>
			
			
			
			<view class="">
				<view class="item_date" v-for="(item,index) in suspendList" :key='index' v-if="item.static != 2">
					<view class="dateSty">
						<text :style="{'background': item.static == 0?'#F7CCD1':'#FDEBD3','color': item.static == 0?'#D9001B':'#F59A23','font-size': '24rpx','border-radius': '10rpx','padding':'5rpx 10rpx'}">{{item.static == 0?'暂停中':'已恢复'}}</text>
						<text class="date">{{item.date}}</text>
						<text>{{item.stime}}</text>
						<text>-</text>
						<text>{{item.etime}}</text>
					</view>
					<view class="operation">
						<text v-if="item.static == 0" @click="recovery(index)">恢复</text> 
						<text v-if="item.static == 1" @click="deletes(index)">删除</text>
						<text v-if="item.static == 1" @click="suspend(index)">暂停</text>
					</view>
				</view>
			</view>
			
			
			<view class="modal" v-if="slotModal">
				
				<view class="slot-content">
					
					<view style="font-weight: bold;margin-bottom: 20rpx;">
						暂停营业时段
					</view>
					<view class="content">
						<picker mode="date" :value="form.date" style="width: 100%;" :start="startDate" :end="endDate"
							@change="bindDateChange1">
							<input type="text" v-model="form.date" placeholder="选择日期" maxlength="10" />
						</picker>
	
						<picker mode="time" :value="form.startTime" start="09:01" end="21:01"
							@change="bindTimeChange">
							<input type="text" disabled v-model="form.startTime" placeholder="开始时间" />
						</picker>
						<picker mode="time"  :value="form.endTime" start="09:01" end="21:01"
							@change="bindTimeChange2">
							<input type="text" disabled v-model="form.endTime" placeholder="结束时间" />
						</picker>
	
					</view>
					<view class="footer">
						<text @click="handleClose2">取消</text>
						<text @click="submit">提交</text>
					</view>
				</view>
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				dates:'',
				date:'',
				setAndSuspend:true,
				addName:'',
				addStime:'',
				addDtime:'',
				showMask:false,
				week:{
					one:false,
					two:false,
					three:false,
					four:false,
					five:false,
					six:false,
					day:false
				},
				bz:{
					value: '8',
					stime:'08:00',
					etime:'10:30'
				},
				Bindex:0,
				timeList:[],
				shop:'',
				standard:true,
				suspendList:[
					{
						date:'2021-07-19',
						stime:'8:00',
						etime:'10:00',
						static:0
					},
					{
						date:'2021-07-18',
						stime:'8:00',
						etime:'10:00',
						static:1
					},
					{
						date:'2021-07-17',
						stime:'8:00',
						etime:'10:00',
						static:0
					}
				],
			
				form: {
					date: '',
					startTime: '',
					endTime: '',
				},
				slotModal:false
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			
			 // = uni.getStorageSync('shopData');
			
			var tempshop = uni.getStorageSync('shopDatas')
			var shops
			if(tempshop == ''){
				shops = uni.getStorageSync('shopData')
			}else{
				shops = tempshop
			}
			this.shop = shops
			if(this.shop.businessDate== '' || this.shop.businessDate== undefined ||this.shop.businessDate== 'undefined'){
				
			}else{
				var x = this.shop.businessDate.split(',');
				
			}
			
			if(this.shop.businessTime== '' || this.shop.businessTime== undefined ||this.shop.businessTime== 'undefined'){
				
			}else{
				var businessTime = JSON.parse(this.shop.businessTime)
				this.standard = businessTime.standard
				this.bz = businessTime.bz
				this.timeList = businessTime.timeList
				
				// var x = this.shop.businessDate.split(',');
				// x.map((item,index)=>{
				// 	if(index == 0){
				// 		this.ydw = item
				// 	}else if(index == 1){
				// 		this.l = item
				// 	}else if(index == 2){
				// 		this.r = item
				// 	}
				// })
			}
				
		},
		methods: {
			recovery(index){
				uni.showModal({
				    title: '提示',
				    content: '确定要恢复吗',
				    success: (res) => {
				        if (res.confirm) {
				            this.suspendList[index].static = 1
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			deletes(index){
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗',
				    success: (res) => {
				        if (res.confirm) {
				            this.suspendList[index].static = 2
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			suspend(index){
				uni.showModal({
				    title: '提示',
				    content: '确定要暂停吗',
				    success: (res) => {
				        if (res.confirm) {
				            this.suspendList[index].static = 0
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			submit(){
				this.suspendList.push({
					date:this.form.date,
					stime:this.form.startTime,
					etime:this.form.endTime,
					static:0
				})
				this.slotModal = false
			},
			modal(){
				this.form = {
					date: '',
					startTime: '',
					endTime: '',
				},
				this.slotModal = true
			},
			handleClose2(){
				this.slotModal = false
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			dItem(i){
				var tempArr = this.timeList.filter((item,index)=>{
					if(index != i){
						return item
					}
				})
				
				this.timeList = tempArr
			},
			itemSelect(index){
				this.timeList[index].select = !this.timeList[index].select
				this.$forceUpdate()
			},
			cancel(){
				this.addName = ''
				this.addStime = ''
				this.addDtime = ''
				this.showMask = false
			},
			addTime(){
				
				if(this.addName == '' || this.addStime == '' || this.addDtime == ''){
					uni.showToast({
						title:"请不要留空",
						icon:'none'
					})
					return
				}
				
				this.timeList.push({
					name:this.addName,
					sTime:this.addStime,
					dTime:this.addDtime,
					select:true
				})
				
				this.addName = ''
				this.addStime = ''
				this.addDtime = ''
				
				this.showMask = false
			},
			bindDateChange(e){
				// console.log(e)
				this.date = e.target.value
			},
			bindAddStimeChange(e){
				this.addStime = e.target.value
			},
			bindAddDtimeChange(e){
				this.addDtime = e.target.value
			},
			bindSTimeChange(e){
				this.bz.stime = e.target.value
			},
			bindDTimeChange(e){
				this.bz.etime = e.target.value
			},
			dian(index){
				this.Bindex = index
			},
			bindSDTimeChange(e){
				this.timeList[this.Bindex].sTime = e.target.value
			},
			bindDDTimeChange(e){
				this.timeList[this.Bindex].dTime = e.target.value
			},
			opData(){
				var tempData = {
					standard:this.standard,
					bz:this.bz,
					timeList:this.timeList
				}
				
				
				this.shop.businessTime = JSON.stringify(tempData)
				this.shop.businessDate = JSON.stringify(this.week)
				
				var data = this.shop
				
				// console.log(data)
				// return
					
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
			},
			bindDatesChange(e){
				 this.dates = e.target.value
			},
			
			bindDateChange1: function(e) {
				this.form.date = e.detail.value
			},
			bindTimeChange: function(e) {
				this.form.startTime = e.detail.value
			},
			bindTimeChange2: function(e) {
				this.form.endTime = e.detail.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.c_lable{
		background: #007AFF;
		text-align: center;
		padding: 10rpx 0rpx;
		margin: 30rpx 250rpx;
		font-size: 26rpx;
	}
	
	.select_box{
		/* margin: 30rpx; */
		font-size: 28rpx;
		overflow: hidden;
	}
	
	.select_item{
		padding:15rpx 30rpx;
		box-shadow: 0 0 10rpx #f0f0f0;
		border-radius:10rpx;
		margin-top: 20rpx;
		font-size: 28rpx;
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
	
	.Mask{
		
		display: flex;
		/* display: none; */
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	
	.add_label{
		width: 90%;
		padding: 20rpx;
		background: #fff;
		border-radius: 10rpx;
	}
	
	.d_Date{
		width: 90%;
		padding: 20rpx;
		background: #fff;
		border-radius: 10rpx;
	}
	
	.bottom{
		display: flex;
		justify-content: space-between;
	}
	
	.bottom view{
		border-radius: 10rpx;
		text-align: center;
		padding: 20rpx;
		margin: 20rpx;
	}
	
	.time{
		display: inline-block;
		background: #F9F9F9;
		color: #000;
		margin: 0 10rpx;
		border-radius: 10rpx;
		padding: 5rpx 10rpx;
	}
	
	.selectbox{
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		border: 1rpx solid #ccc;
		border-radius: 50%;
		margin-right: 10rpx;
		padding: 2rpx;
		overflow: hidden;
	}
	
	.selectZ{
		display: inline-block;
		width: 100%;
		height: 100%;
		background: #007AFF;
		border-radius: 50%;
	}
	
	.circle{
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		border-radius: 50%;
		border: 1rpx solid #999;
	}
	
	.timeBox{
		display: flex;
	}
	
	.inp input{
		border: 1rpx solid #f0f0f0;
		padding: 20rpx;
		border-radius: 10rpx;
		margin: 20rpx 0;
	}
	
	.AddT{
		border: 1rpx solid #f0f0f0;
		padding: 20rpx;
		border-radius: 10rpx;
		margin: 20rpx 0;
		color: #999;
	}
	
	.setTime{
		flex: 1;
		padding: 30rpx 0;
		text-align: center;
	}
	
	.showSetTime{
		flex: 1;
		padding: 30rpx 0;
		text-align: center;
		background: #270546;
		color: #fff;
	}

	.suspendBar{ 
		width: 100%;
		height: 100%;
		background: #F7F7F7;
		.first{
			display: flex;
			align-items: center;
			margin: 20rpx;
			
			.search{
				padding:10rpx 20rpx;
				flex: 1;
				background: #FCFCFC;
				border-radius: 30rpx;
				color: #999;
				margin-right: 20rpx;
			} 
		}
		.item_date{
			margin: 10rpx;
			background: #fff;
			display: flex;
			align-items: center;
			padding: 20rpx 10rpx;
			font-size: 28rpx;
			justify-content: space-between;
			.dateSty{
				.date{
					margin: 0 30rpx 0 20rpx;
				}
			}
			.operation{
				text{
					margin: 0 20rpx;
					color: #10C5A5;
				}
			}
		}
		
		
		
	}


	.slot-content {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30rpx;
        flex-direction: column;
		background: #fff;
		width: 85%;
		border-radius: 20rpx;
        .content {
            display: flex;
            flex-direction: column;
            width: 100%;

            input {
                // width: 100%;
                height: 80rpx;
                background-color: #f5f5f5;
                border-radius: 10rpx;
                margin: 0 0 20rpx;
                padding: 0 20rpx;
                text-align: left;
                font-size: 28rpx;
            }
        }

        .footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            text {
				width: 30%;
                text-align: center;
                height: 60rpx;
                line-height: 60rpx;
                width: 30%;
				border: 1rpx solid #f0f0f0;
				color: #999;
				border-radius: 10rpx;
            }

            text:last-child {
				width: 65%;
				background-color: #10C5A5;
				color: #fff;
				// text-align: right;
                // color: rgb(19, 71, 228);
            }
        }
		
		
    }
	
	.modal{
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100%;
		background: rgba(0,0,0,.3);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
