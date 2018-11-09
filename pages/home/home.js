// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://img.yzcdn.cn/upload_files/2018/10/14/Fhrzdo3riiUF3n7UfaTZRy7NbI1B.jpg?imageView2/2/w/730/h/0/q/75/format/jpg',
      'https://img.yzcdn.cn/upload_files/2018/10/12/Fhh19J4TuqclTqWQmmvMUGOdvUiT.jpg?imageView2/2/w/730/h/0/q/75/format/jpg',
      'https://img.yzcdn.cn/upload_files/2018/09/22/FukX94PG_mYcfnDjpkx-kwClQDQ2.jpg?imageView2/2/w/730/h/0/q/75/format/jpg',
'https://img.yzcdn.cn/upload_files/2018/09/22/Fr9BzwJorLnLjeAplWnrvF60HS5k.jpg?imageView2/2/w/730/h/0/q/75/format/jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    recommendPro: [],
    inputShowed: false,
    inputVal: "",
    currentCity: '',
    historySearch: app.historySearch
  },
  clearAll() {
    app.clearHistorySearch();
    this.setData({
      historySearch: app.historySearch,
    });
  },
  saveSearch(e) {
    app.historySearch = app.historySearch.filter(item => item !== e.currentTarget.dataset.inputvalue);
    app.historySearch.unshift(e.currentTarget.dataset.inputvalue);
    wx.setStorageSync('oc-historySearch', app.historySearch);
  },
  handleAddToCart(e) {
    const detail = this.data.prolist.filter(item => item.id == e.currentTarget.id)[0];
    const pro = {
      id: detail.id,
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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  getRecommendPro() {
    wx.request({
      url: 'https://h5.youzan.com/wscshop/showcase/goods/allGoods.json?kdt_id=242570&page=1&pageSize=6',
      success: (resp) => {
        this.setData({
          recommendPro:resp.data.data.list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendPro();
    wx.getLocation({
      success:(resp) => {
        wx.request({
          url:
            `https://apis.map.qq.com/ws/geocoder/v1/?location=${resp.latitude},${resp.longitude}&key=${app.data.locationKey}&get_poi=1`,
            success: (r) => {
              this.setData({
                currentCity: r.data.result.address_component.city
              })
            }
        })
      },
      fail(resp) {
        wx.showToast({
          title: '获取位置失败',
          duration: 2000
        })
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
    app.setBadge();
    this.setData({
      historySearch: app.historySearch,
      inputVal: ""
    });
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