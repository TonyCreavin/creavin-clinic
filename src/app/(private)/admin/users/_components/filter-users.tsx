'use client';
import { useRouter } from 'next/navigation';
import { Input, Button, Select } from 'antd';
import React, { useState } from 'react';

const Approved = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

function FilterUsers() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isApproved, setIsApproved] = useState(true);
  const router = useRouter();

  const onFilter = () => {
    router.push(
      `/admin/users?name=${name}&email=${email}&isApproved=${isApproved}`
    );
  };

  const onClear = () => {
    setName('');
    setEmail('');
    setIsApproved(true);
    router.push('/admin/users');
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
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
        <label htmlFor="Email" className="text-sm">
          Email
        </label>
        <Input
          value={email}
          id="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="IsApproved" className="text-sm">
          Is Approved?
        </label>
        <Select
          value={isApproved}
          options={Approved}
          id="isApproved"
          onChange={(value) => setIsApproved(value)}
        />
      </div>
      <div className="flex justify-enf gap-5">
        <Button onClick={onClear}>Clear Filters</Button>
        <Button onClick={onFilter} type="primary">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterUsers;
