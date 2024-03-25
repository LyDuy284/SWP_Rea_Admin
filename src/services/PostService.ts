import ApiService from './ApiService'

export async function apiGetPostList<T, U extends Record<string, unknown>>(
  params: U
) {
  return ApiService.fetchData<T>({
    url: '/post',
    method: 'get',
    params: { ...params, pageSize: params.size },
  })
}

export async function apiCreatePost<T, U extends Record<string, unknown>>(
  data: U
) {
  await ApiService.fetchData<T>({
    url: '/post',
    method: 'post',
    data,
  })
  return true
}

export async function apiUpdatePost<
  T,
  U extends Record<string, unknown>
>(data: { id: number; payload: U }) {
  await ApiService.fetchData<T>({
    url: `/post/${data.id}`,
    method: 'put',
    data: data.payload,
  })
  return true
}

export async function apiDeletePost<T, U extends Record<string, unknown>>(
  params: U
) {
  await ApiService.fetchData<T>({
    url: `/post/${params.id}`,
    method: 'delete',
  })
  return true
}

export async function apiGetPostById<T, U extends Record<string, unknown>>(
  params: U
) {
  const { data } = await ApiService.fetchData<any>({
    url: `/post/${params.id}`,
    method: 'get',
  })
  return data.result
}

export async function apiUpdateFeePost<
  T,
  U extends Record<string, unknown>
>(data: { id: string; payload: U }) {
  await ApiService.fetchData<T>({
    url: `/admin/staking/${data.id}/special-fees`,
    method: 'patch',
    data: data.payload,
  })
  return true
}
