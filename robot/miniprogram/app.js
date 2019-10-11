//app.js
App({
  onLaunch: function () {

    var logs = wx.getStorageSync('logs') || [];     //调用API从本地缓存中获取数据
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);    //存入缓存
    /*wx.getSetting({//授权检测
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum', 'scope.userInfo']) {
          console.log("开始判断有没有授权", res)
          wx.redirectTo({
            url: '/pages/authorize/authorize'
          })
        }
      }
    })*/
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      wx.login({      //调用登录接口
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          })
        }
      })
    }
  },
  //全局变量
  globalData:{
    api:{
      showApi:{
        appId: 106229,
        sign:'18d042569e5e44d29e3cb8933f6b3785',
        path:{
            joke:"https://route.showapi.com/341-5",
            joke_img:"https://route.showapi.com/341-4",
            story:"https://route.showapi.com/1700-1",
            story_list:"https://route.showapi.com/1700-2",
            story_details:"https://route.showapi.com/1700-3",
            robot: "https://route.showapi.com/60-27",
            humor: "https://route.showapi.com/151-2",
            humor_list: "https://route.showapi.com/151-4"
        }
      }
    }
  },
  goLoginPageTimeOut: function () {
    if (this.navigateToLogin) {
      return
    }
    wx.removeStorageSync('token')
    this.navigateToLogin = true
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
    }, 1000)
  },
})
