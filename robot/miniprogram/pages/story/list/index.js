var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyid:[],
    flag: 1,
    hide: true
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
    let classifyid = e.classifyid
    var flag = that.data.flag
    this.setData({
      classifyid: e.classifyid
    })
    wx.request({
      url: app.globalData.api.showApi.path.story_list,
      data: {
        showapi_appid: app.globalData.api.showApi.appId,
        showapi_sign: app.globalData.api.showApi.sign,
        classifyId: classifyid,
        page:flag,
        /*allNum:40,
        maxResult:20*/
      },
      success: function (res) {
        console.log("res:",res)
        let contentlist = res.data.showapi_res_body.contentlist
        console.log(contentlist)
        that.setData({
          //articleList: that.data.articleList.concat(contentlist)
          articleList:contentlist
        });
      },
    });
  },
  socket: function (e) {
    console.log("下拉刷新已进入")
    var that = this;
    let classifyid = that.data.classifyid
    var flag = that.data.flag
    /*that.setData({
      classifyid: e.classifyid
    })*/
    wx.request({
      url: app.globalData.api.showApi.path.story_list,
      data: {
        showapi_appid: app.globalData.api.showApi.appId,
        showapi_sign: app.globalData.api.showApi.sign,
        classifyId: classifyid,
        page: flag,
        /*allNum:40,
        maxResult:20*/
      },
      success: function (res) {
        console.log("res:", res)
        let contentlist = res.data.showapi_res_body.contentlist
        console.log(contentlist)
        that.setData({
          articleList: that.data.articleList.concat(contentlist)
          //articleList: contentlist
        });
      },
    });
  },
  toDetailsTap: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/story/detail/index?id=' + id,
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

  },*/

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    var classifyid = this.data.classifyid
    var flag = this.data.flag
    this.setData({
      flag: flag + 1
    })
    this.socket()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})