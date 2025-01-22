import getDateTimeFormat from '@/helpers/date-time-format';
import { IAppointment } from '@/interfaces';
import React from 'react';

interface AppointmentReceiptProps {
  appointment: IAppointment;
}
function AppointmentReceipt({ appointment }: AppointmentReceiptProps) {
  const renderProperty = (label: string, value: any) => (
    <div className="flex justify-between text-sm">
      <p className="font-bold ml-1">{label}</p>
      <p>{value}</p>
    </div>
  );
  return (
    <div className="w-full">
      <div className="border border-primary p-5 flex flex-col rounded-sm gap-5 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">CREAVIN CLINIC</h1>
          <div className=" text-sm">
            <p>Hendaye, France</p>
            <p>+33987878789</p>
          </div>
        </div>{' '}
        <hr />
        <h1 className="bg-gray-200 uppercase py-2 px-3 font-semibold">
          Appointment Details
        </h1>
        <div className="flex flex-col gap-1 ">
          {renderProperty('Doctor Name', appointment.doctor.name)}
          {renderProperty('Specialist', appointment.specialist)}
          {renderProperty('Date', appointment.date)}
          {renderProperty('Time', appointment.time)}
          {renderProperty('Fee', `$ ${appointment.fee}`)}
          {renderProperty('Status', appointment.status.toUpperCase())}
          {renderProperty('Patient Name', appointment.patient.name)}
          {renderProperty('Patient Email', appointment.patient.email)}
          {renderProperty('Patient Phone', appointment.patient.phone)}
          {renderProperty(
            'Booked On',
            getDateTimeFormat(appointment.createdAt)
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentReceipt;
