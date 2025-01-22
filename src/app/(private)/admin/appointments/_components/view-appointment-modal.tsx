import AppointmentReceipt from '@/app/(public)/appointment-confirmation/_components/appointments-receipt';
import { IAppointment } from '@/interfaces';
import { App, Modal } from 'antd';
import React from 'react';

interface ViewAppointmentModelProps {
  appointment: IAppointment;
  showViewAppointmentModel: boolean;
  setShowViewAppointmentModel: (show: boolean) => void;
}

function ViewAppointmentModel({
  appointment,
  showViewAppointmentModel,
  setShowViewAppointmentModel,
}: ViewAppointmentModelProps) {
  if (!appointment) return null;
  return (
    <Modal
      footer={null}
      centered
      open={showViewAppointmentModel}
      onCancel={() => setShowViewAppointmentModel(false)}
      onClose={() => setShowViewAppointmentModel(false)}
      title="View Appointment"
      width={600}
    >
      {' '}
      <div className="mt-5">
        <AppointmentReceipt appointment={appointment} />
      </div>
    </Modal>
  );
}
export default ViewAppointmentModel;
