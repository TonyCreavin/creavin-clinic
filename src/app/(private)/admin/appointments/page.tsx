import PageTitle from '@/components/page-title';
import { getAllAppointments } from '@/server-actions/appointments';
import { Alert } from 'antd';
import React from 'react';
import AppointmentsTable from './_components/appointments-table';

async function AppointmentListPage() {
  const { success, data } = await getAllAppointments();
  if (!success) {
    return <Alert message="Failed to get appointments" type="error" showIcon />;
  }
  const appointments = data;
  return (
    <div className="p-5">
      <PageTitle title="Appointments" />
      <AppointmentsTable appointments={appointments} />
    </div>
  );
}

export default AppointmentListPage;
