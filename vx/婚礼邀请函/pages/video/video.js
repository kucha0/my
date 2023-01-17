// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [{
      create_time: 1532519754589,
      title: '海边随拍',
      src: 'http://localhost:3000/1.mp4'

    }, {
      create_time: 1532519777690,
      title: '勿忘心安',
      src: 'http://localhost:3000/1.mp4'

    }, {
      create_time: 1532519734589,
      title: '点滴记忆',
      src: 'http://localhost:3000/1.mp4'
    }]
  },
  onReady:function(){
    const TxvContext = requirePlugin('tencentvideo')
    var txvContext = TxvContext.getTxvContext('txv1')
    txvContext.play()
  }
  
})