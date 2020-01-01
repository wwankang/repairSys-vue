import request from '@/utils/request'

export function getRepairOrderList(params) {
  return request({
    url: '/user/syslist',
    method: 'get',
    params
  })
}
