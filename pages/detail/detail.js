// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    cartCount: app.cartCount
  },
  handleAddToCart(e) {
    const pro = {
      id: e.currentTarget.id,
      image_url: this.data.detail.image_url,
      price: this.data.detail.price,
      title: this.data.detail.title,
    };
    app.addToCart(pro);
    this.setData({
      cartCount: app.cartCount
    })
  },
  handleToCart() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `https://h5.youzan.com/wscshop/showcase/goods/allGoods.json?kdt_id=242570`,
      success: (resp) => {
        this.setData({
          detail: resp.data.data.list.filter(item => item.id == options.id)[0],
        })
      },
      complete: () => {
        wx.hideLoading();
      }
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
    this.setData({
      cartCount: app.cartCount
    })
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