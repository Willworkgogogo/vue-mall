import Mock from 'mockjs'
import { goodsList } from './goods'

Mock.mock(/\/goods/, 'get', goodsList)

export default Mock
