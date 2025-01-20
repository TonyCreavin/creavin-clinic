import dayjs from 'dayjs';
import React from 'react';

const getDateTimeFormat = (date: string) => {
  return dayjs(date).format('MMM DD YYYY, hh:mm A');
};

export default getDateTimeFormat;
