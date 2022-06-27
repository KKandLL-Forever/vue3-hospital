import axios from 'axios';
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {message} from 'ant-design-vue';
// import {serialize} from '@/utils'

const onRequestFulfilled = (config: AxiosRequestConfig) => {
  //业务逻辑
  return config
}
const onRequestReject = (error: any) => Promise.reject(error)

const onResponseFulfilled = (res: AxiosResponse) => {
  const status = res.data.code || res.status;
  const msg = res.data.msg || res.data.error_description || '未知错误';
  if (status !== 200) {
    message.error(msg);
    return Promise.reject(new Error(msg))
  }
  return res;
}
const onResponseReject = (error: string | undefined) => {
  return Promise.reject(new Error(error))
}

const request: AxiosInstance = axios.create({})

//默认超时时间
request.defaults.timeout = 10000;

//返回其他状态码
request.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};

//跨域请求，允许保存cookie
request.defaults.withCredentials = true;

request.interceptors.request.use(onRequestFulfilled, onRequestReject)
request.interceptors.response.use(onResponseFulfilled, onResponseReject)

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data || res) as T
  })
};
