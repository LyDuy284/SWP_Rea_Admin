import ApiService from './ApiService'

export async function apiGetTransactionState<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/dashboard/admin/auction/get-transaction-in-year',
        method: 'get',
        params: { ...params, pageSize: params.size },
    })
}
