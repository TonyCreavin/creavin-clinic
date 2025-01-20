import PageTitle from '@/components/page-title';
import { getDoctors } from '@/server-actions/doctors';
import { Button, Alert } from 'antd';
import { IDoctor } from '@/interfaces';
import Link from 'next/link';
import React from 'react';
import DoctorsTable from './_components/doctors-table';

async function DoctorsPage() {
  const { success, data } = await getDoctors();
  if (!success) {
    return <Alert message="Error retrieving data" showIcon />;
  }

  const doctors: IDoctor[] = data;
  console.log('data', data);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <PageTitle title="Doctors" />
        <Button type="primary">
          <Link href="/admin/doctors/new">Add Doctor</Link>
        </Button>
      </div>
      <DoctorsTable doctors={doctors} />
    </div>
  );
}

export default DoctorsPage;
