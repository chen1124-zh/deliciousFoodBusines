import request from './request.js'; // 引入封装好的request

// 获取订单列表
function getOrderList (data) {
	return request({
		method: "POST", // 请求方式
		url: 'order/getOrderList', // 请求url
		data: data // 参数
	})
}


// 获取店铺列表
function getStoreList (data) {
	return request({
		method: "POST", // 请求方式
		url: 'store/getStoreList', // 请求url
		data: data // 参数
	})
}


// 查询商品
function getProductList (data) {
	return request({
		method: "POST", // 请求方式
		url: 'product/getProductList', // 请求url
		data: data // 参数
	})
}


// 根据菜单获取菜单分类
function getMenuTypeList (data) {
	return request({
		method: "POST", // 请求方式
		url: 'mentType/getMenuTypeList', // 请求url
		data: data // 参数
	})
}

// 添加菜单分类
function addMenuType (data) {
	return request({
		method: "POST", // 请求方式
		url: 'mentType/addMenuType', // 请求url
		data: data // 参数
	})
}


// 删除菜单分类
function deleteMenuType (data) {
	return request({
		method: "POST", // 请求方式
		url: 'mentType/deleteMenuType', // 请求url
		data: data // 参数
	})
}


// 修改菜单分类
function updateMenuType (data) {
	return request({
		method: "POST", // 请求方式
		url: 'mentType/updateMenuType', // 请求url
		data: data // 参数
	})
}


// 新增商品
function addProduct (data) {
	return request({
		method: "POST", // 请求方式
		url: 'product/addProduct', // 请求url
		data: data // 参数
	})
}


// 新增店铺
function addStore (data) {
	return request({
		method: "POST", // 请求方式
		url: 'store/addStore ', // 请求url
		data: data // 参数
	})
}

function updateStore (data) {
	return request({
		method: "POST", // 请求方式
		url: 'store/updateStore ', // 请求url
		data: data // 参数
	})
}


// 获取销量
function selectCountProduct (data) {
	return request({
		method: "POST", // 请求方式
		url: 'order/selectCountProduct', // 请求url
		data: data // 参数
	})
}

// 商家入驻
function updateUser (data) {
	return request({
		method: "POST", // 请求方式
		url: 'user/updateUser', // 请求url
		data: data // 参数
	})
}


// 添加座位
function addSeat (data) {
	return request({
		method: "POST", // 请求方式
		url: 'seat/addSeat', // 请求url
		data: data // 参数
	})
}


// 添加座位
function getSeatList (data) {
	return request({
		method: "POST", // 请求方式
		url: 'seat/getSeatList', // 请求url
		data: data // 参数
	})
}


// 添加座位
function deleteSeat (data) {
	return request({
		method: "get", // 请求方式
		url: 'seat/deleteSeat', // 请求url
		data: data // 参数
	})
}

// 修改商品
function updateProduct (data) {
	return request({
		method: "post", // 请求方式
		url: 'product/updateProduct', // 请求url
		data: data // 参数
	})
}


// 获取今天收入
function selectDayTotal (data) {
	return request({
		method: "post", // 请求方式
		url: 'order/selectDayTotal', // 请求url
		data: data // 参数
	})
}

// 获取今天订单
function selectOrderTotal (data) {
	return request({
		method: "post", // 请求方式
		url: 'order/selectOrderTotal', // 请求url
		data: data // 参数
	})
}

// 获取就餐人数
function selectPeopleTotal (data) {
	return request({
		method: "post", // 请求方式
		url: 'order/selectPeopleTotal', // 请求url
		data: data // 参数
	})
}

// 获取累计收益
function selectAllTotal (data) {
	return request({
		method: "post", // 请求方式
		url: 'order/selectAllTotal', // 请求url
		data: data // 参数
	})
}







export default{
	getOrderList,
	getStoreList,
	getProductList,
	getMenuTypeList,
	addMenuType,
	deleteMenuType,
	updateMenuType,
	addProduct,
	addStore,
	updateStore,
	selectCountProduct,
	updateUser,
	addSeat,
	getSeatList,
	deleteSeat,
	updateProduct,
	selectDayTotal,
	selectOrderTotal,
	selectPeopleTotal,
	selectAllTotal
}