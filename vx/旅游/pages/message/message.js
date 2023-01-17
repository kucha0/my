// index.js
// 获取应用实例
const app = getApp()
// 定义城市，天气，温度，风级，图片，日期参数
  var defaultcity,getweather,gettemp,getwind,getpic,getdate
Page({
  data:{
    city:'',
    weather:'',
    date:'',
    pic:'',
    wind:'',
    temp:''
  },
    bindKeyInput:function(e){
      defaultcity = e.detail.value
    },
    //实现天气查询
    search:function(e){
      var apikey = '4NPLSQQd18119ac583b0ebeca8c1fdf732453741f945b84'
      wx.request({
        url: 'https://api.apishop.net/common/weather/get15DaysWeatherByArea?apiKey='+apikey+'&area='+defaultcity,
        success:res=>{
          console.log(res)
          if(res.data.statusCode!='000000'){
            wx.showToast({
              title: '请求失败',
            })
          }
          getweather = res.data.result.dayList[0].day_weather
          gettemp=res.data.result.dayList[0].day_air_temperature
          getwind=res.data.result.dayList[0].day_wind_power
          getpic=res.data.result.dayList[0].day_weather_pic
          getdate=res.data.result.dayList[0].daytime
          this.setData({
              weather:getweather,
              temp:'13'+'~'+gettemp+'℃',
              wind:getwind,
              pic:getpic,
              date:getdate,
              city:defaultcity
          })
        }
      })
    }
})
