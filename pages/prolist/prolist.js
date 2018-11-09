// pages/prolist/prolist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: [],
    page: 1,
    totalPage: 2,
    currentType: '纯甄系列'
  },
  handleAddToCart(e) {
    const detail =this.data.prolist.filter(item => item.id == e.currentTarget.id)[0];
    const pro = {
      id:detail.id,
      image_url: detail.image_url,
      price: detail.price,
      title: detail.title
    };
    app.addToCart(pro);
  },
  toDetail(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  updatePro() {
    this.setData({
      page: 1,
      prolist: [],
    });
    this.loadPro();
  },
  loadPro() {
    if(this.data.page > this.data.totalPage){
      return ;
    }
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `https://h5.youzan.com/wscshop/showcase/goods/allGoods.json?kdt_id=242570&page=${this.data.page}&pageSize=10`,
      success: (resp) => {
        this.setData({
          prolist: this.data.prolist.concat(resp.data.data.list),
          page: this.data.page+1
        })
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },
  loadMore() {
    this.loadPro();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadPro();
    this.setData({
      currentType: options.type
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