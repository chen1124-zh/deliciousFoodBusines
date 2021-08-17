<script>
	export default {
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.$store.commit('setNavigation',demo)
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	
</style>
