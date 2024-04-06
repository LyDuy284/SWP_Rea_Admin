import ApiService from './ApiService'

interface RejectTransferParams {
  id: string | undefined; // Adjust the type to accept string or undefined
  reason: string; // Reason for rejection
}

export async function apiGetTransferById<T, U extends Record<string, unknown>>(
    params: U
  ) {
    const { data } = await ApiService.fetchData<any>({
      url: `/TransferForm/${params.id}`,
      method: 'get',
    })
    return data.result
  }

export async function apiApproveTransfer<T, U extends Record<string, unknown>>(
    params: U
  ) {
    const { data } = await ApiService.fetchData<any>({
      url: `/TransferForm/approve?formId=${params.id}`,
      method: 'patch',
    })
    return data.result
  }

export async function apiRejectTransfer(params: RejectTransferParams) {
    if (typeof params.id === 'undefined') {
      throw new Error('Invalid ID'); // Handle the case where ID is undefined
    }
  
    const { data } = await ApiService.fetchData<any>({
      url: `/TransferForm/reject?formId=${params.id}`,
      method: 'patch',
      data: { reason: params.reason }, // Include the reason in the request payload
    });
    return data.result;
  }
  
  export async function apiDoneTransfer<T, U extends Record<string, unknown>>(
    params: U
  ) {
    const { data } = await ApiService.fetchData<any>({
      url: `/TransferForm/done?formId=${params.id}`,
      method: 'patch',
    })
    return data.result
  }