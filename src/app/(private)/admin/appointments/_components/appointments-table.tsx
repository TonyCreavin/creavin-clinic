'use client';
import getDateTimeFormat from '@/helpers/date-time-format';
import { IPatient, IDoctor, IAppointment } from '@/interfaces';
import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { Eye, X } from 'lucide-react';
import ViewAppointmentModel from './view-appointment-modal';
import CancelAppointmentModal from './cancel-appointment-modal';

interface AppointmentsTableProps {
  appointments: IAppointment[];
}

function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  const [showCancelAppointmentModal, setShowCancelAppointmentModal] =
    useState(false);
  const [showViewAppointmentModel, setShowViewAppointmentModel] =
    useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'patient',
      render: (patient: IPatient) => patient.name,
    },
    {
      title: 'Doctor Name',
      dataIndex: 'doctor',
      render: (doctor: IDoctor) => doctor.name,
    },
    {
      title: 'Specialist',
      dataIndex: 'specialist',
      render: (specialist: string) => specialist.toUpperCase(),
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      render: (date: string, row: IAppointment) =>
        getDateTimeFormat(`${date} ${row.time}`),
    },
    { title: 'Fee', dataIndex: 'fee', render: (fee: number) => `$ ${fee}` },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => status.toUpperCase(),
    },
    { title: 'Payment ID', dataIndex: 'paymentId' },
    {
      title: 'Booking On',
      dataIndex: 'createdAt',
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: string, record: IAppointment) => (
        <div className="flex gap-5">
          <Button
            icon={<Eye size={12} />}
            size="small"
            onClick={() => {
              setSelectedAppointment(record);
              setShowViewAppointmentModel(true);
            }}
          >
            View
          </Button>
          {record.status === 'approved' && (
            <Button
              icon={<X size={12} />}
              size="small"
              onClick={() => {
                setSelectedAppointment(record);
                setShowCancelAppointmentModal(true);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={appointments} rowKey="_id" />
      {selectedAppointment && (
        <ViewAppointmentModel
          {...{
            appointment: selectedAppointment!,
            showViewAppointmentModel,
            setShowViewAppointmentModel,
          }}
        />
      )}
      {selectedAppointment && (
        <CancelAppointmentModal
          {...{
            showCancelAppointmentModal,
            setShowCancelAppointmentModal,
            appointment: selectedAppointment!,
          }}
        />
      )}
    </div>
  );
}

export default AppointmentsTable;
