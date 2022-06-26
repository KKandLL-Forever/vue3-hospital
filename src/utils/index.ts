//表单序列化
export const serialize = (data: any): string => {
  const list: any[] = [];
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&');
};
