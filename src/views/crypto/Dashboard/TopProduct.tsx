import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type Product = {
  id: string
  name: string
  img: string
  sold: number
}

type TopProductProps = {
  data?: Product[]
  className?: string
}

const { Tr, Td, TBody, THead, Th } = Table

const roles: any = { 0: 'Admin', 1: 'Guest', 2: 'Staff', 3: 'Member' }

const ProductColumn = ({ row }: { row: any }) => {
  const avatar = row.avatarUrl ? (
    <Avatar src={row.avatarUrl} />
  ) : (
    <Avatar icon={<FiUser />} />
  )

  return (
    <div className="flex items-center gap-2">
      {avatar}
      <span className="font-semibold">{row.lastName}</span>
    </div>
  )
}

const columnHelper = createColumnHelper<any>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Tên',
    cell: (props) => {
      const row = props.row.original
      return <ProductColumn row={row} />
    },
  }),
  columnHelper.accessor('role', {
    header: 'Vai trò',
    cell: (props) => {
      const row = props.row.original
      return roles[row.role]
    },
  }),
]

const TopProduct = ({ data = [], className }: TopProductProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h4>Người dùng</h4>
      </div>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                )
              })}
            </Tr>
          ))}
        </THead>
        <TBody>
          {table
            .getRowModel()
            .rows.slice(0, 4)
            .map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <>
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      </>
                    )
                  })}
                </Tr>
              )
            })}
        </TBody>
      </Table>
      <Link
        to="/app/user"
        className="block w-full text-center text-green-500 underline"
      >
        Xem thêm
      </Link>
    </Card>
  )
}

export default TopProduct
