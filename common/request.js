const commoneUrl = "http://127.0.0.1:8080/";


const request = (config) => {
	// 处理 apiUrl
	config.url = commoneUrl + config.url;
	if(!config.data){
		config.data = {};
	}
	console.log('config',config)
	// var token = uni.getStorageSync('token')
	
	// if(token == ''){
	// 	config.header = {
	// 		'content-type':'application/json'
	// 	}
	// }else{
	// 	config.header = {
	// 		'content-type':'application/json',
	// 		'token':token
	// 	}
	// }
	
	
	
	let promise = new Promise(function(resolve, reject) {
		uni.request(config).then(responses => {
			// 异常
			if (responses[0]) {
				console.log('responses',1)
				reject({message : "网络超时"});
			} else {
				let response = responses[1].data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res,这样只返回一个data
				resolve(response);
			}
		}).catch(error => {
			console.log('error',error)
			reject(error);
		})
	})
	return promise;
};

export default request;
