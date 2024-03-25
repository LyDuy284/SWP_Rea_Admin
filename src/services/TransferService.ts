import { useAppSelector } from '@/store';
import axios from 'axios';


interface Transfer {
  id: number;
  title: string;
  content: string;
  reason: string;
  tranferFormStatus: 0,
  transferImages: string[];
  transactionImages: string[];
  
}

export async function apiGetTransferList(): Promise<Transfer[]> {
  try {
    
    const response = await axios.get<{result: Transfer[]}>('https://reaauction.azurewebsites.net/v1/auction/TransferForm/all', {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MTE0NTA2NjMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMzciLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwIn0.NEdW4SPHAL8rFt91Fhd8rBlPFWbEJGUra05HrO7I1bg"}`,
        'Content-Type': 'application/json'
      }
    });
    // console.log(response.data?.result.transferImages);
    
    return response.data.result;
  } catch (error) {
    console.error('Error fetching transfer data:', error);
    throw error;
  }
}
