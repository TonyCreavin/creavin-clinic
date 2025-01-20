'use client';
import { IDoctor } from '@/interfaces';
import React, { useState } from 'react';
import { Table, Button, message } from 'antd';
import getDateTimeFormat from '@/helpers/date-time-format';
import { Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteDoctor } from '@/server-actions/doctors';

function DoctorsTable({ doctors }: { doctors: IDoctor[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteDoctorHandler = async (id: string) => {
    try {
      setIsLoading(true);
      const { success } = await deleteDoctor(id);
      if (success) {
        message.success('Doctor deleted successfully');
      } else {
        message.error('Failed to delete doctor');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Specialization',
      dataIndex: 'specializations',
      key: 'specializations',
      render: (specializations: string[]) => specializations.join(','),
    },
    { title: 'Fee', dataIndex: 'fee', key: 'fee' },
    {
      title: 'Date Added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => getDateTimeFormat(date),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, row: IDoctor) => (
        <div className="flex gap-5">
          <Button
            size="small"
            onClick={() => router.push(`/admin/doctors/edit/${row._id}`)}
          >
            <Pencil size={12} />
          </Button>
          <Button size="small" onClick={() => deleteDoctorHandler(row._id)}>
            <Trash2 size={12} />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={doctors}
        columns={columns}
        rowKey="_id"
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
}

export default DoctorsTable;
