'use client';
import React, { useState } from 'react';
import { IUser } from '@/interfaces';
import { Table, Switch, message } from 'antd';
import dayjs from 'dayjs';
import { updateUser } from '@/server-actions/users';
import { IUserStore, usersGlobalStore } from '@/store/users-store';

function UsersTable({ users }: { users: IUser[] }) {
  const { currentUserData }: IUserStore = usersGlobalStore() as any;
  const [isLoading, setIsLoading] = useState(false);
  const updateUserHandler = async ({
    userId,
    updatedData,
  }: {
    userId: string;
    updatedData: Partial<IUser>;
  }) => {
    try {
      setIsLoading(true);
      const { success } = await updateUser({ userId, updatedData });
      if (success) {
        message.success('User successfully updated');
      } else {
        message.error('Failed to update user');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'User id', dataIndex: '_id', key: '_id' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) =>
        dayjs(createdAt).format('MMM DD YYYY, hh:mm A'),
    },
    {
      title: 'Is Approved',
      dataIndex: 'isApproved',
      key: 'isApproved',
      render: (isApproved: boolean, row: IUser) => (
        <Switch
          checked={isApproved}
          onChange={(newValue) =>
            updateUserHandler({
              userId: row._id,
              updatedData: { isApproved: newValue },
            })
          }
        />
      ),
    },
    {
      title: 'Is Super-Admin',
      dataIndex: 'isSuperAdmin',
      key: 'isSuperAdmin',
      render: (isSuperAdmin: boolean, row: IUser) => (
        <Switch
          checked={isSuperAdmin}
          onChange={(newValue) =>
            updateUserHandler({
              userId: row._id,
              updatedData: { isSuperAdmin: newValue },
            })
          }
        />
      ),
    },
  ];
  // if current user isnt superAdmin, remove isApproved and isSuperAdmin columns
  if (!currentUserData?.isSuperAdmin) {
    columns.splice(4, 2);
  }
  return (
    <Table
      dataSource={users}
      columns={columns}
      loading={isLoading}
      rowKey="_id"
    />
  );
}

export default UsersTable;
