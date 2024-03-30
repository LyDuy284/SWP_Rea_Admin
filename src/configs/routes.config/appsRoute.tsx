import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import type { Routes } from '@/@types/routes';
import VNPayFailurePage from '../../views/crypto/VNPay/Failed';

const VNPaySuccessPage = lazy(() => import('../../views/crypto/VNPay/Failed'));

const appsRoute: Routes = [
  {
    key: 'apps.dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    component: lazy(() => import('@/views/crypto/Dashboard')),
    authority: [],
  },
  {
    key: 'apps.user',
    path: `${APP_PREFIX_PATH}/user`,
    component: lazy(() => import('@/views/crypto/StakingList')),
    authority: [],
  },
  {
    key: 'apps.userNew',
    path: `${APP_PREFIX_PATH}/user-new`,
    component: lazy(() => import('@/views/crypto/StakingNew')),
    authority: [],
  },
  {
    key: 'apps.userEdit',
    path: `${APP_PREFIX_PATH}/user-edit/:id`,
    component: lazy(() => import('@/views/crypto/StakingNew')),
    authority: [],
  },
  {
    key: 'apps.post',
    path: `${APP_PREFIX_PATH}/post`,
    component: lazy(() => import('@/views/crypto/PostList')),
    authority: [],
  },
  {
    key: 'apps.postView',
    path: `${APP_PREFIX_PATH}/post-view/:id`,
    component: lazy(() => import('@/views/crypto/PostView')),
    authority: [],
  },
  {
    key: 'apps.auction',
    path: `${APP_PREFIX_PATH}/auction`,
    component: lazy(() => import('@/views/crypto/AutionList')),
    authority: [],
  }, 
  {
    key: 'apps.autionView',
    path: `${APP_PREFIX_PATH}/aution-view/:id`,
    component: lazy(() => import('@/views/crypto/AutionView')),
    authority: [],
  },
  {
    key: 'apps.transfer',
    path: `${APP_PREFIX_PATH}/transfer`,
    component: lazy(() => import('@/views/crypto/TransferList')),
    authority: [],
  },
  {
    key: 'apps.transferView',
    path: `${APP_PREFIX_PATH}/transfer-view/:id`,
    component: lazy(() => import('@/views/crypto/TrasferView')),
    authority: [],
  },
  {
    key: 'apps.transferView',
    path: `${APP_PREFIX_PATH}/paymentsuccess`,
    component: lazy(() => import('@/views/crypto/VNPay/Success')),
    authority: [],
  },
  {
    key: 'apps.transferView',
    path: `${APP_PREFIX_PATH}/paymentfailure`,
    component: lazy(() => import('@/views/crypto/VNPay/Failed')),
    authority: [],
  },
  {
    key: 'apps.payment',
    path: `${APP_PREFIX_PATH}/payment`,
    component: lazy(() => import('@/views/crypto/PaymentList')),
    authority: [],
  },
  {
    key: 'apps.auctionhistory',
    path: `${APP_PREFIX_PATH}/auctionhistory`,
    component: lazy(() => import('@/views/crypto/AuctionHistory')),
    authority: [],
  },
  {
    key: 'apps.settings',
    path: `${APP_PREFIX_PATH}/account/settings/:tab`,
    component: lazy(() => import('@/views/account/Settings')),
    authority: [],
    meta: {
      header: 'Settings',
      headerContainer: true,
    },
  },
]

export default appsRoute
