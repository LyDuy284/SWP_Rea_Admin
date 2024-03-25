import { Staking } from '@/@types/staking'
import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { apiGetStakingById } from '@/services/StakingService'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StakingImage from '../StakingNew/components/StakingImage'
import classNames from 'classnames'
import { DatePicker, Select } from '@/components/ui'

type FormFieldsName = {
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
  role: number

  dateOfBirth?: string
  phone?: string
  address?: string
  gender?: number
  identityId?: string
  issuedDate?: string
  issuedPlace?: string
  bankNumber?: string
  bankId?: number
  bankNameHolder?: string
}

type BasicInformationFields = {
  touched: FormikTouched<FormFieldsName>
  errors: FormikErrors<FormFieldsName>
  values: FormFieldsName
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<FormFieldsName>>
}

const roles = [
  { label: 'Admin', value: 0 },
  { label: 'Staff', value: 2 },
  { label: 'Member', value: 3 },
]

const BasicInformationFields = (props: BasicInformationFields) => {
  const { touched, errors, setFieldValue, values } = props
  const { id } = useParams()

  useEffect(() => {
    fetchStakingById()
  }, [id])

  const fetchStakingById = async () => {
    try {
      if (!id) return
      const data = await apiGetStakingById<Staking, { id: string }>({
        id,
      })

      if (data) {
        setFieldValue('firstName', data.firstName)
        setFieldValue('lastName', data.lastName)
        setFieldValue('username', data?.username)
        setFieldValue('password', data?.password)
        setFieldValue('email', data?.email)
        setFieldValue('role', data?.role)
        const dateOfBirthString = data?.dateOfBirth
        const dateOfBirth = new Date(dateOfBirthString)
        dateOfBirth.setDate(dateOfBirth.getDate() + 1)
        setFieldValue('dateOfBirth', dateOfBirth)
        setFieldValue('phone', data?.phone)
        setFieldValue('address', data?.address)
        setFieldValue('gender', data?.gender)
        setFieldValue('identityId', data?.identityId)
        const issuedDateString = data?.issuedDate
        const issuedDate = new Date(issuedDateString)
        issuedDate.setDate(issuedDate.getDate() + 1)
        setFieldValue('issuedDate', issuedDate)
        setFieldValue('issuedPlace', data?.issuedPlace)
        setFieldValue('bankNumber', data?.bankNumber)
        setFieldValue('bankId', data?.bankId)
        setFieldValue('bankNameHolder', data?.bankNameHolder)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <AdaptableCard divider className="mb-4">
      <h5>{!id ? 'Người dùng mới' : 'Cập nhật người dùng'}</h5>
      <p className="mb-6">Nhập thông tin người dùng</p>
      <FormItem
        label="Họ"
        invalid={(errors.firstName && touched.firstName) as boolean}
        errorMessage={errors.firstName}
      >
        <Field
          type="text"
          autoComplete="off"
          name="firstName"
          placeholder="Nhập họ"
          component={Input}
        />
      </FormItem>

      <FormItem
        label="Tên"
        invalid={(errors.lastName && touched.lastName) as boolean}
        errorMessage={errors.lastName}
      >
        <Field
          type="text"
          autoComplete="off"
          name="lastName"
          placeholder="Nhập tên"
          component={Input}
        />
      </FormItem>

      {!id && (
        <>
          <FormItem
            label="Email"
            invalid={(errors.email && touched.email) as boolean}
            errorMessage={errors.email}
          >
            <Field
              type="text"
              autoComplete="off"
              name="email"
              placeholder="Nhập Email"
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Username"
            invalid={(errors.username && touched.username) as boolean}
            errorMessage={errors.username}
          >
            <Field
              type="text"
              autoComplete="off"
              name="username"
              placeholder="username"
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Mật khẩu"
            invalid={(errors.password && touched.password) as boolean}
            errorMessage={errors.password}
          >
            <Field
              type="password"
              autoComplete="off"
              name="password"
              placeholder="Nhập mật khẩu"
              component={Input}
            />
          </FormItem>
        </>
      )}

      {id && (
        <>
          <FormItem
            label="Số điện thoại"
            invalid={(errors.phone && touched.phone) as boolean}
            errorMessage={errors.phone}
          >
            <Field
              type="text"
              autoComplete="off"
              name="phone"
              placeholder="Nhập số điện thoại"
              component={Input}
            />
          </FormItem>
          {/* <FormItem
            label="Ngày sinh"
            invalid={(errors.dateOfBirth && touched.dateOfBirth) as boolean}
            errorMessage={errors.dateOfBirth}
          >
            <DatePicker
              value={(values.dateOfBirth || null) as Date | null}
              placeholder="Pick a date"
              onChange={(e) => {
                const year = e!.getFullYear()
                const month = String(e!.getMonth() + 1).padStart(2, '0')
                const day = String(e!.getDate()).padStart(2, '0')
                const hours = String(e!.getUTCHours()).padStart(2, '0')
                const minutes = String(e!.getUTCMinutes()).padStart(2, '0')
                const seconds = String(e!.getUTCSeconds()).padStart(2, '0')
                const milliseconds = String(e!.getUTCMilliseconds()).padStart(
                  3,
                  '0'
                )

                const isoString = `${year}-${month}-${
                  day + 1
                }T${hours}:${minutes}:${seconds}.${milliseconds}Z`
                setFieldValue('dateOfBirth', e)
              }}
            />
          </FormItem>

          <FormItem
            label="Danh tính"
            invalid={(errors.identityId && touched.identityId) as boolean}
            errorMessage={errors.identityId}
          >
            <Field
              type="text"
              autoComplete="off"
              name="identityId"
              placeholder="identityId"
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Ngày ban hành"
            invalid={(errors.issuedDate && touched.issuedDate) as boolean}
            errorMessage={errors.issuedDate}
          >
            <DatePicker
              value={new Date(values.issuedDate || new Date())}
              placeholder="Pick a date"
              onChange={(e) => {
                const originalDate = new Date(e as Date)
                const year = originalDate.getFullYear()
                const month = String(originalDate.getMonth() + 1).padStart(
                  2,
                  '0'
                )
                const day = String(originalDate.getDate()).padStart(2, '0')
                const hours = String(originalDate.getUTCHours()).padStart(
                  2,
                  '0'
                )
                const minutes = String(originalDate.getUTCMinutes()).padStart(
                  2,
                  '0'
                )
                const seconds = String(originalDate.getUTCSeconds()).padStart(
                  2,
                  '0'
                )
                const milliseconds = String(
                  originalDate.getUTCMilliseconds()
                ).padStart(3, '0')

                const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
                setFieldValue('issuedDate', isoString)
              }}
            />
          </FormItem>
          <FormItem
            label="Nơi cấp"
            invalid={(errors.issuedPlace && touched.issuedPlace) as boolean}
            errorMessage={errors.issuedPlace}
          >
            <Field
              type="text"
              autoComplete="off"
              name="issuedPlace"
              placeholder="issuedPlace"
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Ngân hàng Id"
            invalid={(errors.bankId && touched.bankId) as boolean}
            errorMessage={errors.bankId}
          >
            <Field
              type="text"
              autoComplete="off"
              name="bankId"
              placeholder="bankId"
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Số ngân hàng"
            invalid={(errors.bankNumber && touched.bankNumber) as boolean}
            errorMessage={errors.bankNumber}
          >
            <Field
              type="text"
              autoComplete="off"
              name="bankNumber"
              placeholder="bankNumber"
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Địa chỉ"
            invalid={(errors.address && touched.address) as boolean}
            errorMessage={errors.address}
          >
            <Field
              type="text"
              autoComplete="off"
              name="address"
              placeholder="address"
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Người giữ tên ngân hàng"
            invalid={
              (errors.bankNameHolder && touched.bankNameHolder) as boolean
            }
            errorMessage={errors.bankNameHolder}
          >
            <Field
              type="text"
              autoComplete="off"
              name="bankNameHolder"
              placeholder="bankNameHolder"
              component={Input}
            />
          </FormItem> */}
        </>
      )}

      {!id && (
        <FormItem
          label="Vai trò"
          invalid={(errors.role && touched.role) as boolean}
          errorMessage={errors.role}
        >
          <Field name="role">
            {({ field, form }: FieldProps) => (
              <Select
                field={field}
                form={form}
                options={roles}
                value={roles.filter((role) => role.value === values.role)}
                onChange={(option) =>
                  form.setFieldValue(field.name, option?.value)
                }
              />
            )}
          </Field>
        </FormItem>
      )}
    </AdaptableCard>
  )
}

export default BasicInformationFields
