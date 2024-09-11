/**
    1:歌曲搜索接口
      请求地址:https://autumnfish.cn/search
      请求方法:get
      请求参数:keywords(查询关键字)
      响应内容:歌曲搜索结果
	
	2:歌曲url获取接口
	  请求地址:https://autumnfish.cn/song/url
	  请求方法:get
	  请求参数:id(歌曲id)
	  响应内容:歌曲url地址
	  
	3.歌曲详情获取
	  请求地址:https://autumnfish.cn/song/detail
	  请求方法:get
	  请求参数:ids(歌曲id)
	  响应内容:歌曲详情(包括封面信息)
	  
	4.热门评论获取
	  请求地址:https://autumnfish.cn/comment/hot?type=0
	  请求方法:get
	  请求参数:id(歌曲id,地址中的type固定为0)
	  响应内容:歌曲的热门评论
	  
	5.mv地址获取
	  请求地址:https://autumnfish.cn/mv/url
	  请求方法:get
	  请求参数:id(mvid,为0表示没有mv)
	  响应内容:mv的地址
	  
 */

var app = new Vue({
	el:"#player",
	data:{
		keywords:'',		//搜索关键词
		musicList:[],		//搜索结果音乐列表
		musicUrl:'',		//音乐地址
		musicCover:'',		//音乐封面图片
		musicHotComments:[],//歌曲热门评论
		isPlaying:false,	//歌曲是否播放
		
		maskIsShow:false,	//播放mv时的遮罩层显示状态
		mvUrl:'',			//mv的地址
	},
	methods:{
		
		//通过关键词搜索音乐
		searchMusic:function(){
			var that = this;
			axios.get("https://autumnfish.cn/search?keywords=" + this.keywords).then(
				function(response){
					console.log(response.data.result.songs);
					that.musicList = response.data.result.songs;
				},
				function(err){}
			)
		},
		
		//歌曲播放
		playMusic:function(musicId){
			var that = this;
			
			//获取歌曲地址
			axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
				function(response){
					// console.log(response.data.data[0]);
					that.musicUrl = response.data.data[0].url;
				},
				function(err){}
			)
			
			//获取封面
			axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
				function(response){
					// console.log(response.data.songs[0].al.picUrl);
					that.musicCover = response.data.songs[0].al.picUrl;
				},
				function(err){}
			)
			
			//
			axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
				function(response){
					// console.log(response.data.hotComments);
					that.musicHotComments = response.data.hotComments;
				},
				function(err){}
			)
		},
		
		//歌曲正在播放
		play:function(){
			// console.log('play');
			this.isPlaying = true;
		},
		
		//暂定播放
		pause:function(){
			// console.log('pause');
			this.isPlaying = false;
		},
		
		//mv播放
		playMv:function(mvid){
			var that = this;
			axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
				function(response){
					// console.log(response.data.data.url);
					that.maskIsShow = true;
					that.mvUrl = response.data.data.url;
				},
				function(err){}
			)
		},
		
		maskHide:function(){
			this.maskIsShow = false;
		}
		
	}
})