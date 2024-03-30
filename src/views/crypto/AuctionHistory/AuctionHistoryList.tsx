import { AdaptableCard } from "@/components/shared"
import AuctionHistoryListTable from "./components/AuctionHistoryListTable"

const TransferList = () => {
    return (
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="lg:flex items-center justify-between mb-4">
          <h3 className="mb-4 lg:mb-0">Transfer</h3>
        </div>
        <AuctionHistoryListTable />
      </AdaptableCard>
    )
  }
  
  export default TransferList
  