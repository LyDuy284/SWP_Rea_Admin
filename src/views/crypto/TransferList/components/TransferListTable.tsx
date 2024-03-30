import React, { useEffect, useMemo, useRef, useState } from 'react';
import DataTable, { ColumnDef, DataTableResetHandle } from '@/components/shared/DataTable';
import { HiOutlineEye } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { apiGetTransferList } from '@/services/TransferService';

interface Transfer {
  id: number;
  title: string;
  content: string;
  reason: string;
  tranferFormStatus: 0,
  transferImages: string[];
  transactionImages: string[];
  
}

const TransferListTable = () => {
  const tableRef = useRef<DataTableResetHandle>(null);
  const navigate = useNavigate();
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await apiGetTransferList<any, any>({})

    setTransfers(data.result)
  }

  const onView = (id: number) => {
    navigate(`/app/transfer-view/${id}`);
  };

  const columns: ColumnDef<Transfer>[] = useMemo(
    () => [
      {
        header: 'Hình ảnh',
        cell: (props) => {
          const row = props.row.original;
          console.log();
          
          return (
            <img
              src={row.transferImages[0]}
              className="line-clamp-1 max-w-[100px]"
            />
          );
        },
      },
      {
        header: 'Tiêu đề',
        cell: (props) => {
          const row = props.row.original;
          return (
            <span className="line-clamp-1 max-w-[300px]">{row.title}</span>
          );
        },
      },
      {
        header: 'Nội dung',
        cell: (props) => {
          const row = props.row.original;
          return row.content || '--';
        },
      },
      {
        header: 'Lý do',
        cell: (props) => {
          const row = props.row.original;
          return row.reason || '--';
        },
      },
      {
        header: 'Trạng thái',
        cell: (props) => {
          const row = props.row.original;
          return row.tranferFormStatus || '--';
        },
      },
      {
        header: 'Xem chi tiết',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex justify-center text-lg">
              <span
                className={`cursor-pointer p-2`}
                onClick={(e) => onView(row.id)}
              >
                <HiOutlineEye />
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <DataTable
        ref={tableRef}
        columns={columns}
        data={transfers}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        disabledPaginate
      />
    </>
  );
};

export default TransferListTable;
