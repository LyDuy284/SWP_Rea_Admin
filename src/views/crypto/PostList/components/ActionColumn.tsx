import useThemeClass from '@/utils/hooks/useThemeClass'
import { HiOutlineEye } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store'

const ActionColumn = ({ row }: { row: any }) => {
  const dispatch = useAppDispatch()
  const { textTheme } = useThemeClass()
  const navigate = useNavigate()

  const onView = () => {
    navigate(`/app/post-view/${row.id}`)
  }

  return (
    <div className="flex justify-end text-lg">
      <span
        className={`cursor-pointer p-2 hover:${textTheme}`}
        onClick={onView}
      >
        <HiOutlineEye />
      </span>
    </div>
  )
}

export default ActionColumn
