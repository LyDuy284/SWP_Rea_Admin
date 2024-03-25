import useThemeClass from '@/utils/hooks/useThemeClass'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {
  setSelectedStaking,
  toggleDeleteConfirmation,
  useAppDispatch,
} from '../store'

const ActionColumn = ({ row }: { row: any }) => {
  const dispatch = useAppDispatch()
  const { textTheme } = useThemeClass()
  const navigate = useNavigate()

  const onEdit = () => {
    navigate(`/app/user-edit/${row.id}`)
  }

  // const onDelete = () => {
  //   dispatch(toggleDeleteConfirmation(true))
  //   dispatch(setSelectedStaking(row.id))
  // }

  return (
    <div className="flex justify-end text-lg">
      <span
        className={`cursor-pointer p-2 hover:${textTheme}`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      {/* <span
        className="cursor-pointer p-2 hover:text-red-500"
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span> */}
    </div>
  )
}

export default ActionColumn
