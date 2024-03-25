// import { AdaptableCard } from '@/components/shared'
// import StakingTable from './components/StakingTable'
// import { injectReducer } from '@/store'
// import reducer from './store'

import { AdaptableCard } from '@/components/shared'
import AutionListTable from './components/AutionListTable'

// injectReducer('postList', reducer)

const AutionList = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Đấu giá</h3>
      </div>
      <AutionListTable />
    </AdaptableCard>
  )
}

export default AutionList
