import DataTable from '@/components/shared/DataTable'
import { useEffect, useMemo, useRef, useState } from 'react'

import type {
  ColumnDef,
  DataTableResetHandle,
} from '@/components/shared/DataTable'
import { HiOutlineEye } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { apiGetAutionHistoryList } from '@/services/AuctionHistoryService'
// import { getPostList, useAppDispatch, useAppSelector } from '../store'
// import ActionColumn from './ActionColumn'
// import StakingDeleteConfirmation from './StakingDeleteConfirmation'

const AuctionHistoryListTable = () => {
  const tableRef = useRef<DataTableResetHandle>(null)
  const navigate = useNavigate()
  const [autionsHistory, setAutionsHistory] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await apiGetAutionHistoryList<any, any>({})

    setAutionsHistory(data.result)
  }


  console.log(autionsHistory)

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
        header: 'Tên Đấu Giá',
        cell: (props) => {
          const row = props.row.original
          return <span className="line-clamp-1 max-w-[300px]">{row.auction.name}</span>
        },
      },
      {
        header: 'Giá',
        cell: (props) => {
          const row = props.row.original;
          const formattedBiddingAmount = row.biddingAmount.toLocaleString();
          return <span className="line-clamp-1 max-w-[300px]">{formattedBiddingAmount} VNĐ</span>;
        },
      },
      {
        header: 'Ngày',
        // sortable: false,
        cell: (props) => {
          const row = props.row.original
          return new Date(row?.createdAt).toLocaleDateString()
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
    size: autionsHistory.length,
    page: 1,
    count: autionsHistory.length,
  }
  return (
    <>
      <DataTable
        ref={tableRef}
        columns={columns}
        data={autionsHistory}
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

export default AuctionHistoryListTable
