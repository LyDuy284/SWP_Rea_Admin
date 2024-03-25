import DataTable from '@/components/shared/DataTable'
import Avatar from '@/components/ui/Avatar'
import { cloneDeep } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FiPackage } from 'react-icons/fi'

import { Staking } from '@/@types/staking'
import type {
  ColumnDef,
  DataTableResetHandle,
  OnSortParam,
} from '@/components/shared/DataTable'
import cleanHtml from '@/utils/cleanHtml'
import {
  getStakingList,
  setTableData,
  useAppDispatch,
  useAppSelector,
} from '../store'
import StakingDeleteConfirmation from './StakingDeleteConfirmation'
import ActionColumn from './ActionColumn'
import { apiActiveStaking, apiDeleteStaking } from '@/services/StakingService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

const StakingColumn = ({ row }: { row: Staking }) => {
  const avatar = row.image ? (
    <Avatar src={row.image} />
  ) : (
    <Avatar icon={<FiPackage />} />
  )
  return (
    <div className="flex items-center">
      {avatar}
      <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
    </div>
  )
}

const roles: any = { 0: 'admin', 1: 'Guest', 2: 'Staff', 3: 'Member' }

const StakingTable = () => {
  const tableRef = useRef<DataTableResetHandle>(null)
  const dispatch = useAppDispatch()
  const { page, size, sort, query, count } = useAppSelector(
    (state) => state.stakingList.data.tableData
  )

  const filterData = useAppSelector(
    (state) => state.stakingList.data.filterData
  )

  const loading = useAppSelector((state) => state.stakingList.data.loading)

  const data = useAppSelector((state) => state.stakingList.data.stakingList)

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: 'Tên',
        cell: (props) => {
          const row = props.row.original
          return `${row.lastName}`
        },
      },
      {
        header: 'Username',
        cell: (props) => {
          const row = props.row.original
          return `${row.username}`
        },
      },
      {
        header: 'Email',
        cell: (props) => {
          const row = props.row.original
          return row.email
        },
      },
      {
        header: 'Số điện thoại',
        cell: (props) => {
          const row = props.row.original
          return row.phone
        },
      },
      {
        header: 'Vai trò',
        sortable: false,
        cell: (props) => {
          const row = props.row.original
          return roles[row.role as any] || '--'
        },
      },
      {
        header: 'Xác minh',
        sortable: false,
        cell: (props) => {
          const row = props.row.original
          return <ActionVerify cell={row} />
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

  function ActionVerify(row: any) {
    const [checked, setChecked] = useState(row.cell.isActive)

    const handleChange = async (event: any) => {
      try {
        const check = event.target.checked
        setChecked(check)

        // call api
        if (check) {
          await apiActiveStaking({ id: row.cell.id })
        } else {
          await apiDeleteStaking({ id: row.cell.id })
        }

        toast.push(
          <Notification title={'Xác minh'} type="success" duration={2500}>
            Cập nhật thành công
          </Notification>,
          {
            placement: 'top-center',
          }
        )
      } catch (error) {
        toast.push(
          <Notification title={'Xác minh'} duration={2500}>
            Cập nhật thất bại
          </Notification>,
          {
            placement: 'top-center',
          }
        )
      }
    }

    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={checked}
          onChange={handleChange}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    )
  }

  useEffect(() => {
    fetchData()
  }, [page, size, sort])

  const fetchData = () => {
    dispatch(getStakingList({}))
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
