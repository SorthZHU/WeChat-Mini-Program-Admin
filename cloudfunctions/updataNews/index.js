// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.id
  var t = event.title
  var a = event.author
  var c = event.content
  var u = event.url
  // console.log(id,t,a,c)
  db.collection("News").doc(id).update({
    data:{
      author:a,
      title:t,
      content:c,
      url:u
    }
  }).then(res=>{
    console.log(author,title,content)
  })
}