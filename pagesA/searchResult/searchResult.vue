<template>
	<view>
		<view :style="{'height':navigation.height+'px','paddingTop': navigation.top + 'px','paddingBottom':'10rpx'}" >
			<view :style="{'height':navigation.height+'px','width':navigation.left+'px'}" class="topNavigation">
				<view class="search">
					<view class="search_box">
						<view class=".search_icon">
							
						</view>
						<view class="">
							水煮牛肉
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="">
			<view class="screen_box">
				<view class="screen_left">
					
					<view class="select_item">
						综艺排序
					</view>
					<view class="select_item">
						距离
					</view>
					<view class="select_item">
						销量
					</view>
				</view>
				<view class="screen">
					筛选
				</view>
			</view>
		</view>
		<view class="good_all_box">
			<view class="good_item_box">
				<view class="googImgBox">
					
				</view>
				<view class="good_item_describe">
					<view class="good_name_mueu">
						<view class="good_name">
							111111
						</view>
						<view class="good_mueu">
							...
						</view>
					</view>
					
					<view class="good_describe">
						<view class="good_score">
							1
						</view>
						<view class="good_sale">
							2
						</view>
					</view>
					
					<view class="good_performance">
						<view class="good_start_price">
							1
						</view>
						<view class="good_distance_time">
							1
						</view>
					</view>
					
					<view class="good_describe_label_box">
						<view class="good_item_describe_label">
							配送
						</view>
						<view class="good_item_describe_label">
							配送
						</view>
						<view class="good_item_describe_label">
							配送
						</view>
						<view class="good_item_describe_label">
							配送
						</view>
					</view>
					<view class="good_taste_label_box">
						<view class="good_item_taste_label_box">
							香辣
						</view>
						<view class="good_item_taste_label_box">
							香辣
						</view>
						<view class="good_item_taste_label_box">
							香辣
						</view>
						<view class="good_reserve">
							预定
						</view>
							
					</view>
					
					
					
				</view>
			</view>
			<view class="good_item_box">
					<view class="googImgBox">
						
					</view>
					<view class="good_item_describe">
						<view class="good_name_mueu">
							<view class="good_name">
								111111
							</view>
							<view class="good_mueu">
								...
							</view>
						</view>
						
						<view class="good_describe">
							<view class="good_score">
								1
							</view>
							<view class="good_sale">
								2
							</view>
						</view>
						
						<view class="good_performance">
							<view class="good_start_price">
								1
							</view>
							<view class="good_distance_time">
								1
							</view>
						</view>
						
						<view class="good_describe_label_box">
							<view class="good_item_describe_label">
								配送
							</view>
							<view class="good_item_describe_label">
								配送
							</view>
							<view class="good_item_describe_label">
								配送
							</view>
							<view class="good_item_describe_label">
								配送
							</view>
						</view>
						<view class="good_taste_label_box">
							<view class="good_item_taste_label_box">
								香辣
							</view>
							<view class="good_item_taste_label_box">
								香辣
							</view>
							<view class="good_item_taste_label_box">
								香辣
							</view>
							<view class="good_reserve">
								预定
							</view>
								
						</view>
						
						
						
					</view>
				</view>
			
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navigation:null
			}
		},
		components: {
		},
		created() {
			this.navigation = this.$store.getters.getNavigation
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
	.search{
		height: 100%;
		// background-color: #0D92FF;
		padding: 0rpx 25rpx;
	}
	
	.search_box{
		height: 100%;
		display: flex;
		align-items: center;
		width: 100%;
		color: #ccc;
		background-color: #ccc;
		border-radius: 38rpx;
	}
	
	.search_icon{
		width: 40rpx;
		height: 40rpx;
		// padding: 20rpx;
		background: #ccc;
	}
	
	
	.screen_box{
		margin: 0 10rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.screen_left{
		display: flex;
	}
	
	.select_item{
		margin: 0 10rpx;
		font-size: 24rpx;
	}
	
	
	.good_item_box{
		display: flex;
		margin: 20rpx;
	}
	
	.googImgBox{
		width: 170rpx;
		height: 170rpx;
		border-radius: 10rpx;
		background: #007AFF;
		margin-right: 20rpx;
	}
	.good_item_describe{
		flex: 1;
	}
	
	.good_name_mueu{
		display: flex;
		justify-content: space-between;
	}
	
	.good_name{
		font-size: 30rpx;
		color: #000;
	}
	.good_describe{
		display: flex;
		margin: 5rpx 0;
	}
	
	.good_score{
		margin-right: 20rpx;
		font-size: 28rpx;
	}
	
	.good_sale{
		font-size: 28rpx;
	}
	
	.good_start_price,.good_distance_time,.good_describe_label_box,.good_taste_label_box{
		font-size: 24rpx;
	}
	
	.good_performance{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	
	.good_describe_label_box{
		display: flex;
		
	}
	
	.good_item_describe_label{
		color: #E19D58;
		background: #FEF4E9;
		margin-right: 16rpx;
		padding: 2rpx 20rpx;
		border-radius: 1rpx;
	}
	
	.good_item_taste_label_box{
		color: #EEACAA;
		border: 1rpx solid #FCFCFC;
		margin-right: 16rpx;
		padding: 2rpx 20rpx;
		border-radius: 1rpx;
	}
	
	.good_taste_label_box{
		display: flex;
	}
	
	.good_reserve{
		padding: 10rpx;
		border: 1rpx solid #999;
	}
</style>
