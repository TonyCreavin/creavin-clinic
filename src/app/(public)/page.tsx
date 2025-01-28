import React from 'react';
import { Button } from 'antd';

function Homepage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-48 ">
      <section className="px-10 flex flex-col gap-7 justify-center">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to Creavin Clinic
        </h1>
        <p className=" text-primary text-md">
          We are a clinic that provides the best healthcare services in the
          world. We have the best doctors and nurses that will take care of you.
          We have the best facilities and equipment that will make you feel at
          home. We are here to help you get better and live a healthy life.
        </p>

        <div className="flex gap-5 flex-wrap">
          <Button href="/appointment-confirmation">View appointments</Button>
          <Button href="/book-appointment" type="primary" className="mb-5">
            Book an appointment
          </Button>
        </div>
      </section>
      <section className="flex justify-center items-center">
        {' '}
        <img src="./first-aid.png" alt="first-aid" className="h-96 " />
      </section>
    </div>
  );
}

export default Homepage;
