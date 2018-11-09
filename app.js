//app.js
App({
  data: {
    locationKey: 'CRWBZ-F4FC4-HO3UR-X5X3E-3OQ4K-JGBIU'
  },
  isLogin: false,
  avatarUrl: wx.getStorageSync('oc-login').avatarUrl || '',
  nickName: wx.getStorageSync('oc-login').nickName || '',
  cart: wx.getStorageSync('oc-cart') || [],
  cartCount: 0,
  historySearch: wx.getStorageSync('oc-historySearch') || [],
  onLaunch: function () {
    this.setBadge();
    this.totalCount();
    this.handleIsLogin();
  },
  setBadge() {
    const totalCount=this.cart.reduce((result, item) => {
      result += item.count;
      return result;
    },0);
    wx.setTabBarBadge({
      index: 2,
      text: `${totalCount}`,
      success:(resp)=>{
        //console.log(resp)
      },
      fail: (resp) => {
        //console.log(resp)
      }
    })
  },
  addCartCount(id){
    const cart = this.cart.map(item => {
      if(item.id == id){
        item.count +=1;
      }
    });
    wx.setStorageSync('oc-cart', this.cart)
    this.setBadge();
    this.totalCount();
  },
  reduceCartCount(id) {
    const cart = this.cart.map(item => {
      if (item.id == id) {
        if (item.count > 2) {
          item.count -= 1;
        } else {
          item.count = 1;
        }
      }
    });
    wx.setStorageSync('oc-cart', this.cart)
    this.setBadge();
    this.totalCount();
  },
  removePro(id) {
    this.cart = this.cart.filter(item => item.id != id)
    wx.setStorageSync('oc-cart', this.cart);
    this.setBadge();
    wx.showToast({
      title: '删除此商品成功',
      icon: 'success',
      duration: 2000
    });
    this.totalCount();
  },
  removeAllPro() {
    this.cart = [];
    wx.removeStorageSync('oc-cart');
    this.setBadge();
    wx.showToast({
      title: '删除全部商品成功',
      icon: 'success',
      duration: 2000
    });
    this.totalCount();
  },
  addToCart(pro) {
    const isExit = this.cart.some(cartItem => cartItem
    .id == pro.id);
    if(isExit){
      this.cart=this.cart.map(c => {
        if(c.id == pro.id){
          c.count +=1;
        }
        return c;
      })
    }else{
      this.cart.push({
        ...pro,
        count:1,
        isChecked: false
      })
    }
    wx.setStorageSync('oc-cart', this.cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    });
    this.totalCount();
  },
  changeChecked(e) {
   this.cart = this.cart.map(item => {
      if(item.id == e.currentTarget.id){
        item.isChecked = !item.isChecked;
      }
      return item;
    });
  },
  changeAllChecked(isAllchecked){
    if (isAllchecked === true) {
      this.cart = this.cart.map(item => {
        item.isChecked = true;
        return item;
      });
    } else {
      this.cart = this.cart.map(item => {
        item.isChecked = false;
        return item;
      });
    }
  },
  totalPrice() {
    const price = this.cart.reduce((result, item) => {
      if (item.isChecked === true) {
        result += item.price * item.count;
      }
      return result;
    }, 0)
    return price;
  },
  totalCount() {
    this.cartCount = this.cart.reduce((result,item) => {
      result += item.count;213
      return result;
    }, 0)
  },
  handleIsLogin() {
    if (wx.getStorageSync('oc-login')){
      this.isLogin = true;
    }
  },
  clearHistorySearch() {
    wx.removeStorageSync('oc-historySearch');
    this.historySearch = [];
  }
})