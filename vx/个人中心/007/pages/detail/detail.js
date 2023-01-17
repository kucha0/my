// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:'男',
    username:'老王!qwe123',
    imgUrl:'/images/avatar.jpg'
  },
  //上传头像
  changeAvatar:function(){
    wx.chooseMedia({
      camera: 'back',
      sourceType: ['album','camera'],
      count:1,
      sizeType:['original','compressed'],
      success:res=>{
        console.log(res)
        var path = res.tempFiles[0].tempFilePath
        this.setData({imgUrl:path})
      }
    })
  },
  //跳转修改信息
  jump:function(){
    wx.navigateTo({
      url: '/pages/modify/modify?username='+ encodeURIComponent(this.data.username) + '&gender='+ encodeURIComponent(this.data.gender),
    })
  }
})