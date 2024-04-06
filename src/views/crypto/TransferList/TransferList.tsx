// import { AdaptableCard } from '@/components/shared'
// import StakingTable from './components/StakingTable'
// import { injectReducer } from '@/store'
// import reducer from './store'

import { AdaptableCard } from '@/components/shared'
import TransferListTable from './components/TransferListTable'

// injectReducer('postList', reducer)

const TransferList = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Giao Dịch</h3>
      </div>
      <TransferListTable />
    </AdaptableCard>
  )
}

export default TransferList
