// pages/preson/preson.js
Page({
  data:{
    item:0,
    tab:0,
  },
kefu:function(){
  wx.makePhoneCall({
    phoneNumber: '15247110021',
  })
}, 
dingdan:function(){
  wx.navigateTo({
    url: '/pages/order/order',
  })
},
changeItem:function(e){
this.setData({
  item:e.target.dataset.item
})
},
changeTab:function(e){
this.setData({
  tab:e.detail.current
})
}
})