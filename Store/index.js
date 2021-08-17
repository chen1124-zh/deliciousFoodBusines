import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		Navigation:{
			top:0,
			height:0
		}
	},
	getters:{
		getNavigation:(state)=>{
			return state.Navigation
		}
	},
    mutations: {
		setNavigation(state,NavigationData){
			
			state.Navigation = NavigationData
		}
	},
    actions: {}
})
export default store