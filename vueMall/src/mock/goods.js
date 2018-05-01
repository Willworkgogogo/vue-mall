// 商品列表mock数据
let goodsList = {
  code: 0,
  msg: '',
  'data|5-14': [
    {
      'id|+1': 1,
      'name|': '小米手机@id',
      'price|0-3000': 1999,
      'img_url|': () => {
        return this.a['data|5-14'][0]['id|+1'] + '.jpg'
      }
    }
  ]
}

export { goodsList }
