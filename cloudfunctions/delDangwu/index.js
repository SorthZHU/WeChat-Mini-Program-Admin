// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var temp = event.delid
  console.log(temp)
  db.collection("dangWu").where({
    _id:temp
  }).remove().then(res=>{
    console.log("删除成功")
  })
}