import ApiService from './ApiService'

export async function apiGetAutionList<T, U extends Record<string, unknown>>(
  params: U
) {
  return ApiService.fetchData<T>({
    url: '/auction/all',
    method: 'get',
    params: { ...params, pageSize: params.size },
  })
}

export async function apiGetAutionById<T, U extends Record<string, unknown>>(
  params: U
) {
  const { data } = await ApiService.fetchData<any>({
    url: `/auction/${params.id}`,
    method: 'get',
  })
  return data.result
}
