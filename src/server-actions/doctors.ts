'use server';

import DoctorModel from '@/models/doctor-models';
import { IDoctor } from '@/interfaces';
import { revalidatePath } from 'next/cache';
import { message } from 'antd';

export const addDoctor = async (payload: Partial<IDoctor>) => {
  try {
    await DoctorModel.create(payload);
    revalidatePath('/admin/doctors');
    return {
      success: true,
      message: 'Doctor added successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const getDoctors = async () => {
  try {
    const doctors = await DoctorModel.find().sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(doctors)),
    };
  } catch (error: any) {
    return { success: false, message: 'Error retrieving doctors' };
  }
};
export const getDoctorById = async (id: string) => {
  try {
    const doctor = await DoctorModel.findById(id);

    return { success: true, data: JSON.parse(JSON.stringify(doctor)) };
  } catch (error: any) {
    return { success: false, message: 'Error retrieving doctor' };
  }
};
export const updateDoctor = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<IDoctor>;
}) => {
  try {
    await DoctorModel.findByIdAndUpdate(id, data);
    revalidatePath('/admin/doctors');
    return {
      success: true,
      message: 'Doctor data successfully updated',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const deleteDoctor = async (id: string) => {
  try {
    await DoctorModel.findByIdAndDelete(id);
    revalidatePath('admin/doctors');
    return {
      success: true,
      message: 'Doctor deleted successfully',
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
