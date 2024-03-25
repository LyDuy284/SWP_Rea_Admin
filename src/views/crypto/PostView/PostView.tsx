import { Loading } from '@/components/shared'
import { apiGetPostById } from '@/services/PostService'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PostView = () => {
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
        const data = await apiGetPostById({ id })
        setPost(data)
        setLoading(false)
      } catch (error) {
        console.log({ error })
        setLoading(false)
      }
    })()
  }, [])

  const handleDiscard = () => {
    navigate('/app/post-list')
  }

  return (
    <div className="w-full">
      <Loading loading={loading}>
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-1 text-lg mb-4">
            <Link
              to="/app/post-list"
              className={`hover:${textTheme} transition-all`}
            >
              Bài viết
            </Link>
            <div>/ Chi tiết bài viết</div>
          </div>
          <div className="w-full">
            <img
              src={image || post?.propertyImages?.[0]}
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
          <div className="flex my-2">
            {post?.propertyImages?.map((url: string, index: number) => (
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
              Người đăng:{' '}
              <span className="opacity-80">
                {post?.author?.firstName} {post?.author?.lastName}
              </span>
            </h6>
            <h6>
              Email: <span className="opacity-80">{post?.author?.email}</span>
            </h6>
            <h6>
              Kiểu:{' '}
              <span className="opacity-80">{post?.propertyType?.name}</span>
            </h6>
            <h6>
              Tên tài sản:{' '}
              <span className="opacity-80">{post?.propertyName}</span>
            </h6>
            <h6>
              Giá:{' '}
              <span className="opacity-80">
                {post?.propertyRevervePrice} VND
              </span>
            </h6>
            <h6>
              Địa chỉ:{' '}
              <span className="opacity-80">
                {post?.propertyStreet}, {post?.propertyWard},{' '}
                {post?.propertyCity}, {post?.propertyDistrict}
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

export default PostView
