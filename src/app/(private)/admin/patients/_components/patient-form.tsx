'use client';
import React, { useState } from 'react';
import { gender } from '@/constants';
import { useRouter } from 'next/navigation';
import { Form, message, Input, Select, Button } from 'antd';
import { UpdatePatient } from '@/server-actions/patients';

interface PatientFormProps {
  type?: 'edit';
  initialValues?: any;
}

function PatientForm({ type = 'edit', initialValues = {} }: PatientFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      let response: any = null;
      if (type === 'edit') {
        const response = await UpdatePatient({
          id: initialValues?._id!,
          data: values,
        });

        if (response.success) {
          message.success(response.message);
          router.push('/admin/patients');
        } else {
          message.error(response?.message);
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-5">
      <Form
        layout="vertical"
        className="grid grid-cols-4 gap-5"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input patient's name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input patient's email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please input patient's phonenumber" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: "Please input patient's age" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender' }]}
        >
          <Select options={gender} />
        </Form.Item>
        <div className="col-span-4">
          <Form.Item name="problem" label="Problem">
            <Input.TextArea />
          </Form.Item>
        </div>
        <div className="col-span-4 flex justify-end gap-5">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update
          </Button>
          <Button onClick={() => router.push('/admin/patients')}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
}

export default PatientForm;
