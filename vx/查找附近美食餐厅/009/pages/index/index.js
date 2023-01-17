
// index.js
// 获取应用实例
const app = getApp()
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  data: {
    mapW: '100%',
    map: '0',
    scale: '18',
    longitude: 'null',
    latitude: 'null',
    markers: 'null'
  },

  mapCtx:null,
  onLoad: function () {
    this.mapCtx = wx.createMapContext('map')
    wx.getSystemInfo({
      success: (result) => {
        // console.log(result)
        var mapW = result.windowWidth
        var mapH = result.windowHeight
        this.setData({
          mapH: mapH + 'px',
          controls: [{
            id: 1,
            iconPath: '/images/banner.png',
            position: {
              left: 0,
              top: 10,
              width: mapW,
              height: 74
            },
            clickable: true
          }, {
            id: 2,
            iconPath: '/images/gps.png',
            position: {
              left: 10,
              top: mapH - 50,
              width: 40,
              height: 40
            },
            clickable: true
          }, {
            id: 3,
            iconPath: '/images/gift.png',
            position: {
              left: mapW - 60,
              top: mapH - 120,
              width: 40,
              height: 40
            },
            clickable: true
          }, {
            id: 4,
            iconPath: '/images/cost.png',
            position: {
              left: mapW - 60,
              top: mapH - 50,
              width: 40,
              height: 40
            },
            clickable: true
          }]
        })
        // console.log(this.data.controls[0])
      },
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'T4KBZ-G4BLU-HZKV7-2WBQN-HS6BV-WIB3S'
    })
  },
  //获取当前位置
  onReady: function () {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        // console.log(res)
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      }
    })
  },
  onShow: function () {
    // 调用接口
    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  //查找附近的美食餐厅
  getFood:function(longitude,latitude){
      qqmapsdk.search({
      keyword: '餐厅',
      location:{
        longitude:longitude,
        latitude:latitude
      },
      success: res=>{
        console.log(res.data)
        var mark = []
        //返回查找结果
        for (let i in res.data){
          mark.push({
            id:Number(i),
            latitude:res.data[i].location.lat,
            longitude:res.data[i].location.lng,
            iconPath:'/images/food.png',
            // width:32,
            // height:32
          })
        }
        mark.push({
          iconPath:'/images/center.png',
          id:Number(res.data.length),
          latitude:latitude,
          longitude:longitude,
          // width:18,
          // height:50

        })
        //将搜索结果显示在地图上
        this.setData({
          markers:mark
        })
    }
    })
  },
  bindRegionchange:function(e){
    // console.log(e)
    if (e.type === 'end') {
      //获取地图此时的中心点
      this.mapCtx.getCenterLocation({
        success: res=>{
          this.getFood(res.longitude,res.latitude)
        }
      })
    }
  },
  //领券跳转
  bindBannerTap:function(e){
      wx.navigateTo({
        url: '/pages/coupon/coupon'
      })
  },
  //回到中心点
  bindGpsTap: function(){
    //将地图中心移到当前定位点
    this.mapCtx.moveToLocation()
  }
})




