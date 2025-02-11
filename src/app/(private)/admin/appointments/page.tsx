import PageTitle from '@/components/page-title';
import { getAllAppointments } from '@/server-actions/appointments';
import { Alert } from 'antd';
import React from 'react';
import AppointmentsTable from './_components/appointments-table';
import FilterAppointments from './_components/filter-appointments';

interface AppointmentPageProps {
  searchParams: { date: string; patientName: string; doctorName: string };
}
async function AppointmentListPage({ searchParams }: AppointmentPageProps) {
  const { success, data } = await getAllAppointments(searchParams);
  if (!success) {
    return <Alert message="Failed to get appointments" type="error" showIcon />;
  }
  const appointments = data;
  return (
    <div className="p-5">
      <PageTitle title="Appointments" />
      <FilterAppointments />
      <AppointmentsTable appointments={appointments} />
    </div>
  );
}

export default AppointmentListPage;
