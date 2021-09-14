<template>
	<view class="mask">
		<view class="pca-picker-box">
			<view class="addrses4">
				<view :class="['addrses4-1', showType == '0' ? 'actvieColor' : '']" @tap.stop="onclickselect('0')">
					中国大陆
				</view>
				<view :class="['addrses4-1', showType == '1' ? 'actvieColor' : '']" @tap.stop="onclickselect('1')">
					港澳台及海外
				</view>
			</view>
			
			<view class="select-al-box">
				<view class="select-al-item" @click="selectAl(0)">
					省份
					<text :class="selectAlIndex==0?'actives itmes':'itmes'"></text>
				</view>
				
				<view class="select-al-item" @click="selectAl(1)">
					城市
					<text :class="selectAlIndex==1?'actives itmes':'itmes'"></text>
				</view>
				
				
				<view class="select-al-item" @click="selectAl(2)">
					区县
					<text :class="selectAlIndex==2?'actives itmes':'itmes'"></text>
				</view>
				
				
				<view class="select-al-item" @click="selectAl(3)">
					镇/街道
					<text :class="selectAlIndex==3?'actives itmes':'itmes'"></text>
				</view>
				
				<view class="select-al-item" @click="selectAl(4)">
					村/社区
					<text :class="selectAlIndex==4?'actives itmes':'itmes'"></text>
				</view>
			</view>
			
			
			<view class="region">
				<view class="region_box">
					<view class="region_Item"  v-for="(item,index) in pcaList[selectAlIndex].list" :key='index' @click="select_region(selectAlIndex,index)">
						<text>
							{{item.name}}
						</text>
						<uni-icons type="checkbox-filled" color="#669900" v-if="pcaList[selectAlIndex].selectIndex == index"></uni-icons>
					</view>
				</view>
				
			</view>
			
			
			
			
			
			
			
			
			
			
			
			
	
		</view>
		
		
		<view class="picker-head" @tap.stop="queren(selectAlIndex)">
			确认
		</view>
		
		
		
		<!-- 选择区域 -->
		<!-- <view class="picker-head" @tap.stop="queren2" v-if="showBtnType == '0'">
			确认
		</view> -->
		<!-- 设置家乡 -->
		<!-- <view class="picker-head" @tap.stop="queren" v-if="showBtnType == null">
			确认
		</view> -->
		<!-- 每个层级都有按钮 -->
		<!-- <view class="picker-head" @tap.stop="onClickConfirm" v-if="showBtnType == '3'">
			确认
		</view> -->
		<!-- 所选区域默认显示再最一级 -->
		<!-- <view class="picker-head" @tap.stop="queren3" v-if="(showBtnType == '2' && showBtn)">
			确认
		</view> -->

		<!-- 申请区域管理员 返回省市区五级 居住地址 -->
		<!-- <view class="picker-head" @tap.stop="queren4" v-if="showBtnType == '1' && showBtn">
			确认
		</view> -->


	</view>
</template>

<script>
	import Api from '@/common/http.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				//省市区列表
				pcaList: [{
					selectIndex: -1,
					qselectIndex:-1,
					target: "",
					list: [],
				},{
					selectIndex: -1,
					qselectIndex:-1,
					target: "",
					list: [],
				},{
					selectIndex: -1,
					qselectIndex:-1,
					target: "",
					list: [],
				},{
					selectIndex: -1,
					qselectIndex:-1,
					target: "",
					list: [],
				},{
					selectIndex: -1,
					qselectIndex:-1,
					target: "",
					list: [],
				}, ],
				selectAlList: [{
						title: "省份",
					},
					{
						title: "城市",
					},
					{
						title: "区县",
					},
					{
						title: "镇/街道",
					},
					{
						title: "村/社区",
					},
					//  {
					// 	title: '村组/小区'
					// }
				],
				selectAlIndex: 0,
				// currentIndex: 0,
				// names: "",
				// addris: "",
				// showBtnType: null,
				// selectArr:[],
				// orgId: null,
				// showTypeAddress: null
			};
		},
		components:{
			uniIcons
		},
		created() {
			
		},
		onLoad(options) {
			var pcaList = JSON.parse(options.pcaList)
			if(pcaList.length == 0){
				this.getCityList(0,0)
			}else{
				this.pcaList = pcaList
			}
			
		},
		methods: {
			queren(selectAlIndex){
				if(this.pcaList[selectAlIndex].selectIndex == -1){
					return
				}
				
				if(this.selectAlIndex == 4){
					this.pcaList[selectAlIndex].qselectIndex = this.pcaList[selectAlIndex].selectIndex
					let pages = getCurrentPages();  //获取所有页面栈实例列表
					let nowPage = pages[ pages.length - 1];  //当前页页面实例
					let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
					prevPage.$vm.diqu = this.pcaList;   //修改上一页data里面的sh参数值为100
					uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					    delta: 1
					});
					return
				}
				
				
				this.pcaList[selectAlIndex].qselectIndex = this.pcaList[selectAlIndex].selectIndex
				this.selectAlIndex++
				this.getCityList(this.pcaList[selectAlIndex].list[this.pcaList[selectAlIndex].qselectIndex].code,this.selectAlIndex)
			},
			selectAl(index){
				if(this.pcaList[index].list.length == 0){
					return
				}
				this.selectAlIndex = index
			},
			select_region(i,j){
				this.pcaList[i].selectIndex = j
				if(this.pcaList[i].qselectIndex != this.pcaList[i].selectIndex){
					for(var x=i+1;x<5;x++){
						this.pcaList[x].list = []
						this.pcaList[x].selectIndex = -1
					}
				}
				
				
			},
			getCityList(pCode,selectAlIndex){
				
				var data = {
					pCode:pCode
				}
				Api.getCityList(data).then(res => {
					this.pcaList[selectAlIndex].list = res.data.data
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
			}
		},
	};
</script>

<style lang="scss">
	@import "./pca-picker.scss";

	body {
		overflow: hidden;
	}
</style>
