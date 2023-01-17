// pages/address/address.js
Page({
  data:{
      addressInfo:null
  },
  chooseAddress:function(){
    wx.chooseAddress({
      success: (result) => {
        this.setData({
          addressInfo:result
        })
      },
    })
  }
})