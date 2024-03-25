import type { CommonProps } from '@/@types/common'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import { useAppSelector } from '@/store'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import classNames from 'classnames'
import { HiOutlineCog, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi'
import { Link } from 'react-router-dom'

type DropdownList = {
  label: string
  path: string
  icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
  {
    label: 'Change password',
    path: '/app/account/settings/password',
    icon: <HiOutlineCog />,
  },
]

const roles: any = { 0: 'Admin', 1: 'Guest', 2: 'Staff', 3: 'Member' }

const _UserDropdown = ({ className }: CommonProps) => {
  const { avatarUrl, username, authority, email, role } = useAppSelector(
    (state) => state.auth.user
  )

  const { signOut } = useAuth()

  const UserAvatar = (
    <div className={classNames(className, 'flex items-center gap-2')}>
      <Avatar
        size={32}
        shape="circle"
        src={
          avatarUrl || 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
        }
      />
      <div className="hidden md:block">
        <div className="text-xs capitalize">{email}</div>
        <div className="font-bold">{username}</div>
      </div>
    </div>
  )

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 240 }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <Dropdown.Item variant="header">
          <div className="py-2 px-3 flex items-center gap-2">
            <Avatar
              shape="circle"
              src={
                avatarUrl ||
                'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
              }
            />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                {username}
              </div>
              <div className="text-xs">{roles[role as any]}</div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        {/* {dropdownItemList.map((item) => (
          <Dropdown.Item
            key={item.label}
            eventKey={item.label}
            className="mb-1 px-0"
          >
            <Link className="flex h-full w-full px-2" to={item.path}>
              <span className="flex gap-2 items-center w-full">
                <span className="text-xl opacity-50">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </Link>
          </Dropdown.Item>
        ))} */}
        <Dropdown.Item variant="divider" />
        <Dropdown.Item eventKey="Sign Out" className="gap-2" onClick={signOut}>
          <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span>
          <span>Đăng xuất</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
