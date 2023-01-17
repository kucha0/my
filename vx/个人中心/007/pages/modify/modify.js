// pages/modify/modify.js
Page({
  data:{
    username:'',
    gender:'男'
  },
  onLoad(options) {
    this.setData({username:decodeURIComponent(options.username),gender:decodeURIComponent(options.gender)})
  },
  //保存修改数据
  formSubmit:function(e){
    var formData = e.detail.value
    var pages = getCurrentPages()               //获取当前页面栈
    var prevPage = pages[pages.length-2]        //获取上一个页面对象
    prevPage.setData({
      username:formData.username,
      gender:formData.gender
    })
    //返回上一个页面
    wx.navigateBack()
  }
})