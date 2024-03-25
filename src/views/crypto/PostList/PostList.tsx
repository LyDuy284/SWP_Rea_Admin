import { AdaptableCard } from '@/components/shared'
import StakingTable from './components/StakingTable'
import { injectReducer } from '@/store'
import reducer from './store'

injectReducer('postList', reducer)

const PostList = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Bài viết</h3>
      </div>
      <StakingTable />
    </AdaptableCard>
  )
}

export default PostList
