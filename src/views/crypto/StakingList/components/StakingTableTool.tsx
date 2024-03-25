import { Button } from '@/components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const StakingTableTool = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      <Link className="block lg:inline-block md:mb-0 mb-4" to="/app/user-new">
        <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
          Thêm người dùng
        </Button>
      </Link>
    </div>
  )
}

export default StakingTableTool
