import Spinner from '@/components/spinner';
import React from 'react';

function loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  );
}

export default loader;
