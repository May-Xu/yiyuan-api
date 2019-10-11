var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide: true,
    articleList: []
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
    wx.request({
      url: app.globalData.api.showApi.path.story,
      data: {
        showapi_appid: app.globalData.api.showApi.appId,
        showapi_sign: app.globalData.api.showApi.sign,
      },
      success: function (res) {
        let contentlist = res.data.showapi_res_body.storylist
          console.log(contentlist)
          that.setData({
            articleList: that.data.articleList.concat(contentlist)
          });
        console.log(res)
      },
    });
  },
  toDetailsTap: function (e) {
    let classifyid = e.currentTarget.dataset.classifyid;
    console.log(classifyid)
    wx.navigateTo({
      url: '/pages/story/list/index?classifyid=' + classifyid,
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
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   
  onReachBottom: function () {

  },*/

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})