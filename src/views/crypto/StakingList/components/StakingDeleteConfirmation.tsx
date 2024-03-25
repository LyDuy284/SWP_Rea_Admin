import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
  deleteStaking,
  getStakingList,
  toggleDeleteConfirmation,
  useAppDispatch,
  useAppSelector,
} from '../store'

const StakingDeleteConfirmation = () => {
  const dispatch = useAppDispatch()
  const dialogOpen = useAppSelector(
    (state) => state.stakingList.data.deleteConfirmation
  )
  const selectedProduct = useAppSelector(
    (state) => state.stakingList.data.selected
  )
  const tableData = useAppSelector((state) => state.stakingList.data.tableData)

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false))
  }

  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false))
    const success = await deleteStaking({ id: selectedProduct })

    if (success) {
      dispatch(getStakingList({}))
      toast.push(
        <Notification
          title={'Xoá người dùng thành công!'}
          type="success"
          duration={2500}
        >
          Xoá người dùng thành công!
        </Notification>,
        {
          placement: 'top-center',
        }
      )
    }
  }
  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      type="danger"
      title="Xoá người dùng"
      confirmButtonColor="red-600"
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      onCancel={onDialogClose}
      onConfirm={onDelete}
    >
      <p>
        Bạn có chắc chắn muốn xóa người dùng này? Tất cả hồ sơ liên quan đến
        điều này người dùng cũng sẽ bị xóa. Hành động này không thể được hoàn
        tác.
      </p>
    </ConfirmDialog>
  )
}

export default StakingDeleteConfirmation
