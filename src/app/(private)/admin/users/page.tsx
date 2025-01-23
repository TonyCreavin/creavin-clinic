import React, { Suspense } from 'react';
import PageTitle from '@/components/page-title';
import { getAllUsers } from '@/server-actions/users';
import { Alert } from 'antd';
import { IUser } from '@/interfaces';
import UsersTable from './_components/users-table';
import Spinner from '@/components/spinner';

async function UsersPage() {
  const { success, data } = await getAllUsers();

  if (!success) {
    return <Alert message="Error retrieving data" showIcon />;
  }

  const users: IUser[] = data;
  console.log('data', data);

  return (
    <div className="p-5">
      <PageTitle title="Users" />

      <UsersTable users={users} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      }
    >
      <UsersPage />
    </Suspense>
  );
}
