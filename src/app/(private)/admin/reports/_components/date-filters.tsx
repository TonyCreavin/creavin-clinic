'use client';
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

function DateFiltersForReports() {
  const [fromDate, setFromDate] = useState<string>(
    dayjs().format('YYYY-MM-DD')
  );
  const [toDate, setToDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const router = useRouter();

  const getDataHandler = () => {
    router.push(`/admin/reports?fromDate=${fromDate}&toDate=${toDate}`);
  };

  return (
    <div className="flex items-end gap-5">
      <div className="flex flex-col">
        <label htmlFor="fromDate" className="text-sm">
          From Date
        </label>
        <Input
          id="fromDate"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="toDate" className="text-sm">
          To Date
        </label>
        <Input
          id="toDate"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <div className="flex gap-5">
        <Button type="primary" onClick={getDataHandler}>
          Get Data
        </Button>
      </div>
    </div>
  );
}

export default DateFiltersForReports;
