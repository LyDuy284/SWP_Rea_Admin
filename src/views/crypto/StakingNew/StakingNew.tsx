import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import {
  apiCreateStaking,
  apiDeleteStaking,
  apiUpdateStaking,
} from '@/services/StakingService'
import { useNavigate, useParams } from 'react-router-dom'
import StakingForm, { InitialData, SetSubmitting } from '../StakingForm'

const StakingNew = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const addUser = async (data: InitialData) => {
    const response = await apiCreateStaking(data)
    return response
  }

  const updateUser = async (data: any) => {
    console.log('🍕 ~ data:', data)
    if (!id) return
    const response = await apiUpdateStaking({
      id: +id!,
      payload: { ...data, bankId: +data.bankId, gender: 0 },
    })
    return response
  }

  const handleFormSubmit = async (
    values: InitialData,
    setSubmitting: SetSubmitting
  ) => {
    try {
      setSubmitting(true)
      let success
      if (!id) {
        if (values.password.length < 6) {
          toast.push(
            <Notification title={'Lỗi'} duration={2500}>
              Mật khẩu phải từ 6 kí tự trở lên!
            </Notification>,
            {
              placement: 'top-center',
            }
          )

          setSubmitting(false)
          return
        }

        success = await addUser(values)
      } else {
        success = await updateUser(values)
      }

      setSubmitting(false)
      if (success) {
        toast.push(
          <Notification
            title={'Xử lý thành công'}
            type="success"
            duration={2500}
          >
            Xử lý thành công
          </Notification>,
          {
            placement: 'top-center',
          }
        )
        navigate('/app/user')
      }
    } catch (error: any) {
      toast.push(
        <Notification title={'Lỗi'} duration={2500}>
          {error.response.data.responseException.exceptionMessage ||
            error.message ||
            error}
        </Notification>,
        {
          placement: 'top-center',
        }
      )
      setSubmitting(false)
    }
  }

  const handleDeleteStaking = async () => {
    if (!id) return
    const success = await apiDeleteStaking({ id })
    if (success) {
      toast.push(
        <Notification title={'Xoá thành công'} type="success" duration={2500}>
          Xoá thành công
        </Notification>,
        {
          placement: 'top-center',
        }
      )
      navigate('/app/user')
    }
  }

  const handleDiscard = () => {
    navigate('/app/user')
  }

  return (
    <>
      <StakingForm
        type={id ? 'edit' : 'new'}
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        onDelete={handleDeleteStaking}
      />
    </>
  )
}

export default StakingNew
