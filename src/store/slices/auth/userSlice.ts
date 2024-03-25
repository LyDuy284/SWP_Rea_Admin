import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
  avatarUrl?: string
  username?: string
  authority?: string[]
  id?: string
  deletedAt?: any
  deletedBy?: any
  isDeleted?: boolean
  createdAt?: string
  updatedAt?: string
  email: string
  role?: number
}

const initialState: UserState = {
  avatarUrl: '',
  username: '',
  authority: [],
  id: '',
  email: '',
}

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.avatarUrl = action.payload?.avatarUrl
      state.username = action.payload?.username
      state.email = action.payload?.email
      state.authority = action.payload?.authority
      state.role = action.payload?.role
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
