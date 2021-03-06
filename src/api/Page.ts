import request from './index';
import type {ITest, ITreeRes} from "@/api/types";
import type {IGetCheckParams} from "@/api/types/check";

export const getData = (params: ITest) => {
  return request<object[]>({
    url: '/api/repos/vuejs/core/commits',
    method: 'get',
    params: {...params}
  })
}


export const getTreeData = () => {
  return request<ITreeRes>({
    url: '/api/open_api/dept/build_tree',
    method: 'get',
  })
}

// export const getCheckData = (params?: IGetCheckParams) => {
//   return request<IGetCheckResponse>({
//     url: '/api/open_api/attendance_filter/page',
//     method: 'get',
//     params: {...params}
//   })
// }


// export const getAuthData = (params) => {
//   return axios({
//     url: '/api/open_api/auth_filter/page',
//     method: 'get',
//     params: {...params}
//   })
// }
//
//
// //增加考勤过滤
// export const addCheck = (params) => {
//   return axios({
//     url: '/api/open_api/attendance_filter/add',
//     method: 'get',
//     params: {...params}
//   })
// }
//
// export const removeCheck = (params) => {
//   return axios({
//     url: '/api/open_api/attendance_filter/remove',
//     method: 'get',
//     params: {...params}
//   })
// }
//
// //增加门禁过滤
// export const addAuth = (params) => {
//   return axios({
//     url: '/api/open_api/auth_filter/add',
//     method: 'get',
//     params: {...params}
//   })
// }
//
// export const removeAuth = (params) => {
//   return axios({
//     url: '/api/open_api/auth_filter/remove',
//     method: 'get',
//     params: {...params}
//   })
// }
