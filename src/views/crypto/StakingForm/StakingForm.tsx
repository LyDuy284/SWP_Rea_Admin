import ConfirmDialog from '@/components/shared/ConfirmDialog'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { forwardRef, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import * as Yup from 'yup'
import BasicInformationFields from './BasicInformationFields'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

export type InitialData = {
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
  role: number
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type StakingForm = {
  initialData?: InitialData
  type: 'edit' | 'new'
  onDiscard?: () => void
  onDelete?: OnDelete
  onFormSubmit: (formData: InitialData, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('FirstName required'),
  lastName: Yup.string().required('LastName required'),
  username: Yup.string().required('username required'),
  password: Yup.string().required('password required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  role: Yup.number().required('Role required'),
})

const DeleteStakingButton = ({ onDelete }: { onDelete: OnDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const onConfirmDialogOpen = () => {
    setDialogOpen(true)
  }

  const onConfirmDialogClose = () => {
    setDialogOpen(false)
  }

  const handleConfirm = () => {
    onDelete?.(setDialogOpen)
  }

  return (
    <>
      {/* <Button
        className="text-red-600"
        variant="plain"
        size="sm"
        icon={<HiOutlineTrash />}
        type="button"
        onClick={onConfirmDialogOpen}
      >
        Xoá
      </Button> */}
      <ConfirmDialog
        isOpen={dialogOpen}
        type="danger"
        title="Xoá người dùng"
        confirmButtonColor="red-600"
        onClose={onConfirmDialogClose}
        onRequestClose={onConfirmDialogClose}
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
      >
        <p>
          Bạn có chắc chắn muốn xóa người dùng này? Tất cả hồ sơ liên quan đến
          người dùng này cũng sẽ bị xóa. Hành động này không thể được hoàn tác.
        </p>
      </ConfirmDialog>
    </>
  )
}

const StakingForm = forwardRef<FormikRef, StakingForm>((props, ref) => {
  const {
    type,
    initialData = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      role: 0,

      dateOfBirth: '',
      phone: '',
      address: '',
      gender: 0,
      identityId: '',
      issuedDate: '',
      issuedPlace: '',
      bankNumber: '',
      bankId: 0,
      bankNameHolder: '',
    },
    onFormSubmit,
    onDiscard,
    onDelete,
  } = props

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={{
          ...initialData,
        }}
        validationSchema={validationSchema}
        onSubmit={(values: InitialData, { setSubmitting }) => {
          const formData = cloneDeep(values)
          if (type === 'new') {
            onFormSubmit?.(formData, setSubmitting)
          }
          if (type === 'edit') {
            onFormSubmit?.(formData, setSubmitting)
          }
        }}
      >
        {({ values, touched, errors, isSubmitting, setFieldValue }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 gap-4">
                <div className="lg:col-span-2">
                  <BasicInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div>
                  {type === 'edit' && (
                    <DeleteStakingButton onDelete={onDelete as OnDelete} />
                  )}
                </div>
                <div className="md:flex items-center">
                  <Button
                    size="sm"
                    className="ltr:mr-3 rtl:ml-3"
                    type="button"
                    onClick={() => onDiscard?.()}
                  >
                    Quay lại
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    icon={<AiOutlineSave />}
                    type="submit"
                  >
                    {type === 'new' ? 'Lưu' : 'Cập nhật'}
                  </Button>
                </div>
              </StickyFooter>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  )
})

StakingForm.displayName = 'StakingForm'

export default StakingForm
