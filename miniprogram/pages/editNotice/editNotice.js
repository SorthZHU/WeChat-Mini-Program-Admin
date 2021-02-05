// pages/editNotice/editNotice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempid:null,
    stitle:[],
    notice:{
      title: '',
      author: '',
      content: ''
    }
  },
  //删除记录模块
  onDel: function (e) {
    var that = this;
    var temp = this.data.tempid
    // let itemid = e.currentTarget.dataset.itemid//获取每一条记录的标题
    console.log(temp)
    wx.showModal({
      title: '提示',
      content: '真的要删除吗?',
      success:function(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name:"delNotice",
            data:{
              delid:temp
            },
            success:function(){
                wx.showToast({
                  title: '删除成功',
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
    
        }
      }
    })
    
  },
  getData(){
    var temp = this.data.tempid
    // console.log(temp)
    wx.cloud.callFunction({
      name:"getNoticeId",
      data:{
        number:6,
        id:temp
      }
    }).then(res=>{
      this.setData({
        stitle:res.result.data,
        notice:{
          title:res.result.data[0].title,
          author:res.result.data[0].author,
          content:res.result.data[0].content
        }
      })
      
      
    })
  },
  //更新数据
  updataNotice(res){
    console.log(res)
    var temp = this.data.tempid
    var that = this;
    var {noticeTitle,noticeAuthor,noticeContent} = res.detail.values
    wx.cloud.callFunction({
      name:"updataNotice",
      data:{
        id:temp,
        title:noticeTitle,
        author:noticeAuthor,
        content:noticeContent
      },
      success:function(){
        wx.showToast({
          title: '修改成功',
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
  onLoad: function (options) {
    wx.lin.initValidateForm(this)
    this.setData({
      tempid:options.itemid
    }),
    this.getData()
    // console.log(this.data.tempid)
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