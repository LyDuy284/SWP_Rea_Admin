import { Chart, Loading } from '@/components/shared'
import { Card } from '@/components/ui'
import { COLORS } from '@/constants/chart.constant'
import { apiGetPostList } from '@/services/PostService'
import { apiGetStakingList } from '@/services/StakingService'
import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import TopProduct from './TopProduct'
import { apiGetAuctionState } from '@/services/AuctionStatusService'
import { apiGetUserByMonth } from '@/services/ApiUserMonth'

function countPostsByMonth(posts: any, range: any) {
  const postCounts: any = {}
  posts &&
    posts.length > 0 &&
    posts.map((post: any) => {
      const createdAtMonth = new Date(post.createdAt).getMonth()
      if (!postCounts.hasOwnProperty(createdAtMonth)) {
        postCounts[createdAtMonth] = 0
      }
      postCounts[createdAtMonth]++
    })
  const countsByRange = range.map((month: any, index: any) => {
    return postCounts[index] || 0
  })

  return countsByRange
}

const data = {
  series: [
    {
      name: 'Post',
      data: [],
    },
  ],
  range: [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ],
}
interface AuctionData {
  auctionName: string;
  numberOfUser: number;
}
const Dashboard = () => {
  const [users, setUser] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  const [auctionData, setAuctionData] = useState<any>(null)
  const [auctionData1, setAuctionData1] = useState<AuctionData[]>([]);

  useEffect(() => {
    const postCountsByMonth = countPostsByMonth(posts, data.range)
    setChartData(postCountsByMonth)
  }, [posts])

  useEffect(() => {
    onFetchData()
  }, [])
  const onFetchData = async () => {
    try {
      setLoading(true)
      const response = await apiGetStakingList<any, any>({})
      const response2 = await apiGetPostList<any, any>({})
      setUser(response.data.result)
      setPosts(response2.data.result)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log({ error })
    }
  }

  useEffect(() => {
    fetchAuctionData()
  }, [])

  const fetchAuctionData = async () => {
    try {
      setLoading(true)
      const response = await apiGetAuctionState<any, any>({})
      console.log("Auction Data:", response.data);
      setAuctionData(response.data.result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching auction data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  interface ApiResponse {
    isError: boolean;
    message: string;
    result: AuctionData[];
  }
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await apiGetUserByMonth({});
      const auctionData: AuctionData[] = response.data as AuctionData[];
      console.log("Auction Data Response:", response.data);
      // Now you can set auctionData to the state
      // Type assertion to ApiResponse
      const responseData = response.data as ApiResponse;

      // Set the auction data state with the result array
      setAuctionData1(responseData.result);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching auction data:", error)
    }
  }

  return (
    <div className="w-full">
      <div className="lg:flex items-center justify-between mb-4 gap-3">
        <div className="mb-4 lg:mb-0">
          <h3>Trang chủ</h3>
        </div>
      </div>
      <Loading loading={loading}>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <h6 className="font-semibold mb-4 text-sm">Bài viết</h6>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">
                  <NumericFormat
                    thousandSeparator
                    displayType="text"
                    value={posts.length}
                  />
                </h3>
              </div>
            </div>
          </Card>
          <Card>
            <h6 className="font-semibold mb-4 text-sm">Người dùng</h6>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">
                  <NumericFormat
                    thousandSeparator
                    displayType="text"
                    value={users.length}
                  />
                </h3>
              </div>
            </div>
          </Card>
        </div>
      </Loading>

      <div className="mt-4">
        <Card>
          <h6 className="font-semibold mb-4 text-sm">Số người tham gia theo từng phiên đấu giá</h6>
          <Chart
            series={[
              {
                name: 'Participants',
                data: auctionData1.map(auction => auction.numberOfUser),
              },
            ]}
            xAxis={auctionData1.map(auction => auction.auctionName)}
            type="bar"
            customOptions={{
              colors: ['#33FF57'], // You can adjust colors as needed
              legend: { show: false },
            }}
          />
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <div className="flex items-center justify-between">
            <h4>Thống kê hàng tháng theo năm</h4>
          </div>

          <Chart
            series={[
              {
                name: 'Post',
                data: chartData,
              },
            ]}
            xAxis={data.range}
            type="bar"
            customOptions={{
              colors: [COLORS[0], COLORS[2]],
              legend: { show: false },
            }}
          />
        </Card>
        <TopProduct data={users} />
      </div>

      <Loading loading={loading}>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <h6 className="font-semibold mb-4 text-sm">Số lượng phiên đấu giá theo trạng thái</h6>
            <Chart
              series={[
                {
                  name: 'Auction',
                  data: [
                    auctionData?.comingUpAuction || 0,
                    auctionData?.inProgressAuction || 0,
                    auctionData?.finishedAuction || 0,
                    auctionData?.succeededAuction || 0,
                    auctionData?.failedAuction || 0
                  ],
                },
              ]}
              xAxis={['Coming Up', 'In Progress', 'Finished', 'Succeeded', 'Failed']}
              type="bar"
              customOptions={{
                colors: ['#FF5733', '#33FF57', '#337FFF', '#FF3333'],
                legend: { show: false },
              }}
            />
          </Card>
        </div>
      </Loading>
    </div>

  )
}

export default Dashboard
