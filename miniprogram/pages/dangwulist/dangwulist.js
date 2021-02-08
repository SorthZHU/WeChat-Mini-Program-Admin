// pages/newslist/newslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },
  getData(){
    wx.cloud.callFunction({
      name:"getDataDangwu",
      data:{
        number:6
      }
    }).then(res=>{
      console.log(res.result.data)
      this.setData({
        list:res.result.data
      })
    })
  },
  onDel: function (e) {
    var that = this;
    let itemid = e.currentTarget.dataset.itemid//获取每一条记录的标题
    console.log(itemid)
    wx.showModal({
      title: '提示',
      content: '真的要删除吗?',
      success:function(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name:"delDangwu",
            data:{
              delid:itemid
            },
            success:function(){
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                that.onLoad(); 
            }
            
          })
    
        }
      }
    })
    
  },
  jumpToAdd:function(){
    wx.navigateTo({
      url: '../addDangwu/addDangwu'
    })
  },
  onEdit:function(){
    wx.navigateTo({
      // url: '..//',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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

  },
  
})