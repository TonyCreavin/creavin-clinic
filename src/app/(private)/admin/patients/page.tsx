import PageTitle from '@/components/page-title';
import { getAllPatients } from '@/server-actions/patients';
import { Alert } from 'antd';
import React from 'react';
import PatientsTable from './_components/patients-table';
import { IPatient } from '@/interfaces';
import FilterPatients from './_components/filter-patients';

interface PatientsListProps {
  searchParams: {
    name: string;
    phone: string;
    gender: string;
  };
}

async function PatientsList({ searchParams }: PatientsListProps) {
  const { success, data } = await getAllPatients(searchParams);
  if (!success) {
    return <Alert message="Error retrieving data" type="error" showIcon />;
  }

  const patients: IPatient[] = data;
  console.log('data', data);

  return (
    <div className="p-5">
      <PageTitle title="Patients" />
      <FilterPatients />
      <PatientsTable patients={patients} />
    </div>
  );
}

export default PatientsList;
