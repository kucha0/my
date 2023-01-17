// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //跳转个人资料
  info:function(){
    // wx.reLaunch({
    //   url: '/pages/detail/detail',
    // })
    // wx.redirectTo({
    //   url: '/pages/detail/detail',
    // })
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  //跳转物流查询
    order:function(){
      wx.navigateTo({
        url: '/pages/order/order',
      })
  },
  //跳转收货地址
  address:function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  //联系客服
  contact:function(){
    wx.makePhoneCall({
      phoneNumber: '400-123',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})