var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.api.showApi.path.humor,
      data: {
        showapi_appid: app.globalData.api.showApi.appId,
        showapi_sign: app.globalData.api.showApi.sign,
      },
      success: function (res) {
        let contentlist = res.data.showapi_res_body.typeList
        console.log(contentlist)
        that.setData({
          articleList: that.data.articleList.concat(contentlist)
        });
        const articleList = that.data.articleList
        console.log(res)
      },
    });
  },
  toDetailsTap: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/humor/details/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})