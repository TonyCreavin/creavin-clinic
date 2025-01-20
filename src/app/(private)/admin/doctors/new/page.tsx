import PageTitle from '@/components/page-title';
import React from 'react';
import dynamic from 'next/dynamic';

const DoctorForm = dynamic(() => import('../_components/doctor-form'), {
  ssr: false,
});

function AddDoctorPage() {
  return (
    <div className="p-5">
      <PageTitle title="Add Doctor" />
      <DoctorForm />
    </div>
  );
}

export default AddDoctorPage;
