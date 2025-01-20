'use client';
import React, { useState } from 'react';
import PageTitle from '@/components/page-title';
import { Form, Input, Button, Select, message, Alert } from 'antd';
import { specializations, workHours } from '@/constants';
import dayjs from 'dayjs';
import { IDoctor, IPatient } from '@/interfaces';
import { useRouter } from 'next/navigation';
import {
  checkDoctorsAvailibility,
  saveAppointment,
} from '@/server-actions/appointments';
import AvailableDoctors from './_components/available-doctors';
import PatientDetails from './_components/patient-details';
import { getStripePaymentIntent } from '@/server-actions/payments';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreditCardForm from './_components/credit-card-form';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);
function BookAppointmentPage() {
  const router = useRouter();
  const [slotData, setSlotData] = useState({
    date: '',
    time: '',
    specialist: '',
  });
  const [availableDoctors, setAvailableDoctors] = useState<IDoctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);
  const [paymentIntent, setPaymentIntent] = useState('');
  const [patientDetails, setPatientDetails] = useState<Partial<IPatient>>({
    name: '',
    email: '',
    phone: '',
    age: 0,
    gender: '',
    problem: '',
  });
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [loadingPaymentIntent, setLoadingPaymentIntent] = useState(false);
  const checkAvailabilityHandler = async () => {
    try {
      setIsLoading(true);
      setError('');
      const { success, data } = await checkDoctorsAvailibility(slotData);
      if (!success || !data.length) {
        setError('No doctors available for given timeslot');
      } else {
        setAvailableDoctors(data);
        console.log(data);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const clearHandler = () => {
    setSlotData({ date: '', time: '', specialist: '' });
    setAvailableDoctors([]);
  };
  const getPaymentIntent = async () => {
    try {
      setLoadingPaymentIntent(true);
      const { data, success, message } = await getStripePaymentIntent(
        selectedDoctor?.fee || 0
      );
      if (!success) {
        throw new Error(message);
      }

      setPaymentIntent(data.client_secret);
      setShowCreditCardForm(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoadingPaymentIntent(false);
    }
  };
  const onPaymentSuccess = async (paymentId: string) => {
    try {
      const response = await saveAppointment({
        patientDetails,
        date: slotData.date,
        time: slotData.time,
        doctorId: selectedDoctor?._id || '',
        specialist: slotData.specialist,
        fee: selectedDoctor?.fee || 0,
        paymentId,
      });
      if (!response.success) {
        throw new Error(response.message);
      }
      message.success('Appointment booked successfully');
      router.push('/appointment-confirmation');
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <div className="px-10 my-5">
      <PageTitle title="Book Appointment" />
      <Form layout="vertical" className="mt-5">
        <div className="grid grid-cols-4 gap-5 items-end">
          <Form.Item label="Date">
            <Input
              type="date"
              value={slotData.date}
              onChange={(e) =>
                setSlotData({ ...slotData, date: e.target.value })
              }
              min={dayjs().format('YYYY-MM-DD')}
            />
          </Form.Item>
          <Form.Item label="Time">
            <Select
              options={workHours}
              value={slotData.time}
              onChange={(value) => setSlotData({ ...slotData, time: value })}
              disabled={!slotData.date}
            />
          </Form.Item>
          <Form.Item label="Speciality">
            <Select
              options={specializations}
              value={slotData.specialist}
              onChange={(value) =>
                setSlotData({ ...slotData, specialist: value })
              }
              disabled={!slotData.time}
            />
          </Form.Item>
          <div className="grid grid-cols-2 gap-5">
            <Button onClick={clearHandler}>Clear</Button>
            <Button
              disabled={!slotData.specialist}
              type="primary"
              onClick={checkAvailabilityHandler}
              loading={isLoading}
            >
              Check Availability
            </Button>
          </div>
        </div>
      </Form>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          className="mt-5"
        />
      )}
      {availableDoctors.length > 0 && (
        <AvailableDoctors
          doctorsList={availableDoctors}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
        />
      )}
      {selectedDoctor && (
        <PatientDetails
          patientDetails={patientDetails}
          setPatientDetails={setPatientDetails}
        />
      )}
      {selectedDoctor && (
        <div className="flex justify-end gap-5 mt-7">
          <Button
            type="primary"
            onClick={getPaymentIntent}
            loading={loadingPaymentIntent}
          >
            Confirm
          </Button>
        </div>
      )}
      {paymentIntent && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntent }}
        >
          <CreditCardForm
            showCreditCardForm={showCreditCardForm}
            setShowCreditCardForm={setShowCreditCardForm}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
}

export default BookAppointmentPage;
