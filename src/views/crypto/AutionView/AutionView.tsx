import { Loading } from '@/components/shared'
import { apiGetAutionById } from '@/services/AutionService'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AutionView = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [post, setPost] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { textTheme } = useThemeClass()
  const [image, setImage] = useState('')

  useEffect(() => {
    if (!id) return
    ;(async () => {
      try {
        setLoading(true)
        const data = await apiGetAutionById({ id })
        setPost(data)
        setLoading(false)
      } catch (error) {
        console.log({ error })
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="w-full">
      <Loading loading={loading}>
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-1 text-lg mb-4">
            <Link
              to="/app/post-list"
              className={`hover:${textTheme} transition-all`}
            >
              Đấu giá
            </Link>
            <div>/ Chi tiết</div>
          </div>
          <div className="w-full">
            <img
              src={image || post?.auctionImages?.[0]}
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
          <div className="flex my-2">
            {post?.auctionImages?.map((url: string, index: number) => (
              <img
                key={index}
                src={url}
                className="w-full h-full object-cover rounded-sm max-w-[70px] max-h-[70px] mx-1"
                onClick={(e) => setImage(url)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h6>
              Tên: <span className="opacity-80">{post?.name}</span>
            </h6>
            <h6>
              Giá niêm yết:{' '}
              <span className="opacity-80">{post?.finalPrice} VND</span>
            </h6>
            <h6>
              Giá khởi điểm:{' '}
              <span className="opacity-80">{post?.revervePrice} VND</span>
            </h6>
            <h6>
              Thời gian bắt đầu:{' '}
              <span className="opacity-80">
                {new Date(post?.biddingStartTime).toLocaleDateString()}
              </span>
            </h6>
            <h6>
              Thời gian kết thúc:{' '}
              <span className="opacity-80">
                {' '}
                {new Date(post?.biddingEndTime).toLocaleDateString()}
              </span>
            </h6>
            <h6>
              Địa chỉ:{' '}
              <span className="opacity-80">
                {post?.property?.street}, {post?.property?.ward},{' '}
                {post?.property?.city}, ,{post?.property?.district}.
              </span>
            </h6>
          </div>
          <div className="mt-6">
            <h3>{post?.title}</h3>
          </div>
          <div className="mt-4">
            <p className="text-base">{post?.content}</p>
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default AutionView
