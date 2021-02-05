// pages/notice/notice.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choice:1,           //0为编辑1为添加
    time:null,
    notice: {
      title: '',
      author: '',
      content: ''
    },
  },
  getData(){
    wx.cloud.callFunction({
      name:"getDataNotice",
      data:{
        number:6
      }
    }).then(res=>{
      // console.log(res.result.data)
      this.setData({
        list:res.result.data
      })
    })
  },
  getTime(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    var temp = Y + '年'  + M+ '月' + D+ '日' 
    console.log(temp);
    this.setData({
      time:temp
    })
  },
  submit(event){
    // console.log(event.detail.values)
    var {noticeTitle,noticeAuthor,noticeContent} = event.detail.values
    // console.log(noticeTitle,noticeAuthor,noticeContent)
     var that = this;
     this.getTime();
     db.collection("latestNotice").add({
      data:{
        title:noticeTitle,
        author:noticeAuthor,
        content:noticeContent,
        time:this.data.time
      },
      success:function(){
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000,
          success:function(){
            wx.navigateTo({
              url: '../noticelist/noticelist',
            }),
            that.getData()
          }
        })
    }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.lin.initValidateForm(this)
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