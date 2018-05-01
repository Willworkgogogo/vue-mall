import request from '@/utils/request'

// getGoodsList 获取商品列表
export function getGoodsList () {
  return request({
    url: '/goods',
    method: 'get'
  })
}
