Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //登录
  onLogin(e){
    wx.cloud.callFunction({
      name:"admin-login"
    }).then(res=>{
      var username = e.detail.value.username;
      var password = e.detail.value.password;
      var username2 = res.result.data[0].username;
      var password2 = res.result.data[0].password;
      if(username == username2 && password == password2){
        wx.showModal({
          title:"登陆成功",
          content:"正在跳转",
          success(res){
            if(res.confirm){
              wx.redirectTo({
                url: '../../pages/succ_index/succ_index',
              })
            }
          }
        })
      }
      else{
        wx.showModal({
          title:"警告",
          content:"管理员账号或密码错误！"

        })
      }
    })
  },
  onLoad: function (options) {
    
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