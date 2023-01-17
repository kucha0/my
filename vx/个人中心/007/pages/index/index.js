// index.js
// 获取应用实例
const app = getApp()

Page({
  changeImage:function(){
    // wx.switchTab({
    //   url: '/pages/person/person',
    // })
    wx.reLaunch({
      url: '/pages/person/person',
    })
  }
})
