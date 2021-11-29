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

export function error(params) {
  return request({
    url: api.error,
    method: 'get',
    params,
    hideloading: true
  })
}
export function list(params) {
  return request({
    url: api.list,
    method: 'get',
    params,
    hideloading: true
  })
}
