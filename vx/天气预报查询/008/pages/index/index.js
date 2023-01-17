// index.js
// 获取应用实例
const app = getApp()
// 定义城市，天气，温度，风级，图片，日期参数
  var defaultcity,getweather,gettemp,getwind,getpic,getdate,getNightTemp,getWindD
Page({
  data:{
    city:'',
    weather:'',
    date:'',
    pic:'',
    wind:'',
    temp:''
  },
    //   // 默认城市名称
    //   onLoad: function (e) {
    //   defaultcity = '呼和浩特'
    //   this.weather()
    //   console.log(e)
    // },
  // 获取城市名称
    bindKeyInput:function(e){
      defaultcity = e.detail.value
    },

    //实现天气查询
    search:function(e){
      var apikey = 'UKZ4Gd7d274e02a113c00c46e5dd603dad1895b20fe5705'
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://api.apishop.net/common/weather/get15DaysWeatherByArea?apiKey='+apikey+'&area='+defaultcity,
        success:res=>{
          console.log(res)
          if (res.data.statusCode !=='000000') {
            wx.showToast({
              title: '天气查询失败!',
              icon:'none'
            })
            // console.log('天气查询失败!')
            wx.hideLoading()
            return
          }
          getweather = res.data.result.dayList[0].day_weather;
          gettemp = res.data.result.dayList[0].day_air_temperature;
          getNightTemp = res.data.result.dayList[0].night_air_temperature;
          getwind = res.data.result.dayList[0].day_wind_power;
          getWindD = res.data.result.dayList[0].day_wind_direction;
          getpic = res.data.result.dayList[0].day_weather_pic;
          getdate = res.data.result.dayList[0].daytime;
          this.setData({
            weather:getweather,
            temp:getNightTemp + '~' + gettemp + '℃',
            wind:getWindD + ' '+ getwind,
            pic:getpic,
            date:getdate,
            city:defaultcity
          })
          wx.hideLoading({ })
        },
        fail:res=>{
          console.log('请求失败!')
        }
      })
      
    }
})
