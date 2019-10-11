var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Arr1: [],//左列
    Arr2: [],//右列
    flag:20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      success(res) {
        that.setData({
          hide: true
        })
      }
    })
    var flag = that.data.flag
    wx.request({
      url: app.globalData.api.showApi.path.joke_img,
      data: {
        showapi_appid: app.globalData.api.showApi.appId,
        showapi_sign: app.globalData.api.showApi.sign,
        len:flag
      },

      success: function (res) {
        let contentlist = res.data.showapi_res_body.list
        let { Arr1, Arr2 } = that.data
        for (let i = 0; i < contentlist.length; i++) {
          console.log(contentlist[i])
          let ceshi = contentlist[i].ct
          if (ceshi.charAt(ceshi.length - 1)%2 == 1){
            console.log("ct:", ceshi.charAt(ceshi.length - 1))
            that.setData({
              Arr1: that.data.Arr1.concat(contentlist[i]),
            })
          } else {
            console.log("ct:", ceshi.charAt(ceshi.length-1))
              that.setData({
                Arr2: that.data.Arr2.concat(contentlist[i]),
            });
          }
        }
        console.log(res)
      },
    });
  },
  socket: function (e) {
    var that = this;
    var flag = that.data.flag
    wx.request({
      url: app.globalData.api.showApi.path.joke_img,
      data: {
        showapi_appid: app.globalData.api.showApi.appId,
        showapi_sign: app.globalData.api.showApi.sign,
        len: flag
      },
      success: function (res) {
        let contentlist = res.data.showapi_res_body.list
        let { Arr1, Arr2 } = that.data
        for (let i = 0; i < contentlist.length; i++) {
          console.log(contentlist[i])
          let ceshi = contentlist[i].ct
          if (ceshi.charAt(ceshi.length - 1) % 2 == 1) {
            console.log("ct:", ceshi.charAt(ceshi.length - 1))
            that.setData({
              Arr1: that.data.Arr1.concat(contentlist[i]),
            })
          } else {
            console.log("ct:", ceshi.charAt(ceshi.length - 1))
            that.setData({
              Arr2: that.data.Arr2.concat(contentlist[i]),
            });
          }
        }
        console.log(res)
      },
    });
  },
  toDetailsTap:function(e){
    let text = e.currentTarget.dataset.text;
    console.log(text)
    wx.navigateTo({
      url: '/pages/details/index?text='+text,
    })
  },
  previewImage: function (e) {
    var path = e.currentTarget.dataset.path
    wx.previewImage({
      current: path,
      urls: [path]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this
    setTimeout(function () {
      wx.hideLoading()
      self.setData({
        hide: false
      })
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   
  onPullDownRefresh: function () {
    this.setData({
      flag:20
    })
    this.socket()
    wx.stopPullDownRefresh();
  },*/

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var flag = this.data.flag
    this.setData({
      flag: flag + 20
    })
    this.socket()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})