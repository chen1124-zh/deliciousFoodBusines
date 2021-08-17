<template>
	<view class="content">
		<!-- <view :style="{'height':navigation.height+'px',
						'paddingTop': navigation.top + 'px',
						'paddingBottom':'20rpx',
						'color':'#fff'}" >
			<view :style="{'height':navigation.height+'px'}" class="topNavigation">
				
				<view style="height: 100%; display: flex;align-items: center;font-size: 34rpx;color: #000;margin-left:20rpx ;font-weight: 800;">
					商品管理
				</view>
			</view>
		</view> -->
		<view class="classification_box">
			<view class="classification_item" v-for="(item,index) in classifiList" :key='index'>
				<view class="classification_name">
					{{item.menuName}}
				</view>
				<view class="button">
					<view class="" style="background: #10C5A5;" @click="xShow(item.id)">
						修改
					</view>
					<view class="" style="background: #FF6868;" @click="dlMenuType(item.id)">
						删除
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="add_classification" @click="addclassif = true;id = '';menuName=='';menuSort==''">
			+ 添加菜单分类
		</view>
		
		
		
		<view class="Mask" v-if="addclassif">
			<view class="mune_classification">
				<view class="mune_title">
					菜单分类
				</view>
				<view class="inp">
					<input type="text" v-model="menuName" placeholder="分类名称" class="mune_name"/>
					<input type="number" v-model="menuSort" placeholder="排序(数字越小越靠前)" class="mune_sort" />
				</view>
				<view class="select_bottom">
					<view class="qx" @click="addclassif = false">
						取消
					</view>
					<view class="qr" @click="addMenuTypeData">
						{{id?'修改':'确认添加'}}
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
				navigation:'',
				active: 0,
				addclassif:false,
				classifiList:[],
				shopDataId:'',
				menuName:'',
				menuSort:"",
				id:'',
			}
		},
		created() {
			
		},	
		onShow() {
			this.getMenuTypeListData()
		},
		methods: {
			xShow(id){
				
				this.classifiList.map((item)=>{
					if(item.id == id){
						this.id = item.id
						this.menuName = item.menuName
						this.menuSort = item.menuSort
						this.addclassif = true
					}
				})
			},
			dlMenuType(id){
				
				Api.deleteMenuType({id:id}).then(res => {
					
					if(res.code == 200){
						uni.showToast({
							title:'删除成功',
							icon:'none'
						})
						this.getMenuTypeListData()
					}else{
						uni.showToast({
							title:'删除失败！！！',
							icon:'none'
						})
					}
					
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
			},
			addMenuTypeData(){
				
				if(this.id == ''){
					var than = this
					var data = {
						storeId:this.shopDataId.id,
						menuName:this.menuName,   //菜系名称
						menuSort:this.menuSort,   //菜系排序
						productId:'',    //商品id
						type:1
					}
					Api.addMenuType(data).then(res => {
						console.log(res)
						
						if(res.code == 200){
							uni.showToast({
								title:'新增成功',
								icon:'none'
							})
							this.getMenuTypeListData()
							this.addclassif = false
						}else{
							uni.showToast({
								title:'新增失败！！！',
								icon:'none'
							})
						}
						
					}).catch(err => {
						uni.showToast({
							title: err.msg,
							icon: 'none'
						})
					});
				}else{
					var than = this
					var data = {
						id:this.id,
						storeId:this.shopDataId.id,
						menuName:this.menuName,   //菜系名称
						menuSort:this.menuSort,   //菜系排序
						productId:'',    //商品id
					}
					Api.updateMenuType(data).then(res => {
						console.log(res)
						
						if(res.code == 200){
							uni.showToast({
								title:'修改成功',
								icon:'none'
							})
							this.getMenuTypeListData()
							this.addclassif = false
						}else{
							uni.showToast({
								title:'修改失败！！！',
								icon:'none'
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
			getMenuTypeListData(){
				var than = this
				this.shopDataId = uni.getStorageSync('shopData');
		
				var data = {
					 storeId:this.shopDataId.id
				}
				Api.getMenuTypeList(data).then(res => {
					than.classifiList = res.data.data
					console.log(res)
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				
			},
		}
	}
</script>

<style>
	
	.content{
		background: #FAFAFA;
	}
	
	.add_classification{
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		padding: 20rpx 0;
		color: red;
		/* border-top: 1rpx solid #ccc; */
		font-size: 36rpx;
		margin: 10rpx 0;
	}
	
	.classification_item{
		margin: 0 30rpx;
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #ccc;
	}
	
	.classification_name{
		font-size: 34rpx;
	}
	
	.button{
		display: flex;
	}
	
	.button view{
		font-size: 28rpx;
		margin: 0 10rpx;
		padding: 5rpx 20rpx;
		/* background: #07C160; */
		border-radius: 10rpx;
		color: #fff;
	}
	
	.Mask{
		position: fixed;
		top: 0;
		z-index: 101;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0,0,0,0.5);
	}
	
	.mune_classification{
		width: 80%;
		padding: 30rpx;
		background: #fff;
		border-radius: 10rpx;
	}
	
	.mune_title{
		font-size: 38rpx;
		/* font-weight: 700; */
		margin-bottom: 20rpx;
	}
	
	.mune_classification input{
		border: 1rpx solid #ccc;
		width: auto;
		margin: 20rpx 0;
		padding: 10rpx;
		font-size: 28rpx;
	}
	
	.select_bottom{
		display: flex;
	}
	
	
	.select_bottom view{
		/* flex: 1; */
		font-size: 30rpx;
		margin: 10rpx;
		text-align: center;
		/* background-color: #007AFF; */
		border-radius: 10rpx;
		padding: 20rpx 0;
		
	}
	
	
	.inp input{
		padding: 16rpx;
		border-radius: 10rpx;
	}
	
	.qx{
		border: 1rpx solid #ccc;
		width: 20%;
		color: #999;
	}
	
	.qr{
		background-color: #10C5A5;
		flex: 1;
		color: #fff;
		/* width: 70%; */
	}
	
</style>
