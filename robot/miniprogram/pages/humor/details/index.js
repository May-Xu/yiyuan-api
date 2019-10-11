var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: [],
    contact: '',
    animationData: {},
    articleList:[],
    answer:'',
    index:1,
    flag:1,
    hide:true
  },
  //事件处理函数
  slidethis: function (e) {
    console.log(e);
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation = animation;
    this.animation.translateY(-420).rotate(-5).translateX(0).step();
    this.animation.translateY(62).translateX(25).rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function () {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 350);
  },
  buythis: function (e) {
    console.log(e);
    app.buyDetail = this.data.cardInfoList[e.target.id];
    wx.navigateTo({
      url: '../detail/detail'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let id = e.id
    //let flag = this.data.flag
    this.setData({
      id: e.id
    })
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
    wx.request({
      url: app.globalData.api.showApi.path.humor,
      data: {
        showapi_appid: app.globalData.api.showApi.appId,
        showapi_sign: app.globalData.api.showApi.sign,
        typeId:id,
        //page:flag
      },
      success: function (res) {
        let contentlist = res.data.showapi_res_body.pagebean.contentlist
        console.log(contentlist)
        that.setData({
          articleList:contentlist
        });
        const articleList = that.data.articleList
        console.log(res)
      },
    });
  },
  socket: function (e) {
    let id = this.data.id
    //var flag = this.data.flag
    this.setData({
      id: id
    })
    var that = this
    wx.request({
      url: app.globalData.api.showApi.path.humor,
      data: {
        showapi_appid: app.globalData.api.showApi.appId,
        showapi_sign: app.globalData.api.showApi.sign,
        typeId: id,
        //page:flag
      },
      success: function (res) {
        let contentlist = res.data.showapi_res_body.pagebean.contentlist
        console.log(contentlist)
        that.setData({
          articleList: contentlist
        });
        const articleList = that.data.articleList
        console.log(res)
      },
    });
  },
  bindcontact: function (e) {
    console.log("输入的谜底：" + this.data.contact)
    let daan = e.currentTarget.dataset.daan;
    console.log("答案是：", daan.substr(3))
    this.setData({
      contact: e.detail.value,
      answer: daan.substr(3,)
    })
  },
  look:function(e){
    let answer = this.data.answer;
    wx.showToast({
      title: answer,
      icon: 'none',
      duration: 1500,
      mask: false,
    })
  },
  up_img: function (e) {
    let answer = this.data.answer;
    console.log("答案是：",answer)
    var contact = this.data.contact;
    console.log("输入的谜底是：",contact)
    if (contact == null || contact == '') {
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    } else {
      this.onAdd();
    }
  },
  onAdd:function(e){
    let contact = this.data.contact;
    let answer = this.data.answer;
    var that = this;
    if (contact === answer) {
      wx.showToast({
        title: '恭喜你',
        icon: 'none',
        duration: 1000,
        mask: false,
      })
      that.setData({
        index: that.data.index+1,
        contact:''
      })
    } else {
      wx.showToast({
        title: '提示：'+answer[0],
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    }
    if (that.data.index == this.data.articleList.length) {
      /*var flag = this.data.flag
      that.setData({
        flag: flag + 1
      })*/
      this.socket()
    }
    if (that.data.index == this.data.articleList.length+1) {
      wx.showToast({
        title: '你太厉害喇！猜完喇！！',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
      this.setData({
        hide: false
      })
    }
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