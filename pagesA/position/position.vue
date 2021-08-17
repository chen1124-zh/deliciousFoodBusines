<template>
	<view class="content">
		
		<view class="" style="display: flex;align-items: center;justify-content: space-between;">
			<view class="add" @click="addImg" style="width: 25%;">
				上传桌位图
			</view>
			<view class="add" @click="tj" style="width: 60%;">
				+ 添加桌位
			</view>
		</view>
		
		
		
		
		<view class="" style="position: relative;">
			<view class="a" v-for="(item,index) in z" :key='index' :style="{'top':item.top+'px','left':item.left+'px','color':item.color}" :id="item.id" @touchmove="yd">
				{{item.name}}
			</view>
			<view class="" style="width: 100%;height: 600rpx;">
				<image :src="bImg" mode="" style="width: 100%;height: 100%;"></image>
				
			</view>
		</view>
		
		<view class="" style="display: flex;margin: 20rpx 70rpx;" v-if="z.length>0">
			<view class="tr">
				<view class="">
					包厢
				</view>
				<view :style="{'color':item.color}" v-for="(item,index) in z" :key='index' v-if="item.packages == 0" @click="Hcoclor(index )">
					{{item.name}}
				</view>
			</view>
			<view class="tr">
				<view class="">
					卡座
				</view>
				<view :style="{'color':item.color}" v-for="(item,index) in z" :key='index' v-if="item.packages == 1" @click="Hcoclor(index )">
					{{item.name}}
				</view>
			</view>
			<view class="tr">
				<view class="">
					大厅
				</view>
				<view :style="{'color':item.color}" v-for="(item,index) in z" :key='index' v-if="item.packages == 2" @click="Hcoclor(index )">
					{{item.name}}
				</view>
			</view>
		</view>
		
		
		<!-- <view class="">
			<image :src="img" mode="" style="width: 100%;height: 600rpx;"></image>
		</view> -->
		<view class="" style="opacity: 0;overflow: hidden;height: 0;">
			<canvas style="width: 100%; height: 600rpx;" canvas-id="img" id="img" ></canvas>
		</view>	
		
		
		
		<view class="preservation" @click="baoc">
			保存
		</view>
		
		<view class="Mask" v-if="addMask">
			<view class="bai">
				<view class="tName">
					添加桌位
				</view>
				<view class="inp">
					<picker mode="selector" :value="packages" :range="packages" range-key="name" @change="change">
						<view style="width: 100%;display: flex;justify-content: space-between;color: #999;"><text>{{packages[packageIndex].name}}</text>  <uni-icons type="arrowdown" size="20"></uni-icons> </view>
					</picker>
					<!-- <input type="text" value="" /> -->
				</view>
				<view class="inp">
					<input type="text" v-model="name" placeholder="名称"/>
				</view>
				
				<view class="inp">
					<textarea v-model="introduce" placeholder="介绍" style="height: 150rpx;"/>
				</view>
				<view class="" style="display: flex;justify-content: space-between;">
					<view class="an" @click="addMask = false" style="width: 25%; border: 1rpx solid #f0f0f0;color: #999;">
						取消
					</view>
					<view class="an" @click="addData"  style="width: 60%; background: #10C5A5;color: #fff;">
						确认添加
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
				z:[],
				name:"",
				introduce:"",
				bImg:'',
				index:0,
				img:'',
				packages:[
					{
						name:'包厢'
					},
					{
						name:'卡座'
					},
					{
						name:'大厅'
					}
				],
				packageIndex:0,
				addMask:false,
				id:1,
				shopData:'',
				type:false
			}
		},
		onUnload(){
			// console.log(12312321312)
			
			
			
		},
		onLoad() {
			this.index = 0
			this.z = []
			this.shopData = uni.getStorageSync("shopData");
			
			if(this.shopData == ''){
				
			}else{
				
				var data = {
					storeId:this.shopData.id
				}
				Api.getSeatList(data).then(res => {
					console.log('res',res.data.data);
					if(res.data.data.length != 0){ 
						this.bImg = res.data.data[0].seatImg
						res.data.data.map((item,index)=>{
							
							this.z.push({
								top:item.top,
								left:item.left,
								color:item.seatStatus==1?'#F04040':item.seatStatus==2?'#3ACE1B':'#979797',
								packages:item.seatType,
								name:item.seatName,
								introduce:item.seatSuggest,
								id:this.index++,
								// sId:item.id
							})
							
							
							
						})
						
						
					}
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
				
				
			}
			
			
			
		},
		methods: {
			Hcoclor(index){
				if(this.z[index].color == '#979797'){
					this.z[index].color = '#3ACE1B'
				}else if(this.z[index].color == '#F04040'){
					this.z[index].color = '#979797'
				}else if(this.z[index].color == '#3ACE1B'){
					this.z[index].color = '#F04040'
				}
			},
			addData(){
				this.z.push({
					top:0,
					left:0,
					color:'#979797',
					packages:this.packageIndex,
					name:this.name,
					introduce:this.introduce,
					id:this.index++
				})
				
				this.addMask = false
				
			},
			addImg(){
				
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res) => {
						this.bImg = res.tempFilePaths[0]
						
				    }
				});
			},
			change(e){
				this.packageIndex = e.detail.value
			},
			
			tj(){
				if(this.bImg == ''){
					uni.showToast({
						title:'请先添加桌位图',
						icon:'none'
					})
					return
				}
				this.name  = "" 
				this.introduce = ""
				this.packageIndex = 0
				this.addMask = true
				
			},
			yd(e){
				this.z[e.currentTarget.id].top = e.changedTouches[0].pageY-100
				this.z[e.currentTarget.id].left = e.changedTouches[0].pageX-30
			},
			
			baoc(){
				
				if(this.bImg == ''){
					uni.showToast({
						title:'请先添加桌位图',
						icon:'none'
					})
					return
				}
				
				if(this.z.length == 0){
					uni.showToast({
						title:'请先桌位',
						icon:'none'
					})
					return
				}
				
				const ctx = uni.createCanvasContext('img');
				ctx.drawImage(this.bImg, 0, 0, 375, 300);
				
				this.z.map((item)=>{
					ctx.font = "50";
					// ctx.strokeStyle = "#ccc";
					//         ctx.textAlign = "center";    
					 ctx.fillStyle =item.color
					ctx.fillText(item.name,  item.left+10,item.top+22);
					
				})
				
				ctx.draw(false)
				
				
				
				var data = {
					storeId:this.shopData.id
				}
				Api.getSeatList(data).then(res => {
					console.log('res',res.data.data);
					if(res.data.data.length != 0){ 
						this.bImg = res.data.data[0].seatImg
						res.data.data.map((item,index)=>{
							Api.deleteSeat({id:item.id}).then(res => {}).catch(err => {
								uni.showToast({
									title: err.msg,
									icon: 'none'
								})
							});
							if(res.data.data.length-1 == index){
								uni.canvasToTempFilePath({
									fileType: "jpg",
									canvasId: 'img',
									success: (res)=> {
										
										
										 uni.uploadFile({
										  url : 'http://47.113.217.251:8080/user/fileUpload',
										  filePath: res.tempFilePath,
										  name: 'file',
										 
										  success: (uploadFileRes)=> {
											  this.img = res.tempFilePath
												this.z.map((item,index)=>{
													
													var data = {
														storeId:this.shopData.id||'',  //店铺ID
														seatImg:this.img||'',    //桌位图
														seatType:item.packages||0,   //桌位类型
														seatName:item.name||'',    //桌位名称
														seatStatus:item.color=='#F04040'?1:item.color=='#3ACE1B'?2:0||0,   //桌位状态
														seatSuggest:item.introduce||'',   //桌位介绍
														top:item.top||0,
														left:item.left||0
													}
													
													Api.addSeat(data).then(res => {
														console.log('res',res);
														
													}).catch(err => {
														uni.showToast({
															title: err.msg,
															icon: 'none'
														})
													});
													
													
												})
										  }
										});
										// 在H5平台下，tempFilePath 为 base64
										
										// if(index == this.z.length-1){
											uni.showToast({
												title:'添加成功',
												icon: 'none'
											})
											uni.navigateBack({
												delta:-1
											})
										// }
										
									}
								})
							}
						})
						
						
					}
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

<style scoped>
	.a{
		position: absolute;
		padding: 20rpx;
		background-color: rgba(0,0,0,.3);
		font-size: 24rpx;
	}
	
	.tr{
		width: 33%;
		text-align: center;
		
	}
	
	.tr view{
		padding: 30rpx 0;
		border: 1rpx solid #ccc;
	}
	
	.add{
		border: 1rpx solid #10C5A5;
		color: #10C5A5;
		padding: 26rpx 0rpx;
		text-align: center;
		border-radius: 20rpx;
		margin: 30rpx;
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
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	
	
	.bai{
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
	}
	
	.inp{
		border: 1rpx solid #f0f0f0;
		border-radius: 10rpx;
		padding: 20rpx;
		margin: 20rpx 0;
	}
	.tName{
		font-size: 36rpx;
		
	}
	
	.an{
		border-radius: 10rpx;
		width: 25%;
		padding: 30rpx 0;
		text-align: center;
	}
</style>
