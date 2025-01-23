import PageTitle from '@/components/page-title';
import { getPatientById } from '@/server-actions/patients';
import { Alert } from 'antd';
import React from 'react';
import PatientForm from '../../_components/patient-form';

interface EditPatientPageProps {
  params: {
    id: string;
  };
}

async function EditPatientPage({ params }: EditPatientPageProps) {
  const { success, data } = await getPatientById(params.id);
  if (!success) {
    return <Alert message="failed to retrieve patient" type="error" showIcon />;
  }
  const patient = data;
  return (
    <div>
      <PageTitle title="Edit Patient" />
      <PatientForm type="edit" initialValues={patient} />
    </div>
  );
}

export default EditPatientPage;
