import { AdaptableCard } from '@/components/shared'
import PaymentListTable from './components/PaymentListTable'

// injectReducer('postList', reducer)

const PaymentList = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Payment</h3>
      </div>
      <PaymentListTable />
    </AdaptableCard>
  )
}

export default PaymentList