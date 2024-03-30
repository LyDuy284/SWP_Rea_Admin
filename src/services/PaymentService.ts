import ApiService from "./ApiService";

export async function apiGetPaymentList<T, U extends Record<string, unknown>>(
    params: U
  ) {
    return ApiService.fetchData<T>({
      url: '/payment/all',
      method: 'get',
      params: { ...params, pageSize: params.size },
    })
  }