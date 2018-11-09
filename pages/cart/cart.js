// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: false,
    isEdit:false,
    isAllchecked:false,
    cart: app.cart,
    totalPrice:0,
    cartCount:app.cartCount
  },
  toDetail(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  handleTotalPrice() {
    const price = app.totalPrice();
    this.setData({
      totalPrice: price.toFixed(2)
    })
  },
  handleRemoveAllPro() {
    app.removeAllPro();
    this.setData({
      cart: app.cart,
      cartCount: app.cartCount
    },() => {
      this.handleTotalPrice();
    })
  },
  handleRemovePro(e) {
    app.removePro(e.currentTarget.id);
    this.setData({
      cart: app.cart,
      cartCount: app.cartCount
    }, () => {
      this.handleTotalPrice();
    })
  },
  handleReduceCount(e){
    app.reduceCartCount(e.currentTarget.id);
    this.setData({
      cart: app.cart,
      cartCount: app.cartCount
    }, () => {
      this.handleTotalPrice();
    })
  },
  handleAddCount(e) {
    app.addCartCount(e.currentTarget.id);
    this.setData({
      cart: app.cart,
      cartCount: app.cartCount
    }, () => {
      this.handleTotalPrice();
    })
  },
  edit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  allCheckedActive() {
    app.changeAllChecked(this.data.isAllchecked);
    this.setData({
      cart: app.cart
    })
  },
  isAllchecked(e) {
    this.setData({
      isAllchecked: !this.data.isAllchecked
    },() => {
      this.allCheckedActive();
      this.handleTotalPrice();
    });
  },
  isChecked: function (e) {
    app.changeChecked(e);
    this.setData({
      cart: app.cart
    }, () => {
      if (this.data.cart.every(item => item.isChecked === true)){
        this.setData({
          isAllchecked:true
        })
      }else{
        this.setData({
          isAllchecked: false
        })
      }
      this.handleTotalPrice();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.allCheckedActive();
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
    this.allCheckedActive();
    this.setData({
      cart: app.cart,
      cartCount: app.cartCount,
    });
    this.handleTotalPrice();
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