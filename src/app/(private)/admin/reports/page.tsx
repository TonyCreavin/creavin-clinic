import PageTitle from '@/components/page-title';
import { getReportData } from '@/server-actions/dashboard-reports';
import { Alert } from 'antd';
import React from 'react';
import DateFiltersForReports from './_components/date-filters';
import dayjs from 'dayjs';
import DashboardCard from '../dashboard/_components/dashboard-card';
import AppointmentsTable from '../appointments/_components/appointments-table';

interface ReportsPageProps {
  searchParams: {
    fromDate: string;
    toDate: string;
  };
}

async function Reports({ searchParams }: ReportsPageProps) {
  const { success, data } = await getReportData({
    fromDate: searchParams.fromDate || dayjs().format('YYYY-MM-DD'),
    toDate: searchParams.toDate || dayjs().format('YYYY-MM-DD'),
  });
  if (!success) {
    return <Alert type="error" message="Failed to download data" showIcon />;
  }
  console.log(data);
  return (
    <div className="p-5 flex flex-col gap-5">
      <PageTitle title="Reports" />
      <DateFiltersForReports />
      <div className="grid lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Total appointments"
          value={data?.appointmentsCount || 0}
          description={`Total appointment from ${searchParams.fromDate} to ${searchParams.toDate}`}
        />
        <DashboardCard
          title="Fee collected"
          value={`$ ${data?.feeCollected || 0}`}
          description={`Fee total from ${searchParams.fromDate} to ${searchParams.toDate}`}
        />
      </div>
      <div>
        <h1 className="text-sm font-bold">
          Total Appointments from {searchParams.fromDate} to{' '}
          {searchParams.toDate}
        </h1>
        <AppointmentsTable appointments={data?.appointmentsData || []} />
      </div>
    </div>
  );
}

export default Reports;
