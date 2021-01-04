import Mock from 'mockjs'
Mock.mock('/meun', /post|get/, {
  // /post|get/i 匹配post和get模式 也可以用'post'或'get'
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list': [
    {"id":0,"info":"11111111111111111","done":true},
    {"id":1,"info":"22222222222222222","done":false},
    {"id":2,"info":"33333333333333333","done":true},
    {"id":3,"info":"44444444444444444","done":false},
    {"id":4,"info":"55555555555555555","done":false}
  ]
})