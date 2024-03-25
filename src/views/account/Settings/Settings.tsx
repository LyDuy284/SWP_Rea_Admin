import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import Tabs from '@/components/ui/Tabs'
import isEmpty from 'lodash/isEmpty'
import { Suspense, lazy, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type AccountSetting = {
  profile: {
    name: string
    email: string
    title: string
    avatar: string
    timeZone: string
    lang: string
    syncData: boolean
  }
}

type GetAccountSettingData = AccountSetting

const Password = lazy(() => import('./components/Password'))

const { TabNav, TabList } = Tabs

const settingsMenu: Record<
  string,
  {
    label: string
    path: string
  }
> = {
  password: { label: 'Password', path: 'password' },
}

const Settings = () => {
  const [currentTab, setCurrentTab] = useState('password')
  const [data, setData] = useState<Partial<AccountSetting>>({})

  const navigate = useNavigate()

  const location = useLocation()

  const path = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )

  const onTabChange = (val: string) => {
    setCurrentTab(val)
    navigate(`/app/account/settings/${val}`)
  }

  const fetchData = async () => {}

  useEffect(() => {
    setCurrentTab(path)
    if (isEmpty(data)) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <AdaptableCard>
        <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
          <TabList>
            {Object.keys(settingsMenu).map((key) => (
              <TabNav key={key} value={key}>
                {settingsMenu[key].label}
              </TabNav>
            ))}
          </TabList>
        </Tabs>
        <div className="px-4 py-6">
          <Suspense fallback={<></>}>
            {currentTab === 'password' && <Password />}
          </Suspense>
        </div>
      </AdaptableCard>
    </Container>
  )
}

export default Settings
