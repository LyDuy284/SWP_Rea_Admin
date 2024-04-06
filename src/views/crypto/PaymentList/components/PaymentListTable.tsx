import DataTable from '@/components/shared/DataTable'
import { useEffect, useMemo, useRef, useState } from 'react'

import type {
  ColumnDef,
  DataTableResetHandle,
} from '@/components/shared/DataTable'
import { apiGetAutionList } from '@/services/AutionService'
import { HiOutlineEye } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { apiGetPaymentList } from '@/services/PaymentService'
// import { getPostList, useAppDispatch, useAppSelector } from '../store'
// import ActionColumn from './ActionColumn'
// import StakingDeleteConfirmation from './StakingDeleteConfirmation'

const AutionListTable = () => {
  const tableRef = useRef<DataTableResetHandle>(null)
  // const dispatch = useAppDispatch()
  // const { page, size, sort, query, count } = useAppSelector(
  //   (state) => state.postList.data.tableData
  // )

  // const filterData = useAppSelector((state) => state.postList.data.filterData)

  // const loading = useAppSelector((state) => state.postList.data.loading)

  // const data = useAppSelector((state) => state.postList.data.postList)
  const navigate = useNavigate()

  const [payment, setPayment] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await apiGetPaymentList<any, any>({})

    setPayment(data.result)
  }

  
  console.log(payment)

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: 'Tên',
        cell: (props) => {
          const row = props.row.original
          return <span className="line-clamp-1 max-w-[300px]">{row.user.username}</span>
        },
      },
      {
        header: 'Giá',
        cell: (props) => {
          const row = props.row.original
          const formattedAmount = row.amount.toLocaleString();
          return <span className="line-clamp-1 max-w-[300px]">{formattedAmount} VNĐ</span>
        },
      },
      {
        header: 'Đấu giá',
        cell: (props) => {
          const row = props.row.original
          return <span className="line-clamp-1 max-w-[300px]">{row.auction.name}</span>
        },
      },
      {
        header: 'Hình thức thanh toán',
        cell: (props) => {
          const row = props.row.original
          return <span className="line-clamp-1 max-w-[300px]">{row.transactionType.name}</span>
        },
      },
      {
        header: 'Ngày bắt đầu',
        // sortable: false,
        cell: (props) => {
          const row = props.row.original
          return new Date(row?.createdAt).toLocaleDateString()
        },
      },
      {
        header: 'Trạng thái',
        cell: (props) => {
          const row = props.row.original
          const statusMapping: { [key: number]: string } = {
            0: 'Unpaid',
            1: 'Paid',
            
          };
          const status = statusMapping[row.transactionStatus] || '--';
          return status;
        },
      },
      
      
    ],
    []
  )

  // useEffect(() => {
  //   fetchData()
  // }, [page, size, sort])

  // const fetchData = () => {
  //   dispatch(getPostList({}))
  // }
  const totalItem: any = {
    size: payment.length,
    page: 1,
    count: payment.length,
  }
  return (
    <>
      <DataTable
        ref={tableRef}
        columns={columns}
        data={payment}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        // loading={loading}
        disabledPaginate
        pagingData={totalItem}
      />
      {/* <StakingDeleteConfirmation /> */}
    </>
  )
}

export default AutionListTable
