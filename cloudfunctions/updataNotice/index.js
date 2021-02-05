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
  // console.log(id,t,a,c)
  db.collection("latestNotice").doc(id).update({
    data:{
      author:a,
      title:t,
      content:c
    }
  }).then(res=>{
    // console.log(author,title,content)
  })
  // return await db.collection("latestNotice").doc("b00064a760168a1c0203e77722165a08").updata({
  //   data:{
  //     author:a,
  //     title:t,
  //     content:c
  //   }
  // }).then(res=>{
  //   console.log(res)
  // })
}