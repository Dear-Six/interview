import api from './index'
// axios
import request from '@/utils/request'

export function getReview(params) {
  return request({
    url: api.review,
    method: 'get',
    params,
    hideloading: true
  })
}

export function addReview(params) {
  return request({
    url: api.addReview,
    method: 'get',
    params,
    hideloading: true
  })
}
