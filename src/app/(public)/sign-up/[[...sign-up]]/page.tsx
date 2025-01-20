import React from 'react';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp fallbackRedirectUrl="/admin/dashboard" />{' '}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full"
      >
        <path
          fill="#16423c"
          fill-opacity="1"
          d="M0,32L48,53.3C96,75,192,117,288,133.3C384,149,480,139,576,128C672,117,768,107,864,133.3C960,160,1056,224,1152,213.3C1248,203,1344,117,1392,74.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
