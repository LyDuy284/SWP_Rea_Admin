import DataTable from '@/components/shared/DataTable'
import { useEffect, useMemo, useRef, useState } from 'react'

import type {
  ColumnDef,
  DataTableResetHandle,
} from '@/components/shared/DataTable'
import { apiGetAutionList } from '@/services/AutionService'
import { HiOutlineEye } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
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

  const [autions, setAutions] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await apiGetAutionList<any, any>({})

    setAutions(data.result)
  }

  const onView = (id: number) => {
    navigate(`/app/aution-view/${id}`)
  }
  console.log(autions)

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: 'Hình ảnh',
        cell: (props) => {
          const row = props.row.original
          return (
            <img
              src={row.auctionImages[0]}
              className="line-clamp-1 max-w-[100px]"
            />
          )
        },
      },
      {
        header: 'Tiêu đề',
        cell: (props) => {
          const row = props.row.original
          return <span className="line-clamp-1 max-w-[300px]">{row.name}</span>
        },
      },
      {
        header: 'Trạng thái',
        cell: (props) => {
          const row = props.row.original
          return row.auctionStatus || '--'
        },
      },
      {
        header: 'Ngày bắt đầu',
        // sortable: false,
        cell: (props) => {
          const row = props.row.original
          return new Date(row?.biddingStartTime).toLocaleDateString()
        },
      },
      {
        header: 'Ngày kết thúc',
        // sortable: false,
        cell: (props) => {
          const row = props.row.original
          return new Date(row?.biddingEndTime).toLocaleDateString()
        },
      },
      {
        header: 'Xem chi tiết',
        // sortable: false,
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex justify-center text-lg">
              <span
                className={`cursor-pointer p-2`}
                onClick={(e) => onView(row.id)}
              >
                <HiOutlineEye />
              </span>
            </div>
          )
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
    size: autions.length,
    page: 1,
    count: autions.length,
  }
  return (
    <>
      <DataTable
        ref={tableRef}
        columns={columns}
        data={autions}
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
