import getDateTimeFormat from '@/helpers/date-time-format';
import { IAppointment, IDoctor, IPatient } from '@/interfaces';
import { getAppointmentByPatientId } from '@/server-actions/appointments';
import { message, Modal, Table } from 'antd';
import React, { useState, useEffect } from 'react';

interface PatientAppointmentModalProps {
  selectedPatient: IPatient;
  showPatientAppointmentModal: boolean;
  setShowPatientAppointmentModal: (show: boolean) => void;
}

function PatientAppointmentModal({
  selectedPatient,
  showPatientAppointmentModal,
  setShowPatientAppointmentModal,
}: PatientAppointmentModalProps) {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const getData = async () => {
    try {
      const { success, data } = await getAppointmentByPatientId(
        selectedPatient._id
      );
      if (!success) {
        message.error('Failed to retrieve appointments');
      }
      setAppointments(data);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (showPatientAppointmentModal) {
      getData();
    }
  }, [showPatientAppointmentModal]);

  const columns = [
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
  ];
  return (
    <div>
      <Modal
        open={showPatientAppointmentModal}
        onCancel={() => setShowPatientAppointmentModal(false)}
        onClose={() => setShowPatientAppointmentModal(false)}
        footer={null}
        centered
        title={`${selectedPatient.name}'s appointments`}
        width={1200}
      >
        <div className="mt-5">
          <Table
            columns={columns}
            dataSource={appointments}
            rowKey="_id"
            pagination={false}
          />{' '}
        </div>
      </Modal>
    </div>
  );
}

export default PatientAppointmentModal;
