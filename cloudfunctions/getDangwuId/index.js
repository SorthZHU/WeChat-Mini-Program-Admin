// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.id
  // console.log(id)
  return await db.collection("dangWu").where({
    _id:id
  }).get()
}