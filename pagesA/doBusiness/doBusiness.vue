<template>
	<view>
		
		<view class="select_box">
			<view class="title">
				日期
			</view>
			<view class="" style="display: flex;justify-content: center;">
				<view class="select_item"
				 :style="{'background':ydw?'#270546':'#fff','color': ydw?'#fff':'#000'}"
				 @click="xian(0)">
					周一至周五
				</view>
				<view class="select_item" 
				:style="{'background':l?'#270546':'#fff','color': l?'#fff':'#000'}"
				 @click="xian(1)">
					周六
				</view>
				<view class="select_item"
				 :style="{'background':r?'#270546':'#fff','color': r?'#fff':'#000'}"
				 @click="xian(2)">
					周日
				</view>
				
			</view>
		</view>
		
		<view class="select_box">
			<view class="title">
				时段
			</view>
			<view class="">
				 <radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in bz" :key="item.value">
						
						
						<view class="" style="display: flex;align-items: center; margin:20rpx 50rpx;">
							<radio :value="item.value" :checked="index === current" /> </text>{{item.name}}
							
							<picker mode="time" :value="item.stime" start="00:01" end="23:59" @click="dian(index,'s')" @change="bindSTimeChange">
								<view class="time"  v-if="index==0">{{item.stime}}</view>
							</picker>
							<text v-if="index==0"> 至</text>
							<picker mode="time" :value="item.etime" start="00:01" end="23:59" @click="dian(index,'s')" @change="bindDTimeChange">
								<view class="time"  v-if="index==0">{{item.etime}}</view>
							</picker>
							<!-- <text class="time" v-if="index==0">{{item.etime}}</text> -->
						</view>
					</label>
				</radio-group>
			
			
				<!-- <view class="" style="display: flex;align-items: center; margin:20rpx 50rpx;">
					<radio value="r1" checked="true" /> </text>标准<text class="time">8:00</text>至<text class="time">22:00</text>
				</view>
				<view style="margin:20rpx 50rpx;">
					<radio value="r2" /> </text>个性化设置
				</view> -->
				
				
				 <checkbox-group @change="checkboxChange">
					 <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="item.value">
						 <view>
							 
						 </view>
						 <view style="display: flex;align-items: center;margin:20rpx 100rpx;">
						 	<checkbox :value="item.value" :checked="item.checked" :disabled='item.disabled'/>{{item.name}}
							
							<picker mode="time" :value="item.stime" start="00:01" end="23:59" @click.stop="dian(index,'s')" @change="bindISTimeChange">
								<view class="time">{{item.stime}}</view>
							</picker>
							至
							<picker mode="time" :value="item.etime" start="00:01" end="23:59" @click.stop="dian(index,'s')" @change="bindIDTimeChange">
								<view class="time">{{item.etime}}</view>
							</picker>
							<!-- <text class="time">{{item.etime}}</text> -->
						 </view>
					 </label>
				 </checkbox-group>
				
				<!-- <view style="display: flex;align-items: center;margin:20rpx 100rpx;">
					<text class="selectbox"> <text class="selectZ"></text> </text>上午<text class="time">{{item.stime}}</text>至<text class="time">{{item.etime}}</text>
				</view>
				<view style="display: flex;align-items: center;margin:20rpx 100rpx;">
					<text class="selectbox"> <text class="selectZ"></text> </text>上午<text class="time">12:00</text>至<text class="time">14:30</text>
				</view>
				<view style="display: flex;align-items: center;margin:20rpx 100rpx;">
					<text class="selectbox"> <text class="selectZ"></text> </text>上午<text class="time">17:30</text>至<text class="time">23:30</text>
				</view> -->
			</view>
		</view>
		
		
		<view class="Mask">
			<view class="add_label">
				<view class="">
					添加时段
				</view>
				<view class="">
					<input type="text" value="" placeholder="起始时间"/>
					<input type="text" value="" placeholder="结束时间"/>
				</view>
				<view class="bottom">
					<view class="">
						取消
					</view>
					<view class="">
						确认添加
					</view>
				</view>
			</view>
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
				ydw:true,
				l:true,
				r:true,
				bz:[{
					value: '8',
					name: '标准',
					stime:'8:00',
					etime:'10:30'
				},{
					value: 'g',
					name: '个性化设置',
					stime:'',
					etime:''
				}],
				Bindex:0,
				items: [{
						value: '8',
						name: '上午',
						stime:'8:00',
						etime:'10:30',
						disabled:true
					},
					{
						value: '12',
						name: '下午',
						stime:'12:00',
						etime:'14:30',
						disabled:true
					},
					{
						value: '17',
						name: '晚上',
						stime:'17:30',
						etime:'23:30',
						disabled:true
					},
				],
				current:0,
				shop:''
			}
		},
		onLoad() {
			this.shop = uni.getStorageSync('shopData');
			if(this.shop.businessDate== '' || this.shop.businessDate== undefined ||this.shop.businessDate== 'undefined'){
				
			}else{
				var x = this.shop.businessDate.split(',');
				x.map((item,index)=>{
					if(index == 0){
						this.ydw = item
					}else if(index == 1){
						this.l = item
					}else if(index == 2){
						this.r = item
					}
				})
			}
			
			if(this.shop.businessTime== '' || this.shop.businessTime== undefined ||this.shop.businessTime== 'undefined'){
				
			}else{
				var businessTime = JSON.parse(this.shop.businessTime)
				this.bz = businessTime.bz
				this.items = businessTime.items
				
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
			xian(index){
				if(index == 0){
					this.ydw = !this.ydw
				}else if(index == 1){
					this.l = !this.l
				}else if(index == 2){
					this.r = !this.r
				}
			},
			checkboxChange: function (e) {
				
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			radioChange: function(evt) {
				var d = '1'
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						d = i
						break;
					}
				}
				if(d == 0){
					this.items.map((item,index) => {
						item.disabled = true
						// item.checked = false
						this.$set(item,'checked',false)
					})
				}else{
					this.items.map((item,index) => {
						item.disabled = false
					})
				}
				
			},
			dian(index){
				this.Bindex = index
			},
			bindSTimeChange(e){
				this.bz[this.Bindex].stime = e.target.value
			},
			bindDTimeChange(e){
				this.bz[this.Bindex].etime = e.target.value
			},
			bindISTimeChange(e){
				this.items[this.Bindex].stime = e.target.value
			},
			bindIDTimeChange(e){
				this.items[this.Bindex].etime = e.target.value
			},
			opData(){
				console.log(this.bz)
				console.log(this.items)
				console.log(this.current)
				var tempData = {
					bz:this.bz,
					items:this.items
				}
				
				
				this.shop.businessTime = JSON.stringify(tempData)
				this.shop.businessDate = this.ydw+','+this.l+','+this.r
				
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
			}
		}
	}
</script>

<style>
	
	.c_lable{
		background: #007AFF;
		text-align: center;
		padding: 10rpx 0rpx;
		margin: 30rpx 250rpx;
		font-size: 26rpx;
	}
	
	.select_box{
		margin: 30rpx;
		font-size: 24rpx;
		overflow: hidden;
	}
	
	
	.select_item{
		/* float: left; */
		padding:30rpx;
		/* background: #007AFF; */
		box-shadow: 0 0 10rpx #f0f0f0;
		border-radius:20rpx 20rpx 0 20rpx;
		/* margin-right: 20rpx; */
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
		display: none;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	.Mask input{
		font-size: 30rpx;
		padding: 10rpx;
		border: 1rpx solid #CCCCCC;
		margin: 20rpx 0;
	}
	
	.add_label{
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
		flex: 1;
		border-radius: 20rpx;
		background: #007AFF;
		text-align: center;
		padding: 20rpx;
		margin: 30rpx;
	}
	
	.time{
		display: inline-block;
		background: #E1E1E1;
		color: #999;
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
</style>
