import ApiService from './ApiService'

export async function apiGetAutionHistoryList<T, U extends Record<string, unknown>>(
  params: U
) {
  return ApiService.fetchData<T>({
    url: '/history/all',
    method: 'get',
    params: { ...params, pageSize: params.size },
  })
}