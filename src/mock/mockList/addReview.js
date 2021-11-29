const Mock = require('mockjs')

var Random = Mock.Random
module.exports = Mock.mock({
  'name': '@name',
  'date': '@date("yyyy-MM-dd")',
  'img': Random.dataImage('200x200'),
  'likeNum': 2,
  'isLike|1-2': false,
  // 'chilrenReply': []
  'chilrenReply|4-8': [{
    'name': '@name',
    'content': Random.csentence(),
    'text': '@name'
  }]
})
