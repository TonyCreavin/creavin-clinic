'use server';
import AppointmentModel from '../models/appointment-model';
import DoctorModel from '@/models/doctor-models';
import dayjs from 'dayjs';
import { IPatient } from '@/interfaces';
import PatientModel from '@/models/patient-model';

export const checkDoctorsAvailibility = async ({
  date,
  time,
  specialist,
}: {
  date: string;
  time: string;
  specialist: string;
}) => {
  try {
    const bookedDoctorIds = await DoctorModel.find({ date, time }).distinct(
      'doctors'
    );

    const availableDoctors = await DoctorModel.find({
      _id: { $nin: bookedDoctorIds },
      specializations: { $in: [specialist] },
      workDays: { $in: [dayjs(date).format('dddd').toLowerCase()] },
      startTime: { $lte: time },
      endTime: { $gt: time },
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(availableDoctors)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const saveAppointment = async ({
  patientDetails,
  date,
  time,
  doctorId,
  specialist,
  fee,
  paymentId,
}: {
  patientDetails: Partial<IPatient>;
  date: string;
  time: string;
  doctorId: string;
  specialist: string;
  fee: number;
  paymentId: string;
}) => {
  try {
    let patient = await PatientModel.findOne({
      $or: [{ email: patientDetails.email }, { phone: patientDetails.phone }],
      name: patientDetails.name,
      gender: patientDetails.gender,
    });
    if (!patient) {
      patient = await PatientModel.create(patientDetails);
    } else {
      await PatientModel.updateOne({ _id: patient._id }, patientDetails);
    }

    const appointment = await AppointmentModel.create({
      date,
      time,
      doctor: doctorId,
      patient: patient._id,
      specialist,
      status: 'approved',
      fee,
      paymentId,
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(appointment)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
