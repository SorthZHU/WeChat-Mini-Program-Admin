// pages/editNews/editNews.js
var souurl = null
var tempurl = null
var newurl = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempid:null,
    stitle:[],
    testurl:[
      "https://7778-wxyun-7g4bm1vn16ceb7ed-1304852033.tcb.qcloud.la/newsPic/1612600161528.png"
    ],
    news:{
      title: '',
      author: '',
      content: '',
      url:[""]
    }
  },
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
            name:"delNews",
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
                      url: '../newslist/newslist',
                    }),
                    that.getData()
                  },
                  error:function(){
                    console.log("失败")
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
      name:"getNewsid",
      data:{
        number:6,
        id:temp
      }
    }).then(res=>{
      // console.log(res)
      tempurl = res.result.data[0].url
      this.setData({
        stitle:res.result.data,
        news:{
          title:res.result.data[0].title,
          author:res.result.data[0].author,
          content:res.result.data[0].content,
          url:[res.result.data[0].url]
        }
      })
      
      
    })
  },
  //更新数据
  updataNews(res){
    // console.log(res)
    newurl = tempurl
    var temp = this.data.tempid
    var that = this;
    var {newsTitle,newsAuthor,newsContent} = res.detail.values
    console.log(newsTitle,newsAuthor,newsContent)
    wx.cloud.callFunction({
      name:"updataNews",
      data:{
        id:temp,
        title:newsTitle,
        author:newsAuthor,
        content:newsContent,
        url:newurl
      },
      success:function(){
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
          success:function(){
            wx.navigateTo({
              url: '../newslist/newslist',
            }),
            that.getData()
          }
        })
    }
    
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.lin.initValidateForm(this)
    this.setData({
      tempid:options.itemid
    }),
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

  }
})