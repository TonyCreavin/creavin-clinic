import React, { useState } from 'react';
import { IAppointment } from '@/interfaces';
import { Alert, Button, message, Modal } from 'antd';
import { updateAppointmentStatus } from '@/server-actions/appointments';

interface CancelAppointmentModalProps {
  showCancelAppointmentModal: boolean;
  setShowCancelAppointmentModal: (show: boolean) => void;
  appointment: IAppointment;
}

function CancelAppointmentModal({
  showCancelAppointmentModal,
  setShowCancelAppointmentModal,
  appointment,
}: CancelAppointmentModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelAppointment = async () => {
    try {
      setIsLoading(true);
      const { success, message: msg } = await updateAppointmentStatus({
        appointmentId: appointment._id,
        status: 'cancelled',
      });
      if (!success) {
        throw new Error(msg);
      }
      message.success('Appointment cancelled successfully');
      setShowCancelAppointmentModal(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="CANCEL APPOINTMENT"
      centered
      open={showCancelAppointmentModal}
      onCancel={() => setShowCancelAppointmentModal(false)}
      onClose={() => setShowCancelAppointmentModal(false)}
      footer={null}
    >
      <Alert
        message={
          <p>
            Are you sure you want to cancel your appointment with{' '}
            <b>{appointment.doctor.name}</b> on the <b>{appointment.date}</b> at{' '}
            <b>{appointment.time}</b>
          </p>
        }
        type="warning"
      />
      <div className="mt-5 flex justify-end gap-5">
        <Button
          onClick={() => setShowCancelAppointmentModal(false)}
          disabled={isLoading}
        >
          Close
        </Button>
        <Button
          danger
          type="primary"
          onClick={handleCancelAppointment}
          loading={isLoading}
        >
          Cancel Appointment
        </Button>
      </div>
    </Modal>
  );
}

export default CancelAppointmentModal;
