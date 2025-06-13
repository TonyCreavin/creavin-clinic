import React from 'react';
import { getDashboardData } from '@/server-actions/dashboard-reports';
import { Alert } from 'antd';
import DashboardCard from './_components/dashboard-card';
import PageTitle from '@/components/page-title';
import AppointmentsTable from '../appointments/_components/appointments-table';

async function Dashboard() {
  const { success, data } = await getDashboardData();
  if (!success) {
    return <Alert message="Error retrieving data" type="error" showIcon />;
  }

  return (
    <div className="p-5 flex flex-col gap-5">
      <PageTitle title="Dashboard" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
        <DashboardCard
          title="Today's Appointments"
          value={data?.todayAppointmentsCount || 0}
          description="Total appointments for today"
        />
        <DashboardCard
          title="All Appointments"
          value={data?.allAppointmentsCount || 0}
          description="Total of appointments booked till now"
        />
        <DashboardCard
          title="All Doctors"
          value={data?.allDoctorsCount || 0}
          description="Total of doctors registered"
        />
        <DashboardCard
          title="All Patients"
          value={data?.allPatientsCount || 0}
          description="Total of patients registered"
        />
      </div>
      <div className="mt-7">
        <h1 className="text-lg font-bold">Today's Appointments</h1>
        <AppointmentsTable appointments={data?.todaysAppointmentsData} />
      </div>
    </div>
  );
}

export default Dashboard;
