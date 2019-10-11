Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              wx.switchTab({
                url: '/pages/rebot/index'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/rebot/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，某些功能将无法正确使用!!!',
        showCancel: false,
        confirmText: '返回',
        success: function (res) {
          wx.switchTab({
            url: '/pages/rebot/index'
          })
        }
      })
    }
  },
  //获取用户信息接口


})
