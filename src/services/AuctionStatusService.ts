import ApiService from './ApiService'

export async function apiGetAuctionState<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/dashboard/admin/auction/get-auction-state',
        method: 'get',
        params: { ...params, pageSize: params.size },
    })
}
