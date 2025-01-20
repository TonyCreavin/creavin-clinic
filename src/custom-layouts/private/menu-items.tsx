import React from 'react';
import { Drawer, Button, message } from 'antd';
import {
  LayoutDashboard,
  ClipboardPlus,
  CalendarClock,
  Banknote,
  Contact,
  List,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';

interface MenuItemsProps {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

function MenuItems({ showMenu, setShowMenu }: MenuItemsProps) {
  const iconSize = 16;
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={iconSize} />,
      path: '/admin/dashboard',
    },
    {
      name: 'Doctors',
      icon: <ClipboardPlus size={iconSize} />,
      path: '/admin/doctors',
    },
    {
      name: 'Appointments',
      icon: <CalendarClock size={iconSize} />,
      path: '/admin/appointments',
    },
    {
      name: 'Patients',
      icon: <Contact size={iconSize} />,
      path: '/admin/patients',
    },
    {
      name: 'Reports',
      icon: <Banknote size={iconSize} />,
      path: '/admin/reports',
    },
    { name: 'Users', icon: <List size={iconSize} />, path: '/admin/users' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      message.success('Signed out successfully');
    } catch (error: any) {
      return message.error(error.message);
    }
  };
  return (
    <Drawer
      open={showMenu}
      onClose={() => setShowMenu(false)}
      title="Menu Items"
    >
      <div className="flex flex-col gap-7">
        {menuItems.map((items, index) => (
          <div
            key={index}
            onClick={() => {
              router.push(items.path);
              setShowMenu(false);
            }}
            className={`p-3 flex gap-5 items-center cursor-pointer ${
              pathname === items.path ? 'border-primary bg-gray-100' : ''
            }`}
          >
            {items.icon}
            <span>{items.name}</span>
          </div>
        ))}
        <Button icon={<LogOut size={iconSize} />} onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </Drawer>
  );
}

export default MenuItems;
