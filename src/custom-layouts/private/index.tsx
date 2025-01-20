import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { getUser } from '@/server-actions/users';
import { message, Button, Alert } from 'antd';
import Spinner from '../../components/spinner';
import MenuItems from './menu-items';
import { IUserStore, usersGlobalStore } from './../../store/users-store';

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { setCurrentUserData, currentUserData }: IUserStore =
    usersGlobalStore() as any;

  const getUserData = async () => {
    try {
      setIsLoading(true);

      const response: any = await getUser();
      if (response.success) {
        setCurrentUserData(response.data);
        if (!response.data.isApproved) {
          setError('Your account is not appoved yet. Please contact admin');
        }
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {' '}
      <div className="py-5 px-10 flex justify-between items-center bg-primary">
        <Link
          href="/admin/dashboard"
          className="text-white text-2xl font-semibold"
        >
          Creavin Clinic
        </Link>
        <div className="flex gap-5">
          <span className="text-white text-sm uppercase font-semibold">
            {currentUserData?.name}
          </span>
          <Button ghost size="small" onClick={() => setShowMenu(true)}>
            <Menu size={16} color="white" />
          </Button>
        </div>
      </div>
      {error ? (
        <div className="p-3 ">
          <Alert showIcon message={error} />{' '}
        </div>
      ) : (
        <div className=" p-5">{children}</div>
      )}
      {showMenu && <MenuItems showMenu={showMenu} setShowMenu={setShowMenu} />}
    </div>
  );
}

export default PrivateLayout;
