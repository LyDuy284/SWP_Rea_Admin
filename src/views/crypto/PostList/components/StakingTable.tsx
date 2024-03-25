import DataTable from '@/components/shared/DataTable'
import { useEffect, useMemo, useRef } from 'react'

import type {
  ColumnDef,
  DataTableResetHandle,
} from '@/components/shared/DataTable'
import { getPostList, useAppDispatch, useAppSelector } from '../store'
import ActionColumn from './ActionColumn'
import StakingDeleteConfirmation from './StakingDeleteConfirmation'

const fakeData = [
  {
    id: 0,
    title: 'string',
    content: 'string',
    reason: 'string',
    propertyName: 'string',
    propertyImages: ['string'],
    propertyStreet: 'string',
    propertyWard: 'string',
    propertyDistrict: 'string',
    propertyCity: 'string',
    propertyArea: 0,
    propertyRevervePrice: 0,
    postStatus: 0,
    createdAt: '2024-03-09T03:23:47.876Z',
    modifiedAt: '2024-03-09T03:23:47.876Z',
    deletedAt: '2024-03-09T03:23:47.876Z',
    authorId: 0,
    author: {
      id: 0,
      createdAt: '2024-03-09T03:23:47.876Z',
      modifiedAt: '2024-03-09T03:23:47.876Z',
      deletedAt: '2024-03-09T03:23:47.876Z',
      username: 'string',
      password: 'string',
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      role: 0,
      dateOfBirth: '2024-03-09T03:23:47.876Z',
      phone: 'string',
      address: 'string',
      gender: 0,
      identityId: 'string',
      issuedDate: '2024-03-09T03:23:47.876Z',
      issuedPlace: 'string',
      bankNumber: 'string',
      bankId: 0,
      bankNameHolder: 'string',
      isActive: true,
      avatarUrl: 'string',
      passwordResetToken: 'string',
      confirmCode: 'string',
      resetTokenExpires: '2024-03-09T03:23:47.876Z',
    },
    approverId: 0,
    approver: {
      id: 0,
      createdAt: '2024-03-09T03:23:47.876Z',
      modifiedAt: '2024-03-09T03:23:47.876Z',
      deletedAt: '2024-03-09T03:23:47.876Z',
      username: 'string',
      password: 'string',
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      role: 0,
      dateOfBirth: '2024-03-09T03:23:47.876Z',
      phone: 'string',
      address: 'string',
      gender: 0,
      identityId: 'string',
      issuedDate: '2024-03-09T03:23:47.876Z',
      issuedPlace: 'string',
      bankNumber: 'string',
      bankId: 0,
      bankNameHolder: 'string',
      isActive: true,
      avatarUrl: 'string',
      passwordResetToken: 'string',
      confirmCode: 'string',
      resetTokenExpires: '2024-03-09T03:23:47.876Z',
    },
    propertyTypeId: 0,
    propertyType: {
      id: 0,
      createdAt: '2024-03-09T03:23:47.876Z',
      modifiedAt: '2024-03-09T03:23:47.876Z',
      deletedAt: '2024-03-09T03:23:47.876Z',
      name: 'string',
    },
  },
]

const StakingTable = () => {
  const tableRef = useRef<DataTableResetHandle>(null)
  const dispatch = useAppDispatch()
  const { page, size, sort, query, count } = useAppSelector(
    (state) => state.postList.data.tableData
  )

  const filterData = useAppSelector((state) => state.postList.data.filterData)

  const loading = useAppSelector((state) => state.postList.data.loading)

  const data = useAppSelector((state) => state.postList.data.postList)

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: 'Hình ảnh',
        cell: (props) => {
          const row = props.row.original
          return (
            <img
              src={row.propertyImages[0]}
              className="line-clamp-1 max-w-[100px]"
            />
          )
        },
      },
      {
        header: 'Tiêu đề',
        cell: (props) => {
          const row = props.row.original
          return <span className="line-clamp-1 max-w-[300px]">{row.title}</span>
        },
      },
      {
        header: 'Tên tài sản',
        cell: (props) => {
          const row = props.row.original
          return row.propertyName || '--'
        },
      },
      {
        header: 'Trạng thái',
        cell: (props) => {
          const row = props.row.original
          return row.postStatus || '--'
        },
      },
      {
        header: 'Người đăng ',
        // sortable: false,
        cell: (props) => {
          const row = props.row.original
          return row?.author?.firstName + ' ' + row?.author?.lastName
        },
      },
      {
        header: '',
        id: 'action',
        cell: (props) => <ActionColumn row={props.row.original} />,
      },
    ],
    []
  )

  useEffect(() => {
    fetchData()
  }, [page, size, sort])

  const fetchData = () => {
    dispatch(getPostList({}))
  }
  const totalItem: any = {
    size: data.length,
    page: 1,
    count: data.length,
  }
  return (
    <>
      <DataTable
        ref={tableRef}
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={loading}
        disabledPaginate
        pagingData={totalItem}
      />
      <StakingDeleteConfirmation />
    </>
  )
}

export default StakingTable
