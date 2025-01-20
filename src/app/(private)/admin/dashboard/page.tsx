import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { getUser } from '@/server-actions/users';

async function Dashboard() {
  return (
    <div className="p-5 flex flex-col">
      <h1 className="pb-2">Dashboard</h1>
    </div>
  );
}

export default Dashboard;
