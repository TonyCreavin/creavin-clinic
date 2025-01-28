'use client';
import { IPatient } from '@/interfaces';
import { Button, message, Table } from 'antd';
import { Pencil, List, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { deletePatient } from '@/server-actions/patients';
import PatientAppointmentModal from './patient-appointment-modal';

interface PatientsTableProps {
  patients: IPatient[];
}
interface Datatype {
  name: string;
}

function PatientsTable({ patients }: PatientsTableProps) {
  const [showPatientAppointmentModal, setShowPatientAppointmentModal] =
    useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const deletePatientHandler = async (id: string) => {
    try {
      setIsLoading(true);
      const { success } = await deletePatient(id);
      if (success) {
        message.success('Patient deleted successfully');
      } else {
        message.error('Failed to delete patient');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Datatype, b: Datatype) => {
        const A = a.name.toUpperCase() || '';
        const B = b.name.toUpperCase() || '';
        return A.localeCompare(B);
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <div className="flex gap-5">
          <Button
            size="small"
            onClick={() => router.push(`/admin/patients/edit/${record._id}`)}
          >
            <Pencil size={12} />
          </Button>
          <Button size="small" onClick={() => deletePatientHandler(record._id)}>
            <Trash2 size={12} />
          </Button>
          <Button
            size="small"
            onClick={() => {
              setShowPatientAppointmentModal(true);
              setSelectedPatient(record);
            }}
          >
            <List size={12} />
            View Appointments
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={patients}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
      {selectedPatient && showPatientAppointmentModal && (
        <PatientAppointmentModal
          selectedPatient={selectedPatient}
          showPatientAppointmentModal={showPatientAppointmentModal}
          setShowPatientAppointmentModal={setShowPatientAppointmentModal}
        />
      )}
    </div>
  );
}

export default PatientsTable;
