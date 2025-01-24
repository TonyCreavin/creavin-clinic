import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number;
  description: string;
}

function DashboardCard({ title, value, description }: DashboardCardProps) {
  return (
    <div className="p-5 border border-solid border-primary bg-gray-100 rounded-sm">
      <h1 className="text-lg font-bold text-center">{title}</h1>
      <p className="text-5xl font-bold my-5 text-center">{value}</p>
      <p className="text-sm text-center"> {description}</p>
    </div>
  );
}

export default DashboardCard;
