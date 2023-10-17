var vm;
window.onload = function() {
	vm = new Vue({
		el: '#app',
		data: {
			content: 'https://html.xinjiaoxue.cn/file/word/f7d9e3e0-c155-48e7-8d31-0c5732351081.html',
			navIndex:1
		},
		computed: {

		},
		methods: {
			conLeftNavFn(index){
				this.navIndex=index
			}
		},
		created: function() {
			
		},
		mounted() {

		}
	});
}