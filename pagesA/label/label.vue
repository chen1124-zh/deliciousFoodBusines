<template>
	<view>
		
		<view class="select_box">
			<view class="title">
				选择标签
			</view>
			<view class="" >
				<view class="select_item" v-for="(item,index) in labellist" :key='index' style="background: #10C5A5;color: #fff;">
					<view class="x" @click="del(index)">
						x
					</view>
					{{item}}
				</view>
				
			</view>
		</view>
		
		<view class="c_lable" @click="addlabel">
			自定义标签
		</view>
		
		
		
		
		
		<view class="Mask" v-if="m">
			<view class="add_label">
				<view class="zdy">
					自定义标签
				</view>
				<view class="">
					<input type="text" v-model="text" style="padding: 20rpx;border-radius: 10rpx;" placeholder="标签名称"/>
				</view>
				<view class="bottom">
					<view class=""  @click="m = true"
					style="width: 30%;border: 1rpx solid #f0f0f0;color: #ccc;">
						取消
					</view>
					<view class="" @click="qaddlable"
					style="width: 50%;background: #10C5A5;color: #fff;">
						确认添加
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="select_box">
			<view class="title">
				系统标签
			</view>
			<view class="" >
				<view :class="item.select?'select':'select_item'" v-for="(item,index) in systemLabelList" :key='index' @click="systemSelect(index)">
					{{item.menuName}}
				</view>
				
			</view>
		</view>
		
		
		<view class="preservation" @click="uShop">
			保存
		</view>
	</view>
</template>

<script>
	import Api from '@/common/http.js'
	export default {
		data() {
			return {
				text:'',
				m:false,
				labellist:[],
				shopData:'',
				type:'',
				systemLabelList:[],
				Xselect:[]
			}
		},
		onLoad(op) {
			var tempshop = uni.getStorageSync('shopDatas')
			var shops
			if(tempshop == ''){
				shops = uni.getStorageSync('shopData')
			}else{
				shops = tempshop
			}
			this.shopData = shops
			this.type = op.type
			if(op.type == 1){
				if(this.shopData.foodLabel){
					var temp = JSON.parse(this.shopData.foodLabel)
					this.Xselect = temp.system
					this.labellist = temp.custom
				}
				
				uni.setNavigationBarTitle({
					title:"菜品标签"
				})
			}else if(op.type == 2){
				if(this.shopData.servuceConfiguration){
					var temp = JSON.parse(this.shopData.servuceConfiguration)
					this.Xselect = temp.system
					this.labellist = temp.custom
				}
				
				uni.setNavigationBarTitle({
					title:"服务配置"
				})
			}else if(op.type == 3){
				if(this.shopData.foodSort){
					var temp = JSON.parse(this.shopData.foodSort)
					this.Xselect = temp.system
					this.labellist = temp.custom
				}
				
				uni.setNavigationBarTitle({
					title:"菜系分类"
				})
			}else if(op.type == 4){
				if(this.shopData.appraiseManager){
					var temp = JSON.parse(this.shopData.appraiseManager)
					this.Xselect = temp.system
					this.labellist = temp.custom
				}
				
				uni.setNavigationBarTitle({
					title:"评价管理"
				})
			}else if(op.type == 5){
				if(this.shopData.foodItem){
					var temp = JSON.parse(this.shopData.foodItem)
					this.Xselect = temp.system
					this.labellist = temp.custom
				}
				
				uni.setNavigationBarTitle({
					title:"菜品特点"
				})
			}else{
				uni.setNavigationBarTitle({
					title:"标签"
				})
			}
			this.getSystemLabel()
			
			
		},
		methods: {
			systemSelect(index){
				this.systemLabelList[index].select = !this.systemLabelList[index].select
				this.$forceUpdate()
			},
			getSystemLabel(){
				var data = {
					id:'',
					productId:'',
					type:this.type
				}
				Api.getMenuTypeList(data).then(res => {
					this.systemLabelList = res.data.data
					this.Xselect.map((item,index)=>{
						this.systemLabelList.map((items)=>{
							if(item.id == items.id){
								items.select = true
							}
						})
					})
					// console.log('res',res.data.data);
					
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
			}, 
			uShop(){
				
				var systemLabel = []
				
				for(var i = 0;i<this.systemLabelList.length;i++){
					if(this.systemLabelList[i].select == true){
						systemLabel.push({
							id:this.systemLabelList[i].id,
							name:this.systemLabelList[i].menuName
						})
					}
					
				}
				
				
				var tempObj = {
					system:systemLabel,
					custom:this.labellist
				}
				if(this.type == 1){
					this.shopData.foodLabel = JSON.stringify(tempObj)	
				}else if(this.type == 2){
					this.shopData.servuceConfiguration = JSON.stringify(tempObj)
				}else if(this.type == 3){
					this.shopData.foodSort = JSON.stringify(tempObj)
				}else if(this.type == 4){
					this.shopData.appraiseManager = JSON.stringify(tempObj)
				}else if(this.type == 5){
					this.shopData.foodItem = JSON.stringify(tempObj)
				}
				
				
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
			},
			del(indexs){
				var data = []
				this.labellist.map((item,index)=>{
					if(index != indexs){
						data.push(item)
					}
				})
				
				this.labellist = data
			},
			qaddlable(){
				this.labellist.push(this.text);
				this.m = false
			},
			addlabel(){
				this.text = ''
				this.m = true
			}
		}
	}
</script>

<style>
	
	.c_lable{
		border: 1rpx solid #10C5A5;
		border-radius: 10rpx;
		color: #10C5A5;
		/* background: #007AFF; */
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
		float: left;
		padding:10rpx 20rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		position: relative;
		font-size: 32rpx;
	}

	.x{
		position: absolute;
		right: -10rpx;
		top:-10rpx;
		border: 1rpx solid #FF1010;
		border-radius: 50%;
		color: #FF1010;
		background: #fff;
		font-size: 28rpx;
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
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
		z-index: 101;
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
		/* flex: 1; */
		border-radius: 20rpx;
		/* background: #007AFF; */
		text-align: center;
		padding: 20rpx;
		margin: 30rpx;
	}
	
	.select{
		float: left;
		padding:10rpx 20rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		position: relative;
		font-size: 32rpx;
		background: #10C5A5;
		color: #fff;
	}
</style>
