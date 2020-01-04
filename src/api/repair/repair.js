import request from '@/utils/request'

export function getRepairOrderList(params) {
  return request({
    url: '/repair/syslist',
    method: 'get',
    params
  })
}

export function repair_order_registry(params) {
  return request({
    url: '/repair/registry',
    method: 'post',
    data:params
  })
}

