'use client';
import { specializations, workDays, workHours } from '@/constants';
import { uploadFileToFirebaseAndReturnUrl } from '@/helpers/firebase-uploads';
import { IDoctor } from '@/interfaces';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { addDoctor, updateDoctor } from '@/server-actions/doctors';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { url } from 'inspector';

interface DoctorFormProps {
  type?: 'add' | 'edit';
  initialValues?: Partial<IDoctor>;
}

function DoctorForm({ type = 'add', initialValues = {} }: DoctorFormProps) {
  const [profilePicture, setProfilePicture] = useState<any>(
    initialValues.profilePicture || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      if (profilePicture) {
        values.profilePicture = await uploadFileToFirebaseAndReturnUrl(
          profilePicture
        );
      } else {
        values.profilePicture = profilePicture;
      }
      let response: any = null;
      if (type === 'add') {
        response = await addDoctor(values);
      } else {
        response = await updateDoctor({
          id: initialValues?._id!,
          data: values,
        });
      }
      if (response.success) {
        message.success(response.message);
        router.push('/admin/doctors');
      } else {
        message.error(response?.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  let selectedFilesList: any[] = [];
  if (profilePicture && typeof profilePicture === 'string') {
    selectedFilesList = [
      {
        url: profilePicture,
        thumbUrl: profilePicture,
        uid: profilePicture,
      },
    ];
  }
  if (profilePicture && typeof profilePicture === 'object') {
    selectedFilesList = [
      {
        uid: '-1',
        url: URL.createObjectURL(profilePicture),
        thumbUrl: URL.createObjectURL(profilePicture),
      },
    ];
  }
  if (!profilePicture) {
    selectedFilesList = [];
  }
  return (
    <div className="mt-5">
      <Form
        layout="vertical"
        className="grid grid-cols-4 gap-5"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        {/* Form Fields */}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: 'Please input your phone number' },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="specializations"
          label="Specializations"
          rules={[
            { required: true, message: 'Please select the specialization' },
          ]}
        >
          <Select options={specializations} mode="multiple" />
        </Form.Item>
        <Form.Item
          name="workDays"
          label="Work Days"
          rules={[{ required: true, message: 'Please select the work days' }]}
        >
          <Select options={workDays} mode="multiple" />
        </Form.Item>
        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: 'Please select the start time' }]}
        >
          <Select options={workHours} />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: 'Please select the end time' }]}
        >
          <Select options={workHours} />
        </Form.Item>
        <Form.Item
          name="fee"
          label="Fee"
          rules={[{ required: true, message: 'Please input your fee' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="bio"
          label="Bio"
          rules={[{ required: true, message: 'Please input your bio' }]}
          className="col-span-4"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Doctor Profile Picture">
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setProfilePicture(file);
            }}
            fileList={selectedFilesList}
          >
            <div className="span text-sm">
              {profilePicture ? 'Change ' : 'Upload '}Profile Picture
            </div>
          </Upload>
        </Form.Item>
        <div className="col-span-4 flex justify-end gap-5">
          <Button
            disabled={isLoading}
            onClick={() => router.push('/admin/doctors')}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default DoctorForm;
