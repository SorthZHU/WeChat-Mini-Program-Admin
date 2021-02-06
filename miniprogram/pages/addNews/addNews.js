// pages/addNews/addNews.js
const db = wx.cloud.database();
var souurl = null
var tempurl = null
var newurl = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // newurl:0
  },
  //选择图片并上传
   newupload(res){
    let that = this;
    // console.log("成功",res);
    console.log(res.detail.current[0].url);
    souurl = res.detail.current[0].url
    console.log("0")
    that.uploadImage(res.detail.current[0].url);
  },
   // 上传到云开发的存储中
    uploadImage(fileURL) {
    var that = this
     wx.cloud.uploadFile({
      cloudPath:'newsPic/' + new Date().getTime()+'.png', // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        //获取图片的http路径
        that.addImagePath(res.fileID)
        console.log("1")
      },
      fail: console.error
    })
  },
  // 获取图片上传后的url路径
   addImagePath(fileId) {
    console.log(fileId)
    // fileID：图片在云存储中的id
      wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        // url：供调用的链接
        // this.setData({
        //   tempurl:res.fileList[0].tempFileURL,
        //   console.log(tempurl)
        // })
        tempurl = res.fileList[0].tempFileURL
        console.log(tempurl)
        console.log("2")
      },
      fail: console.error
    })
  },
  // 按钮提交
   async submit(event){
    let that = this;
    // await that.uploadImage(souurl)
    // console.log(event.detail.values)
    var {noticeTitle,noticeAuthor,noticeContent} = event.detail.values
    // this.setData({
    //   newurl:tempurl
    // })
    
    newurl = tempurl
    // console.log(noticeTitle,noticeAuthor,noticeContent)
     this.getTime();
     db.collection("News").add({
      data:{
        title:noticeTitle,
        author:noticeAuthor,
        content:noticeContent,
        time:this.data.time,
        url:newurl
      },
      success:function(){
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000,
          success:function(){
            wx.navigateTo({
              url: '../newslist/newslist',
            }),
            that.getData()
          }
        })
        console.log("3")
    }
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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