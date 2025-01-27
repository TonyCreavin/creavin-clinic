import React, { Suspense } from 'react';
import PageTitle from '@/components/page-title';
import { getAllUsers } from '@/server-actions/users';
import { Alert } from 'antd';
import { IUser } from '@/interfaces';
import UsersTable from './_components/users-table';
import Spinner from '@/components/spinner';
import FilterUsers from './_components/filter-users';

interface UsersPageProps {
  searchParams: {
    name: string;
    email: string;
    isApproved: boolean;
  };
}

async function UsersPage({ searchParams }: UsersPageProps) {
  const { success, data } = await getAllUsers(searchParams);

  if (!success) {
    return <Alert message="Error retrieving data" showIcon />;
  }

  const users: IUser[] = data;
  console.log('data', data);

  return (
    <div className="p-5">
      <PageTitle title="Users" />
      <FilterUsers />
      <UsersTable users={users} />
    </div>
  );
}

export default UsersPage;
