'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Select } from 'antd';
import { gender } from '@/constants';

function FilterPatients() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [genders, setGender] = useState('');
  const router = useRouter();

  const onFilter = () => {
    router.push(
      `/admin/patients?name=${name}&phone=${phone}&gender=${genders}`
    );
  };
  const onClear = () => {
    setName('');
    setPhone('');
    setGender('');
    router.push('/admin/patients');
  };
  return (
    <div className="grid lg:grid-cols-4 gap-5 items-end">
      <div className="flex flex-col">
        <label htmlFor="Name" className="text-sm">
          Name
        </label>
        <Input
          value={name}
          id="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="Phone" className="text-sm">
          Phone
        </label>
        <Input
          value={phone}
          id="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="Gender" className="text-sm">
          Gender
        </label>
        <Select
          options={gender}
          value={genders}
          id="Gender"
          onChange={(value) => setGender(value)}
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-5">
        <Button onClick={onClear}>Clear Filters</Button>
        <Button type="primary" onClick={onFilter}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterPatients;
