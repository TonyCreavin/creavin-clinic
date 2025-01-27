'use client';
import React, { useState } from 'react';
import { specializations } from '@/constants';
import { useRouter } from 'next/navigation';
import { Input, Button, Select } from 'antd';

function FilterDoctor() {
  const [search, setSearch] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const onFilter = () => {
    router.push(
      `/admin/doctors?search=${search}&speciality=${speciality}&phone=${phone}`
    );
  };
  const onClear = () => {
    setSearch('');
    setSpeciality('');
    setPhone('');
    router.push('/admin/doctors');
  };
  return (
    <div className="grid lg:grid-cols-4 gap-5 items-end">
      <div className="flex flex-col">
        <label htmlFor="Search" className="text-sm">
          Search
        </label>
        <Input
          value={search}
          id="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="Speciality" className="text-sm">
          Speciality
        </label>
        <Select
          options={specializations}
          value={speciality}
          id="Speciality"
          onChange={(value) => setSpeciality(value)}
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

      <div className="flex justify-end gap-5">
        <Button onClick={onClear}>Clear Filters</Button>
        <Button type="primary" onClick={onFilter}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterDoctor;
