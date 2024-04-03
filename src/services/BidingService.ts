import ApiService from './ApiService'

export async function apiGetBiddingState<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/dashboard/admin/auction/get-bidding-in-month',
        method: 'get',
        params: { ...params, pageSize: params.size },
    })
}
