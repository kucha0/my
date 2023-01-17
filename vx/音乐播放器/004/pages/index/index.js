
Page({
  // 页面初始数据
  data:{
    
    item:0,
    //记录当前页的索引
    tab:0,
    // 播放列表
    playlist:[{
      id:1,
      title:'完美声线',
      singer:'武道',
      src:'http://localhost:3000/3.mp3',
      coverImgUrl:'/images/cover.jpg'
    },{
    id:2,
      title:'蓝莲花',
      singer:'许巍',
      src: 'http://localhost:3000/2.mp3',
      coverImgUrl:'/images/cover.jpg'
    },{
    id:3,
      title:'孤勇者',
      singer:'陈奕迅',
      src:'http://localhost:3000/1.mp3',
      coverImgUrl:'/images/cover.jpg'
    },

  ],
  state:'paused',
  playIndex:0,
  play:{
     //当前播放时长
    currentTime:"00:00",
    //总时长        
    duration:"00:00",
    //播放进度          
    percent:0,
    title:'',
    singer:'',
    coverImgUrl:'/images/cover.jpg'
  }

  },
  andioCtx:null,
  onReady:function(){
    this.audioCtx = wx.createInnerAudioContext()
    //播放失败检测
    this.audioCtx.onError(function() {
      console.log('播放失败'+this.audioCtx.src)
    })
    //自动更新播放进度
    var that = this
    this.audioCtx.onPlay(function(){})
    this.audioCtx.onTimeUpdate(function(){
      that.setData({
        'play.duration':formatTime(that.audioCtx.duration),
        'play.currentTime':formatTime(that.audioCtx.currentTime),
        'play.percent':that.audioCtx.currentTime/that.audioCtx.duration *100
      })
      // console.log(that.data.play.currentTime)
    })
    // 播放完成自动播放下一曲
    this.audioCtx.onEnded(function(){
      that.next()
    })
       

    //播放第一首音乐
    this.setMusic(0)
     // 格式化时间
     function formatTime(time){    
       //分钟
       var minute = Math.floor(time/60)%60;
       //秒钟
       var second = Math.floor(time)%60;
       return (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' +second : second)
     }
},

  //播放音乐
  setMusic:function(index){
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
    'play.title':music.title,
    'play.singer':music.singer,
    'play.coverImgUrl':music.coverImgUrl,
    'play.currentTime':'00:00',
    'play.duration':'00:00',
    'play.percent':0,
    playIndex:index
  })
},

  //播放音乐
  play:function(){
    this.audioCtx.play()
    this.setData({state:"running"})
  },
  //暂停
  pause:function(){
    this.audioCtx.pause()
    this.setData({state:"paused"})
  },
  //下一首
  next:function(){
    var index = this.data.playIndex >=this.data.playlist.length-1 ?0 :this.data.playIndex+1
    this.setMusic(index)
    if(this.data.state == 'running'){
      this.play()
      // this.audioCtx.onTimeUpdate()
    }
  },
    // 调节播放进度
    sliderChange:function(e){
      var second=e.detail.value *this.audioCtx.duration / 100
      this.audioCtx.seek(second)
      },
      //解决不调用onTimeUpdate方法
      pauseAndplay:function(){
        this.pause()
        setTimeout(() => {
          this.play()
        },500); //给延迟在播放
      },
      
  //标签页切换
  changeItem:function(e){
    this.setData({item:e.target.dataset.item})
  },
  changeTab:function(e){
    // console.log(e)
    this.setData({tab:e.detail.current})
  },
  // 播放列表中的换曲功能
  change:function(e){
    this.setMusic(e.currentTarget.dataset.index);
    this.play();
  }
})