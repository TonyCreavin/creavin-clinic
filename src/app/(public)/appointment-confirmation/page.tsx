'use client';
import PageTitle from '@/components/page-title';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import { getAppointmentById } from '@/server-actions/appointments';
import { IAppointment } from '@/interfaces';
import AppointmentReceipt from './_components/appointments-receipt';
import { useReactToPrint } from 'react-to-print';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const LazyAppointmentReceipt = dynamic(
  () => import('./_components/appointments-receipt'),
  {
    loading: () => <div>Loading receipt...</div>,
    ssr: false,
  }
);

function AppointmentConfirmation() {
  const searchParams = useSearchParams();
  const [appointmentId, setAppointmentId] = useState(
    searchParams.get('id') || ''
  );
  const [appointment, setAppointment] = useState<IAppointment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<any>();

  const reactToPrintFn = useReactToPrint({ contentRef });

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data, success } = await getAppointmentById(appointmentId);
      if (success) {
        setAppointment(data);
      } else {
        message.error('No appointment found with given ID');
      }
    } catch (error: any) {
      message.error('Failed to get appointment details');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (appointmentId) {
      getData();
    }
  }, [searchParams]);
  return (
    <div className="p-5 flex flex-col items-center gap-7">
      <div className="justify-center flex">
        <PageTitle title="Appointment Confirmation" />
      </div>
      <div className="w-[600px] flex justify-center">
        <div className="flex justify-between gap-20 items-end w-full">
          <div className="w-full">
            <label className="text-sm ">Appointment ID</label>
            <Input
              value={appointmentId}
              onChange={(e) => setAppointmentId(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="primary" loading={isLoading} onClick={getData}>
            Search
          </Button>
        </div>
      </div>
      <div ref={contentRef} className="flex justify-center mt-5">
        <div className="w-[600px]">
          {appointment && <LazyAppointmentReceipt appointment={appointment} />}
        </div>
      </div>
      {appointment && (
        <div className="flex justify-end gap-5 w-[600px]">
          <Button type="primary" onClick={() => reactToPrintFn()}>
            Print
          </Button>
        </div>
      )}
    </div>
  );
}

export default AppointmentConfirmation;
