// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:app.isLogin,
    avatarUrl: wx.getStorageSync('oc-login').avatarUrl || '',
    nickName: wx.getStorageSync('oc-login').nickName || ''
  },
  handleChangeAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: [],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          avatarUrl: res.tempFilePaths[0]
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  toCart() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  handleLogin(e) {
    const { nickName, avatarUrl } = e.detail.userInfo;
    wx.setStorageSync("oc-login", { nickName, avatarUrl })
    app.handleIsLogin();
    this.setData({
      isLogin: app.isLogin,
      avatarUrl: wx.getStorageSync('oc-login').avatarUrl || '',
      nickName: wx.getStorageSync('oc-login').nickName || ''
    }, () => {
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      });
    })
  },
  handleLogout() {
    this.setData({
      isLogin: false,
    })
    wx.removeStorageSync('oc-login')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(this.data.nickName)
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
    app.setBadge();
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