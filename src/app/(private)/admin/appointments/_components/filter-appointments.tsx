'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from 'antd';

function FilterAppointments() {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  const onFilter = () => {
    router.push(
      `/admin/appointments?date=${date}&doctorName=${doctorName}&patientName=${patientName}`
    );
  };
  const onClear = () => {
    setPatientName('');
    setDoctorName('');
    setDate('');
    router.push('/admin/appointments');
  };

  return (
    <div className="grid lg:grid-cols-4 gap-5 items-end">
      <div className="flex flex-col">
        <label htmlFor="Date" className="text-sm">
          Appointment Date
        </label>
        <Input
          type="date"
          value={date}
          id="Date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="DoctorName" className="text-sm">
          Doctor Name
        </label>
        <Input
          value={doctorName}
          id="DoctorName"
          onChange={(e) => setDoctorName(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="PatientName" className="text-sm">
          Patient Name
        </label>
        <Input
          value={patientName}
          id="PatientName"
          onChange={(e) => setPatientName(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-5">
        <Button onClick={onClear}>Clear Filters</Button>
        <Button type="primary" onClick={onFilter}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterAppointments;
