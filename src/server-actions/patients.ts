'use server';
import { revalidatePath } from 'next/cache';
import PatientModel from '../models/patient-model';
import { IPatient } from '@/interfaces';

export const getAllPatients = async (searchParams: {
  name: string;
  phone: string;
  gender: string;
}) => {
  try {
    let filtersToApply: any = {};
    if (searchParams.name) {
      filtersToApply.name = { $regex: searchParams.name, $options: 'i' };
    }
    if (searchParams.phone) {
      filtersToApply.phone = searchParams.phone;
    }
    if (searchParams.gender) {
      filtersToApply.gender = searchParams.gender;
    }
    const patients = await PatientModel.find(filtersToApply).sort({
      createdAt: -1,
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(patients)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getPatientById = async (id: string) => {
  try {
    const patient = await PatientModel.findById(id);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(patient)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const addPatient = async (payload: Partial<IPatient>) => {
  try {
    await PatientModel.create(payload);
    revalidatePath('/admin/patients');
    return {
      success: true,
      message: 'Patient added successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const UpdatePatient = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<IPatient>;
}) => {
  try {
    await PatientModel.findByIdAndUpdate(id, data);
    revalidatePath('/admin/patients');
    return {
      success: true,
      message: 'Patient data successfully updated',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const deletePatient = async (id: string) => {
  try {
    await PatientModel.findByIdAndDelete(id);
    revalidatePath('/admin/patients');
    return {
      success: true,
      message: 'Patient deleted successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
