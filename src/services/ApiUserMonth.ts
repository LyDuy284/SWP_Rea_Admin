import ApiService from './ApiService'

export async function apiGetUserByMonth<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/dashboard/admin/auction/get-user-by-month',
        method: 'get',
        params: { ...params, pageSize: params.size },
    })
}
