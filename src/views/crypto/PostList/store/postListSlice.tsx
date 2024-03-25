import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'
import { apiDeletePost, apiGetPostList } from '@/services/PostService'

type FilterQueries = {
  name: string
}

export const SLICE_NAME = 'postList'

export const getPostList = createAsyncThunk(
  SLICE_NAME + '/getPostList',
  async (data: any) => {
    const response = await apiGetPostList<any, any>(data)
    console.log(response.data.result)

    return response.data.result
  }
)

export const deletePost = async (data: { id: string }) => {
  const response = await apiDeletePost<boolean, { id: string }>(data)
  return response
}

export const initialTableData: TableQueries = {
  count: 0,
  page: 1,
  size: 10,
  query: '',
  sort: {
    order: '',
    key: '',
  },
}

const initialState: any = {
  loading: false,
  deleteConfirmation: false,
  selected: '',
  postList: [],
  tableData: initialTableData,
  filterData: {
    name: '',
  },
}

const postListSlice = createSlice({
  name: `${SLICE_NAME}/state`,
  initialState,
  reducers: {
    updateStakingList: (state, action) => {
      state.postList = action.payload
    },
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload
    },
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload
    },
    setSelectedStaking: (state, action) => {
      state.selected = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
        state.loading = false
      })
      .addCase(getPostList.pending, (state) => {
        state.loading = true
      })
  },
})

export const {
  updateStakingList,
  setTableData,
  setFilterData,
  toggleDeleteConfirmation,
  setSelectedStaking,
} = postListSlice.actions

export default postListSlice.reducer
