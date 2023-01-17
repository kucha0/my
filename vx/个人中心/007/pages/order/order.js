// pages/order/order.js
Page({
  data:{
    no:null,            //单号
    expressInfo:null    //物流信息
  },
  //获取单号
  noInput:function(e){
    this.setData({
      no:e.detail.value
    })
  },
  //查询
  search:function(){
    var that = this
    var apikey = 'UKZ4Gd7d274e02a113c00c46e5dd603dad1895b20fe5705'
    wx.request({
      url: 'https://api.apishop.net/common/express/getExpressInfo?apiKey='+ apikey +'&expressNumber='+ this.data.no,
      method:"GET",
      success:function(res){
        console.log(res.data)
        that.setData({
          expressInfo:res.data
        })
        wx.hideLoading()
      }
    })
  }
})