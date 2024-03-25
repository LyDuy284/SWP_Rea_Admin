import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
  deletePost,
  getPostList,
  toggleDeleteConfirmation,
  useAppDispatch,
  useAppSelector,
} from '../store'

const StakingDeleteConfirmation = () => {
  const dispatch = useAppDispatch()
  const dialogOpen = useAppSelector(
    (state) => state.postList.data.deleteConfirmation
  )
  const selectedProduct = useAppSelector(
    (state) => state.postList.data.selected
  )
  const tableData = useAppSelector((state) => state.postList.data.tableData)

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false))
  }

  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false))
    const success = await deletePost({ id: selectedProduct })

    if (success) {
      dispatch(getPostList({}))
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
      title="Delete user"
      confirmButtonColor="red-600"
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      onCancel={onDialogClose}
      onConfirm={onDelete}
    >
      <p>
        Are you sure you want to delete this user? All record related to this
        user will be deleted as well. This action cannot be undone.
      </p>
    </ConfirmDialog>
  )
}

export default StakingDeleteConfirmation
