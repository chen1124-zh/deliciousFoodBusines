<template>
	<view class="mask">
		<view class="pca-picker-box" @tap.stop>
			<view class="addrses4">
				<view :class="['addrses4-1', showType == '0' ? 'actvieColor' : '']" @tap.stop="onclickselect('0')">
					中国大陆
				</view>
				<view :class="['addrses4-1', showType == '1' ? 'actvieColor' : '']" @tap.stop="onclickselect('1')">
					港澳台及海外
				</view>
			</view>
			
			<view class="select-al-box">
				<view class="select-al-item">
					省份
					<text class="items actives"></text>
				</view>
				
				<view class="select-al-item">
					城市
					<text class="items actives"></text>
				</view>
				
				
				<view class="select-al-item">
					区县
					<text class="items actives"></text>
				</view>
				
				
				<view class="select-al-item">
					镇/街道
					<text class="items actives"></text>
				</view>
				
				<view class="select-al-item">
					村/社区
					<text class="items actives"></text>
				</view>
			</view>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			<view class="select-al-box" v-show="showType == '0'">
				<text v-for="(item, index) in selectAlList" :index="item.title" :style="{ width: itemWidth + '%' }" class="select-al-item"
				 :key="index" @tap="selectAl(index, item)">
					{{ item.title }}
					<text class="itmes" :class="{ actives: selectAlIndex === index }"></text>
				</text>
			</view>
			<view class="bodersss"></view>
			<swiper class="swiper-box" @change="selectAl" :current="currentIndex" :style="{
          height:
            showType == '0' ? 'calc(100vh - 320rpx)' : 'calc(100vh - 240rpx)',
        }">
				<swiper-item v-for="(item, index) in pcaList" :index="index" :key="index">
					<scroll-view :scroll-into-view="'id' + item.target" class="adress-item" scroll-y="true">
						<view v-for="(it, inx) in item.list" :index="it.code" :key="inx" :id="'id' + it.code" class="item" :class="{ active: inx === item.selectIndex }"
						 @tap="selectAddress(it, inx, index)"  v-if="it.orgId != '0'">
							<text class="iconfont icon-dagou-copy-copy">{{
                it.orgName
              }}</text>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 选择区域 -->
		<view class="picker-head" @tap.stop="queren2" v-if="showBtnType == '0'">
			确认
		</view>
		<!-- 设置家乡 -->
		<view class="picker-head" @tap.stop="queren" v-if="showBtnType == null">
			确认
		</view>
		<!-- 每个层级都有按钮 -->
		<view class="picker-head" @tap.stop="onClickConfirm" v-if="showBtnType == '3'">
			确认
		</view>
		<!-- 所选区域默认显示再最一级 -->
		<view class="picker-head" @tap.stop="queren3" v-if="(showBtnType == '2' && showBtn)">
			确认
		</view>

		<!-- 申请区域管理员 返回省市区五级 居住地址 -->
		<view class="picker-head" @tap.stop="queren4" v-if="showBtnType == '1' && showBtn">
			确认
		</view>


	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	// import http from './pca-http.js';
	let timmer = null;
	let limitRegionNum = {
		province: 1,
		city: 2,
		area: 3,
		street: 4,
		village: 5,
		// group: 6
	};
	let selectAlList = [{
			title: '省份'
		},
		{
			title: '城市'
		}, {
			title: '区县'
		}, {
			title: '镇/街道'
		}, {
			title: '村/社区'
		},
		//  {
		// 	title: '村组/小区'
		// }
	]
	function promiseContainer(fn, callback) {
		return new Promise((resolve, reject) => {
			fn(resolve, callback);
		});
	}
	export default {
		props: {
			active: {
				//是否显示激活
				type: Boolean,
				default: false,
			},
			defaultValue: {
				//默认省市区值
				type: Object,
				default () {
					return {
						provinceCode: "", //省code
						citiesCode: "", //市code
						areasCode: "", //区code
						streetsCode: "", //街道code
						villagesCode: "", //村code
						// villageGroupCode: '' // 村组code
					};
				},
			},
			limitRegion: {
				type: String,
				default: "group",
			},
		},
		data() {
			return {
				showType: "0", // 选择国内 国外高亮
				itemWidth: 20,
				show: false,
				showBtn: false,
				//省市区列表
				pcaList: [{
					selectIndex: -1,
					target: "",
					list: [],
				},{
					selectIndex: -1,
					target: "",
					list: [],
				},{
					selectIndex: -1,
					target: "",
					list: [],
				},{
					selectIndex: -1,
					target: "",
					list: [],
				},{
					selectIndex: -1,
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
				currentIndex: 0,
				names: "",
				addris: "",
				showBtnType: null,
				selectArr:[],
				orgId: null,
				showTypeAddress: null
			};
		},
		created() {
			this.init();
			this.limitMappingNum = limitRegionNum[this.limitRegion] || 5;
			this.itemWidth = Math.floor(100 / this.limitMappingNum);
		},
		onLoad(options) {
			console.log(options, "============options==========");
			if (!!options.title) {
				uni.setNavigationBarTitle({
					title: options.title,
				})
			}
			let that = this;
			this.showBtnType = options.type;
			if (!!options.orgIdData) {
				this.orgId = options.orgIdData;
			}
			// 判断国外1  国内0
			let showType = uni.getStorageSync('showType');
			if(!!showType) {
				this.showType = showType;
				if(this.showType == '1') {
					this.onclickselect(this.showType); 
				}
			}
			// 国内
			if (options.type == "0" && this.showType == '0') {
				this.isGetProvinceCity();
			}
			if (options.showIndex) {
				this.showTypeAddress = options.showIndex;
			}
		

		},
		destroyed() {
			clearTimeout(timmer);
		},
		computed: {
			actives: {
				get() {
					if (this.active) {
						timmer = setTimeout(() => {
							this.show = true;
						}, 100);
					}
					return this.active;
				},
				set(newVal) {
					this.$emit("update:active", newVal);
				},
			},
		},
		watch: {
			defaultValue() {
				this.init();
			},
			limitRegion(val) {
				this.limitMappingNum = limitRegionNum[this.limitRegion] || 5;
				this.itemWidth = Math.floor(100 / this.limitMappingNum);
			},
		},
		methods: {
			...mapMutations(["publicPost"]),
			/**
			 * 获取回显id
			 */
			isGetProvinceCity() {
				let that = this;
				let arr2 = [];
				let arr3 = [];
				const objBVW003 = {
					url: "",
					data: {
						body: {
							transCode: "BVW003",
							operFlag: "2",
							orgId: that.orgId,
						},
					},
					success(res) {
						console.log(res.body.list);
						
						that.$nextTick(function() {
							res.body.list.forEach((item, index) => {
								item.title = item.orgName;
							});

							let arr = that.quicksort(res.body.list);
							that.selectArr=arr;
							// 赋值回显栏
							arr2 = arr.map(item => {return item});
							arr3 = arr.map(item => {return item});
							let	arrClone = that.deepClone(arr);
							let	arrClone3 = that.deepClone(arr);
							arr2[0].pid_orgId = '0';
							arr2[1].pid_orgId = arrClone[0].orgId;
							arr2[2].pid_orgId = arrClone[1].orgId;
							arr2[3].pid_orgId = arrClone[2].orgId;
							that.selectAlList = arr2;
							
							if (that.selectAlList.length < 5) {
								that.selectAlList.push({
											title: "村/社区",
											brclvl: "5",
											orgId: "",
											pid_orgId: arrClone[3].orgId,
											orgName: ""
										});
							}
							arr3[0].pid_orgId = '0';
							arr3[1].pid_orgId = arrClone3[0].orgId;
							arr3[2].pid_orgId = arrClone3[1].orgId;
							arr3[3].pid_orgId = arrClone3[2].orgId;
							
							arr3.forEach((item, index) => {
									if (arr3.length-1 == 4) {
										if (index < arr3.length-1) {
										  that.isGetAllData(index, arr3[index]);
										}
									} else {
										that.isGetAllData(index, arr3[index]);
									}
									
							});
						});
					},
				};
				that.publicPost(objBVW003);
			},
			// 深克隆
			deepClone(obj){
					let that = this;
					// 过滤特殊情况
					if(obj === null) return obj;
					if(typeof obj !== 'object') return obj;
					if(obj instanceof RegExp){
						return new RegExp(obj);
					}
					if(obj instanceof Date){
						return new Date(obj);
					}
					if(obj instanceof Function){
						return new Function(obj);
					}
			
					//不直接创建空对象的目的：使克隆出来的对象跟原对象是相同的类
					let newObj = new obj.constructor;
					for( let key in obj) {
						if(obj.hasOwnProperty(key)){
							newObj[key] = that.deepClone(obj[key]);
						}
					}
			
					return newObj;
				},
			
			// 快排
			quicksort(arr) {
				let that = this;
				if (arr.length < 2) {
					return arr;
				} else {
					let pivot = arr[0];
					let less = arr.slice(1).filter(function(value, index) {
						return parseFloat(value.brclvl) <= parseFloat(pivot.brclvl);
					});
					let greater = arr.slice(1).filter(function(value, index) {
						return parseFloat(value.brclvl) > parseFloat(pivot.brclvl);
					});
			
					return [...that.quicksort(less), pivot, ...that.quicksort(greater)];
				}
			},
			/*
			* 回显获取参数
			* index 下标
			* orgId 每一级id
			* itemA 区县
			* itemB 镇街道
			*/ 
			isGetAllData( index,itemA) {
				const that = this;
				const obj = {
					url: "",
					data: {
						body: {
							transCode: "BVW003",
							fid: itemA.pid_orgId,
						},
					},
					success(res) {
							that.$nextTick(function() {
								that.selectAlIndex = 3;
								that.currentIndex = 3;
								res.body.list.forEach((item, key) => {
										if(parseFloat(item.orgId)  == parseFloat(itemA.orgId)) {
												that.pcaList[index] = {
													selectIndex: key,
													target: "",
													list: res.body.list,
												}
												that.$set(that.pcaList, index, {
													selectIndex: key,
													target: "",
													list: res.body.list,
												});
										}
								})
								if(that.$store.state.applyAdministrators == '0') {
									that.names = itemA.orgId;
									that.addris = itemA.orgName;
								}
							})
					},
				};
				that.publicPost(obj);
			},
			onclickselect(type) {
				this.showType = type;
				uni.setStorageSync('showType', type);
				this.selectAlList = [{
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
				];
				this.selectAlIndex = 0;
				if (type == "1") {
					this.showBtn = true;
					this.getForeignCountry(type);
				} else {
					this.showBtn = false;
					this.getAllProvinces();
				}
			},
			/**
			 * 方法说明
			 * description: 根据传进来的默认code设置值
			 * @param
			 * @return
			 */
			async init() {
				let {
					provinceCode,
					citiesCode,
					areasCode,
					streetsCode,
					villagesCode,
					// villageGroupCode
				} = this.defaultValue;
				let set = (index, key) => {
					this.pcaList[index].selectIndex = this.pcaList[index].list.findIndex(
						(i) => {
							if (i.code === key) {
								this.setAlList(index, i.name);
								return true;
							}
						}
					);
				};
				await this.getAllProvinces();
				if (!provinceCode) return;
				set(0, provinceCode);
				if (this.limitMappingNum <= 1) return;
				await this.getAllCities();
				if (!citiesCode) return;
				set(1, citiesCode);
				if (this.limitMappingNum <= 2) return;
				await this.getAllAreas();
				if (!areasCode) return;
				set(2, areasCode);
				if (this.limitMappingNum <= 3) return;
				await this.getAllStreets();
				if (!streetsCode) return;
				set(3, streetsCode);
				if (this.limitMappingNum <= 4) return;
				await this.getAllVillages();
				if (!villagesCode) return;
				set(4, villagesCode);
				// if (this.limitMappingNum <= 5) return;
				// await this.getAllVillageGroup();
				// if (!villageGroupCode) return;
				// set(5, villageGroupCode);
			},
			/**
			 * 方法说明
			 * description: 关闭picker
			 * @param
			 * @return
			 */
			close() {
				this.show = false;
				timmer = setTimeout(() => {
					this.actives = false;
				}, 300);
			},
			/**
			 * 方法说明
			 * description: 获取外国，广澳台数据
			 * @param
			 * @return
			 */
			getForeignCountry() {
				return promiseContainer((resolve, callback) => {
					const that = this;
					const obj = {
						url: "",
						data: {
							body: {
								transCode: "BVW003",
								fid: "1",
							},
						},
						success(res) {
							that.pcaList.splice(1, 4);
							that.pcaList = [{
								selectIndex: -1,
								target: "",
								list: res.body.list,
							}, ];
							callback && callback(res.body);
							resolve();
						},
					};
					that.publicPost(obj);
				});
			},
			/**
			 * 方法说明
			 * description: 获取省份
			 * @param
			 * @return
			 */
			getAllProvinces() {
				return promiseContainer((resolve, callback) => {
					// http.init({
					// 	url: '/address/getAllProvinces',
					// 	method: 'get'
					// }).success(res => {
					// 	console.log(res)
					// 	this.pcaList[0].list = res.data;
					// 	callback && callback(res);
					// 	resolve();
					// });
					const that = this;
					const obj = {
						url: "",
						data: {
							body: {
								transCode: "BVW003",
								fid: "0",
							},
						},
						success(res) {
							that.pcaList[0].list = res.body.list;
							// res.body.list.forEach((item,key) => {
							// 	if(item.orgId == that.selectArr[0].orgId){
							// 	}	
							// })
							callback && callback(res.body);
							resolve();
						},
					};
					that.publicPost(obj);
				});
			},
			queren2() {
				let that = this;
				let arr = [];
				
				that.pcaList.forEach((element, index) => {
					if (element.selectIndex > -1) {
						arr.push(element.list[element.selectIndex]);
					}
				});
				uni.setStorageSync("selectarr2", JSON.stringify(arr));

				uni.navigateBack({
						delta: 1,
				});
			},

			onClickConfirm () {
				let that = this;
				let arr = [];
				
				that.pcaList.forEach((element, index) => {
					if (element.selectIndex > -1) {
						arr.push(element.list[element.selectIndex]);
					}
				});
				uni.setStorageSync("confirmData", JSON.stringify(arr));

				uni.navigateBack({
						delta: 1,
				});
			},
			/**
			* @description: 选择所在地区，最后一级才显示按钮
			* @param {*}
			* @return {*}
			*/
			queren3() {
				let that = this;
				let arr = [];
				if (that.showType == '0') {
					if (that.pcaList[4].selectIndex == -1) {
					uni.showToast({
										icon: "none",
										title: "请选择村/社区",
									});
					return false;
				}
				}
				
				that.pcaList.forEach((element, index) => {
					if (element.selectIndex > -1) {
						arr.push(element.list[element.selectIndex]);
					}
				});
				
				console.log(arr, '=========that.pcaList=======');
				
					uni.setStorageSync("shrz_address", JSON.stringify(arr));
				
			
				uni.navigateBack({
						delta: 1,
				});
			},
			/**
			* @description: 选择所在地区，最后一级才显示按钮
			* @param {*}
			* @return {*}
			*/
			queren4() {
				let that = this;
				let arr = [];
				if (that.showType == '0') {
					if (that.pcaList[4].selectIndex == -1) {
					uni.showToast({
										icon: "none",
										title: "请选择村/社区",
									});
					return false;
				}
				}
				that.pcaList.forEach((element, index) => {
					if (element.selectIndex > -1) {
						arr.push(element.list[element.selectIndex]);
					}
				});
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				if (!!that.showTypeAddress) {
					prevPage.$vm.showTypeAddress = that.showTypeAddress;
				}
				uni.setStorageSync("selectarr4", JSON.stringify(arr));
				uni.navigateBack({
						delta: 1,
				});
			},

			queren() {
				const that = this;
				if (this.names == "") {
					 	uni.showToast({
										icon: "none",
										title: "请先选择区域",
									});
									return;
				}
				const obj = {
					url: "",
					data: {
						body: {
							transCode: "BVW013",
							orgId: this.names,
						},
					},
					success(res) {
						console.log(res);
						const objs = {
							url: "",
							data: {
								body: {
									transCode: "BVW014",
									orgId: that.names,
								},
							},
							success(res) {
								let arr = [];
								that.pcaList.forEach((element, index) => {
									if (element.selectIndex > -1) {
										arr.push(element.list[element.selectIndex]);
									}
								});
								console.log(arr, '=========that.pcaList=======');
							 if(that.$store.state.applyAdministrators == '0') {
									uni.setStorageSync("selectarr", JSON.stringify(arr));
									uni.showToast({
										icon: "none",
										title: res.head.msgMsg,
									});
								}
								
								
								// 判断全国
								if (res.body.status == "1" || that.names == "0") {
									that.$store.state.orgId = that.names;
									that.$store.state.orgName = that.addris;
									const value = uni.getStorageSync("storeObj");
									var values = JSON.parse(value);
									values.orgId = that.names;
									values.orgName = that.addris;
									uni.setStorage({
										key: "storeObj",
										data: JSON.stringify(values),
									});
								}
								if (res.body.status == "0") {
									let pages = getCurrentPages(); //获取所有页面栈实例列表
									let nowPage = pages[pages.length - 1]; //当前页页面实例
									let prevPage = pages[pages.length - 2]; //上一页页面实例
									prevPage.$vm.posts = 2;
									prevPage.$vm.addris = that.addris;
									prevPage.$vm.hometown = that.addris;
									that.$store.state.orgid = that.names;
									that.$store.state.orgName = that.addris;
									const value = uni.getStorageSync("storeObj");
									var values = JSON.parse(value);
									values.orgId = that.names;
									values.orgName = that.addris;

									uni.setStorage({
										key: "storeObj",
										data: JSON.stringify(values),
									});

									uni.navigateBack({
										delta: 1,
									});
								} else {
									let pages = getCurrentPages(); //获取所有页面栈实例列表
									let nowPage = pages[pages.length - 1]; //当前页页面实例
									let prevPage = pages[pages.length - 2]; //上一页页面实例
									prevPage.$vm.posts = 0;
									try {
										const value = uni.getStorageSync("storeObj");
										var values = JSON.parse(value);
										if (values) {
											values.orgId = that.names;

											uni.setStorage({
												key: "storeObj",
												data: JSON.stringify(values),
											});
											that.$store.state.orgid = that.names;
											uni.navigateBack({
												delta: 1,
											});
										}
									} catch (e) {
										//TODO handle the exception
									}
								}
							},
						};
						that.publicPost(objs);
					},
				};
				that.publicPost(obj);
			},
			/**
			 * 方法说明
			 * description: 获取市
			 * @param
			 * @return
			 */
			getAllCities(e, selectAlIndex) {
				return promiseContainer((resolve, callback) => {
					let {
						selectIndex,
						list
					} = this.pcaList[0];
					// http.init({
					// 	url: '/address/getAllCities',
					// 	method: 'get',
					// 	data: {
					// 		provinceCode: list[selectIndex].code
					// 	}
					// }).success(res => {
					// 	this.pcaList.splice(1, 4, {
					// 		selectIndex: -1,
					// 		target: '',
					// 		list: res.data
					// 	});
					// 	this.switchSwiper(1);
					// 	callback && callback(res);
					// 	resolve();
					// });
					const that = this;
					const obj = {
						url: "",
						data: {
							body: {
								transCode: "BVW003",
								fid: e,
							},
						},
						success(res) {
							this.selectAlIndex = selectAlIndex;
							that.pcaList.splice(1, 5, {
								selectIndex: -1,
								target: "",
								list: res.body.list,
							});
							that.switchSwiper(1);
							callback && callback(res.body);
							resolve();
						},
					};
					that.publicPost(obj);
				});
			},
			/**
			 * 方法说明
			 * description: 获取区
			 * @param
			 * @return
			 */
			getAllAreas(e, selectAlIndex) {
				return promiseContainer((resolve, callback) => {
					let {
						selectIndex,
						list
					} = this.pcaList[1];
					// http.init({
					// 	url: '/address/getAllAreas',
					// 	method: 'get',
					// 	data: {
					// 		citiesCode: list[selectIndex].code
					// 	}
					// }).success(res => {
					// 	this.pcaList.splice(2, 3, {
					// 		selectIndex: -1,
					// 		target: '',
					// 		list: res.data
					// 	});
					// 	this.switchSwiper(2);
					// 	callback && callback(res);
					// 	resolve();
					// });
					const that = this;
					const obj = {
						url: "",
						data: {
							body: {
								transCode: "BVW003",
								fid: e,
							},
						},
						success(res) {
							this.selectAlIndex = selectAlIndex;
							that.pcaList.splice(2, 4, {
								selectIndex: -1,
								target: "",
								list: res.body.list,
							});
							that.switchSwiper(2);
							callback && callback(res.body);
							resolve();
						},
					};
					that.publicPost(obj);
				});
			},
			/**
			 * 方法说明
			 * description: 获取街道
			 * @param
			 * @return
			 */
			getAllStreets(e, selectAlIndex) {
				return promiseContainer((resolve, callback) => {
					let {
						selectIndex,
						list
					} = this.pcaList[2];
					// http.init({
					// 	url: '/address/getAllStreets',
					// 	method: 'get',
					// 	data: {
					// 		areasCode: list[selectIndex].code
					// 	}
					// }).success(res => {
					// 	this.pcaList.splice(3, 2, {
					// 		selectIndex: -1,
					// 		target: '',
					// 		list: res.data
					// 	});
					// 	this.switchSwiper(3);
					// 	callback && callback(res);
					// 	resolve();
					// });
					const that = this;
					const obj = {
						url: "",
						data: {
							body: {
								transCode: "BVW003",
								fid: e,
							},
						},
						success(res) {
							this.selectAlIndex = selectAlIndex;
							that.pcaList.splice(3, 3, {
								selectIndex: -1,
								target: "",
								list: res.body.list,
							});
							that.switchSwiper(3);
							callback && callback(res.body);
							resolve();
						},
					};
					that.publicPost(obj);
				});
			},
			/**
			 * 方法说明
			 * description: 获取村
			 * @param
			 * @return
			 */
			getAllVillages(e, selectAlIndex) {
				return promiseContainer((resolve, callback) => {
					let {
						selectIndex,
						list
					} = this.pcaList[3];
					const that = this;
					const obj = {
						url: "",
						data: {
							body: {
								transCode: "BVW003",
								fid: e,
							},
						},
						success(res) {
							this.selectAlIndex = selectAlIndex;
							that.showBtn = true;
							that.pcaList.splice(4, 2, {
								selectIndex: -1,
								target: "",
								list: res.body.list,
							});
							that.switchSwiper(4);
							callback && callback(res.body);
							resolve();
						},
					};
					that.publicPost(obj);
				});
			},
			/**
			 * 方法说明
			 * description: 获取村组
			 * @param
			 * @return
			 */
			getAllVillageGroup(e, selectAlIndex) {
				return promiseContainer((resolve, callback) => {
					let {
						selectIndex,
						list
					} = this.pcaList[4];
					const that = this;
					const obj = {
						url: "",
						data: {
							body: {
								transCode: "BVW003",
								fid: e,
							},
						},
						success(res) {
							if (res.body.list.length > 0) {
								this.selectAlIndex = selectAlIndex;
								that.pcaList.splice(5, 1, {
									selectIndex: -1,
									target: "",
									list: res.body.list,
								});
								that.switchSwiper(5);
							} else {
								that.selectAlList[5].title = "村组/小区";
								console.log(that.selectAlList, "this.selectAlList====");
								uni.showToast({
									title: "暂无村组、小区",
									icon: "none",
								});
							}

							callback && callback(res.body);
							resolve();
						},
					};
					that.publicPost(obj);
				});
			},

			selectAl(index,item) {
				console.log(index, item);
					if (index > this.pcaList.length-1) return console.log('不可以点哦');
				let that = this;
				if (typeof index === "object") {
					let {
						detail: {
							current
						},
					} = index;
					index = current;
				
				}
				this.selectAlList.forEach((element, key) => {
					if (key > index ) {
						element.title = selectAlList[key].title; 
					   this.pcaList.splice(key, this.pcaList.length-1); // 切换轮播图删除多的参数
					}
				});
					if (typeof index == 'number' && item != undefined) {
						if (!!item.orgName&&!!item.orgId) {
							
						}
					}
				
				if (that.showType == "0") {
					that.selectAlIndex = index;
					that.switchSwiper(index);
				}
				// 赋值最新内容
				if (this.pcaList[index]['selectIndex'] > -1) {
					this.names = this.pcaList[index].list[this.pcaList[index]['selectIndex']].orgId;
					this.addris = this.pcaList[index].list[this.pcaList[index]['selectIndex']].orgName;
				}
				if (this.pcaList.length == 5) {
					this.showBtn = true;
				} else {
					this.showBtn = false;
				}
			},
			/**
			 * 方法说明
			 * description: 切换轮播图触发事件
			 * @param index
			 * @return
			 */
			switchSwiper(index) {
				this.$nextTick(() => {
					let {
						selectIndex,
						list
					} = this.pcaList[index];
					if (~selectIndex) {
						let setTarget = this.pcaList[index];
						setTarget.target = "";
						this.$nextTick(() => {
							setTarget.target = list[selectIndex].code;
						});
					}
					
					this.currentIndex = index;
				});
			},
			/**
			 * 方法说明
			 * description: 选择完省市区触发change事件，将值传给parent
			 * @param
			 * @return
			 */
			submit() {
				let result = this.pcaList.map((item) => {
					let {
						selectIndex,
						list
					} = item;
					return {
						code: list[selectIndex].code,
						name: list[selectIndex].name,
					};
				});
				this.$emit("change", result);
			},
			setAlList(typeIndex, title) {
				this.selectAlList[typeIndex].title = title;
			},
			/**
			 * item 省市区 列表的参数
			 * index 列里面，点击当前标题下标
			 * typeIndex  当前列下标
			 */
			selectAddress(item, index, typeIndex) {
				this.names = item.orgId;
				this.pcaList[typeIndex].selectIndex = index;
				this.addris = item.orgName;
				if (item.orgId == "0") {
					console.log(item.orgId, "=======item.orgId========");
					uni.showToast({
						title: "全国",
						icon: "none",
					});
					return;
				}
				this.setAlList(typeIndex, item.orgName);
				let selectAlIndex = typeIndex + 1;
				if (this.showType == "0") {
					switch (typeIndex) {
						case 0:
							if (this.limitMappingNum >= 2) {
								this.getAllCities(item.orgId, selectAlIndex);
							} else {
								this.submit();
								this.close();
							}
							break;
						case 1:
							if (this.limitMappingNum >= 3) {
								this.getAllAreas(item.orgId, selectAlIndex);
							} else {
								this.submit();
								this.close();
							}
							break;
						case 2:
							if (this.limitMappingNum >= 4) {
								this.getAllStreets(item.orgId, selectAlIndex);
							} else {
								this.submit();
								this.close();
							}
							break;
						case 3:
							if (this.limitMappingNum >= 5) {
								this.getAllVillages(item.orgId, selectAlIndex);
							} else {
								this.submit();
								this.close();
							}
							break;
							// case 4:
							// 	if (this.limitMappingNum >= 6) {
							// 		this.getAllVillageGroup(item.orgId, selectAlIndex);
							// 	} else {
							// 		this.submit();
							// 		this.close();
							// 	}
							// 	break;
						case 4:
							this.submit();
							this.close();
							break;
					}
				}
			},
		},
	};
</script>

<style lang="scss">
	@import "./pca-picker.scss";

	body {
		overflow: hidden;
	}
</style>
