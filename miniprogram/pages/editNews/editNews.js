// pages/editNews/editNews.js
var souurl = null
var tempurl = null
var newurl = null
var flag = 0
var newsTitle = null
var newsAuthor = null
var newsContent = null
var temp = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempid:null,
    tempcloudid:null,
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
  //删除图片函数
  delimg(temp){
    wx.cloud.deleteFile({
      fileList:[temp],
        success: res => {
          // handle success
          console.log("图片删除成功")   
        },
        fail: console.error          
      })
  },
  onDel: function (e) {
    // console.log(e.currentTarget.dataset) 
    var that = this;
    var temp = this.data.tempid
    var tempclid = this.data.tempcloudid
    // let itemid = e.currentTarget.dataset.itemid//获取每一条记录的标题
    console.log(tempclid)
    wx.showModal({
      title: '提示',
      content: '真的要删除吗?',
      success:function(res){
        if(res.confirm){
          //
          //删除图片
          that.delimg(tempclid)
          //
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
      // console.log(res.result.data.length)
      if( res.result.data.length != 0){
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
    }
      
    })
  },
  //更新数据
  async updataNews(res){
    // console.log(res)
    newurl = tempurl
    temp = this.data.tempid
    // var that = this;
    // var {newsTitle,newsAuthor,newsContent} = res.detail.values
    newsTitle = res.detail.values.newsTitle;
    newsAuthor = res.detail.values.newsAuthor;
    newsContent = res.detail.values.newsContent;
    
    if(flag == 1){
      console.log("更新了图片执行函数1")
     await this.uploadImage(souurl);
    }
    else{
      console.log("未更新图片执行函数2")
      newurl = tempurl
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
                })
                // that.getData()
              }
            })
        }
        
        })
    }
    
  },
  //选择图片并上传
  newupload(res){
    let that = this;
    // console.log("成功",res);
    // console.log(res.detail.current[0].url);
    souurl = res.detail.current[0].url
    flag = 1
    console.log("更改了图片")
    // console.log("0")
    // that.uploadImage(res.detail.current[0].url);
  },
   // 上传到云开发的存储中
   async uploadImage(fileURL) {
    var that = this
    var tempid = this.data.tempcloudid
    that.delimg(tempid)
    await wx.cloud.uploadFile({
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
  async addImagePath(fileId) {
    console.log(fileId)
    // fileID：图片在云存储中的id
    await  wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        // url：供调用的链接
        tempurl = res.fileList[0].tempFileURL
        console.log("2")
        //
        newurl = tempurl
        console.log(newurl)
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
                })
                // that.getData()
              }
            })
        }
        
        })
        //
      },
      fail: console.error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    wx.lin.initValidateForm(this)
    this.setData({
      tempid:options.itemid,
      tempcloudid:options.tempimgid
    }),
    // console.log("加载"+this.data.tempid)
    // console.log("加载"+this.data.tempcloudid)
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