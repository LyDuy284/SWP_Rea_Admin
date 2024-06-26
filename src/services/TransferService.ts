import ApiService from "./ApiService";

export async function apiGetTransferList<T, U extends Record<string, unknown>>(
    params: U
  ) {
    return ApiService.fetchData<T>({
      url: '/TransferForm/all',
      method: 'get',
      params: { ...params, pageSize: params.size },
    })
  }