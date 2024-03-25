import ApiService from './ApiService'

export async function apiGetStakingList<T, U extends Record<string, unknown>>(
  params: U
) {
  return ApiService.fetchData<T>({
    url: '/user/all',
    method: 'get',
    params: { ...params, pageSize: params.size },
  })
}

export async function apiCreateStaking<T, U extends Record<string, unknown>>(
  data: U
) {
  await ApiService.fetchData<T>({
    url: '/user',
    method: 'post',
    data,
  })
  return true
}

export async function apiUpdateStaking<
  T,
  U extends Record<string, unknown>
>(data: { id: number; payload: U }) {
  await ApiService.fetchData<T>({
    url: `/user/${data.id}`,
    method: 'put',
    data: data.payload,
  })
  return true
}

export async function apiDeleteStaking<T, U extends Record<string, unknown>>(
  params: U
) {
  await ApiService.fetchData<T>({
    url: `/user/delete/${params.id}`,
    method: 'delete',
  })
  return true
}

export async function apiActiveStaking<T, U extends Record<string, unknown>>(
  params: U
) {
  await ApiService.fetchData<T>({
    url: `/user/active/${params.id}`,
    method: 'put',
  })
  return true
}

export async function apiGetStakingById<T, U extends Record<string, unknown>>(
  params: U
) {
  const { data } = await ApiService.fetchData<any>({
    url: `/user/${params.id}`,
    method: 'get',
  })
  return data.result
}

export async function apiUpdateFeeStaking<
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
