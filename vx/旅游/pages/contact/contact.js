const app=getApp()
  var QQMapWX=require('../../libs/qqmap-wx-jssdk')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        src:'http://localhost:3000/11.mp4',
        currentData: 0,
        selectPerson: true,
        mapw:'100%',
        maph:'0',
        scale:'1',
        longitude:null,
        latitude:null,
        markers:null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    //获取当前滑块的index
    bindchange: function (e) {
        const that = this;
        that.setData({
            currentData: e.detail.current
        })
    },
    //点击切换，滑块index赋值
    checkCurrent: function (e) {
        const that = this;
        if (that.data.currentData === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentData: e.target.dataset.current
            })
        }
    },
    qqmapsdk:new  QQMapWX({
        key:'3C5BZ-OJ666-BWCS3-MTYZE-IHTNQ-5RFLX'
      }),
      bindRegionChange:function(e){
        if(e.type==='end'){
          this.mapCtx.getCenterLocation({
            success:res=>{
            this.getFood(res.longitude,res.latitude)
          }
          })
        }
      },
      markIndex:0,
  mapCtx:null,
  //获取窗口高度和宽度
  onLoad:function(){
    this.mapCtx=wx.createMapContext('map')
    wx.getSystemInfo({
      success: (res) => {
        var mapw=res.windowWidth
        var maph=res.windowHeight
        this.setData({
          maph:maph+'px',
          controls:[{
            id:1,
            iconPath:'/images/banner.png',
            postion:{left:0,top:10,width:mapw,height:74},
            clickable:true
          },{
          id:2,
          iconPath:'/images/gps.png',
          postion:{left:10,top:maph-50,width:40,height:40},
          clickable:true
          },{
            id:3,
            iconPath:'/images/gift.png',
            postion:{left:mapw-60,top:maph-120,width:40,height:40},
            clickable:true
            },{
              id:4,
              iconPath:'/images/cost.png',
              postion:{left:mapw-60,top:maph-50,width:40,height:40},
              clickable:true
              },
        ]
        })
      },
    })
  },
  //获取当前位置（经纬度）
  onReady:function(){
    wx.getLocation({
      type:'gcj02',
      success:res=>{
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      }
    })
  },
  getFood:function(longitude,latitude){
    this.qqmapsdk.search({
      keyword:'餐厅',
      location:{
        longitude:longitude,
        latitude:latitude
      },
      success:res=>{
        controls.log(res.data)
        var mark=[]
        //返回查找结果
        for(let i in res.data){
          mark.push({
            iconPath:'/images/food.png',
            id:1,
            latitude:res.data[i].location.lat,
            longitude:res.data[i].location.lng
          })
        }
        mark.push({
          iconPath:'/images/center.png',
          id:res.data.length,
          latitude:latitude,
          longitude:longitude
        })
        //将搜索结果显示在地图上
        this.setData({
          markers:mark
        })
      }
    })
  },
  bindControlTap:function(e){
    var id=e.controId
    if(id===1){
      wx.navigateTo({
        url: '/pages/map/map',
      })
    }else if(id===2) {
      //将地图中心移动到当前位置
      this.mapCtx.moveToLocation()
    }
  }
})