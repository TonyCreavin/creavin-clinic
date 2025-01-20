import PageTitle from '@/components/page-title';
import React from 'react';
import DoctorForm from '../../_components/doctor-form';
import { Alert } from 'antd';
import { getDoctorById } from '@/server-actions/doctors';

interface EditDoctorPageProps {
  params: {
    id: string;
  };
}

async function EditDoctorPage({ params }: EditDoctorPageProps) {
  const { success, data } = await getDoctorById(params.id);
  if (!success) {
    return <Alert message="failed to retrieve doctor" showIcon />;
  }
  const doctor = data;
  return (
    <div className="p-5">
      <PageTitle title="Edit Doctor" />
      <DoctorForm type="edit" initialValues={doctor} />
    </div>
  );
}

export default EditDoctorPage;
